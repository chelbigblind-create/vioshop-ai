
import React, { useState } from 'react';
import { Product, Avatar, Voice, Scene, VideoProject } from '../types';
import { AVATARES, VOICES, SCENES } from '../constants';
import { generateScript } from '../services/gemini';

interface WizardProps {
  product: Product;
  onComplete: (project: VideoProject) => void;
  onCancel: () => void;
}

const Wizard: React.FC<WizardProps> = ({ product, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<Partial<VideoProject>>({
    id: Math.random().toString(36).substr(2, 9),
    productId: product.id,
    script: '',
    voiceConfig: {
      pitch: 'neutral',
      speed: 'normal',
      intonation: 'persuasive'
    },
    createdAt: new Date().toISOString()
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const generateScriptAI = async () => {
    setLoading(true);
    try {
      const script = await generateScript(product);
      setConfig(prev => ({ ...prev, script }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const finalProject: VideoProject = {
        ...config,
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        createdAt: new Date().toISOString()
      } as VideoProject;
      onComplete(finalProject);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 animate-in fade-in duration-1000">
      {/* Header do Wizard */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-pink-500 text-2xl shadow-xl shadow-pink-500/5">
              <i className="fas fa-wand-magic-sparkles"></i>
           </div>
           <div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">Criador Automático</h2>
              <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">Passo {step} de 4: {step === 1 ? 'Apresentador' : step === 2 ? 'Configuração de Voz' : step === 3 ? 'Cenário Digital' : 'Roteirização'}</p>
           </div>
        </div>
        
        <div className="flex items-center gap-2">
           {[1, 2, 3, 4].map(s => (
             <div key={s} className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= s ? 'bg-pink-500 w-10 shadow-lg shadow-pink-500/20' : 'bg-zinc-800'}`}></div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Lado Esquerdo: Preview de Seleção */}
        <div className="lg:col-span-4 hidden lg:block">
           <div className="bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-10 sticky top-10 space-y-8">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Preview da Configuração</p>
              
              <div className="aspect-[3/4] bg-zinc-950 rounded-[2rem] border border-white/5 overflow-hidden flex items-center justify-center relative group">
                {config.avatarId ? (
                   <img src={AVATARES.find(a => a.id === config.avatarId)?.previewUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <i className="fas fa-user-astronaut text-4xl text-zinc-800 animate-pulse"></i>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-1">Status: {step < 4 ? 'Em Construção' : 'Pronto para Renderizar'}</p>
                   <p className="text-xs font-bold text-white uppercase italic">{product.name.slice(0, 25)}...</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-zinc-500">Apresentador:</span>
                    <span className="text-white">{AVATARES.find(a => a.id === config.avatarId)?.name || 'Nenhum'}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-zinc-500">Cenário:</span>
                    <span className="text-white">{SCENES.find(s => s.id === config.sceneId)?.name || 'Padrão'}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Lado Direito: Formulário Dinâmico */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
             <div className="h-full bg-pink-500 transition-all duration-700" style={{ width: `${(step/4)*100}%` }}></div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div className="grid grid-cols-2 gap-4">
                {AVATARES.map(avatar => (
                  <button
                    key={avatar.id}
                    onClick={() => { setConfig({...config, avatarId: avatar.id}); handleNext(); }}
                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col gap-4 group ${config.avatarId === avatar.id ? 'border-pink-500 bg-pink-500/5' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}`}
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img src={avatar.previewUrl} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-white italic uppercase text-xs">{avatar.name}</p>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{avatar.style}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-10 animate-in slide-in-from-right duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Personalidade da Voz</label>
                      <div className="grid grid-cols-2 gap-3">
                        {VOICES.map(voice => (
                          <button
                            key={voice.id}
                            onClick={() => setConfig({...config, voiceId: voice.id})}
                            className={`p-4 rounded-2xl border-2 text-left transition-all ${config.voiceId === voice.id ? 'border-pink-500 bg-pink-500/5' : 'border-zinc-800 bg-zinc-950'}`}
                          >
                            <p className="text-xs font-black text-white italic">{voice.name}</p>
                            <p className="text-[9px] text-zinc-500 uppercase">{voice.gender === 'M' ? 'Deep Male' : 'Energetic Female'}</p>
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Intensidade de Venda</label>
                        <select 
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 px-6 focus:outline-none focus:border-pink-500 text-xs font-black uppercase tracking-widest"
                          onChange={(e) => setConfig({...config, voiceConfig: {...config.voiceConfig!, intonation: e.target.value as any}})}
                        >
                          <option value="persuasive">Persuasiva (Foco em Escala)</option>
                          <option value="excited">Animada (Review de Produto)</option>
                          <option value="energetic">Energética (Flash Sale)</option>
                        </select>
                      </div>
                   </div>
                </div>
                <div className="flex justify-between pt-10 border-t border-zinc-800/50">
                  <button onClick={handleBack} className="text-[10px] font-black text-zinc-500 uppercase hover:text-white transition-all">← Voltar</button>
                  <button onClick={handleNext} disabled={!config.voiceId} className="bg-white text-black px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all disabled:opacity-30">Continuar →</button>
                </div>
             </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="grid grid-cols-2 gap-6">
                 {SCENES.map(scene => (
                   <button
                    key={scene.id}
                    onClick={() => { setConfig({...config, sceneId: scene.id}); handleNext(); }}
                    className={`p-3 rounded-[2.5rem] border-2 transition-all group overflow-hidden ${config.sceneId === scene.id ? 'border-pink-500' : 'border-zinc-800 bg-zinc-950'}`}
                   >
                     <div className="aspect-[9/16] rounded-[2.2rem] overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all h-64">
                       <img src={scene.previewUrl} className="w-full h-full object-cover" />
                     </div>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest pb-2">{scene.name}</p>
                   </button>
                 ))}
               </div>
               <div className="flex justify-between pt-10 border-t border-zinc-800/50">
                  <button onClick={handleBack} className="text-[10px] font-black text-zinc-500 uppercase hover:text-white transition-all">← Voltar</button>
                </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black italic uppercase text-white">Laboratório de Roteiro</h4>
                  <button 
                    onClick={generateScriptAI}
                    className="bg-indigo-500/10 text-indigo-400 px-6 py-3 rounded-2xl border border-indigo-500/20 text-[10px] font-black uppercase hover:bg-indigo-500/20 transition-all flex items-center gap-2"
                  >
                    {loading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-magic"></i>}
                    Otimizar para TikTok Shop
                  </button>
               </div>
               <div className="relative">
                  <textarea 
                    value={config.script}
                    onChange={(e) => setConfig({...config, script: e.target.value})}
                    placeholder="Seu roteiro matador aparecerá aqui..."
                    className="w-full h-80 bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 text-zinc-200 text-sm font-medium leading-relaxed focus:outline-none focus:border-pink-500/50 resize-none transition-all"
                  />
                  <div className="absolute bottom-6 right-8 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                    {config.script?.length || 0} / 1500 CARACTERES
                  </div>
               </div>
               <div className="flex justify-between items-center pt-10 border-t border-zinc-800/50">
                  <button onClick={handleBack} className="text-[10px] font-black text-zinc-500 uppercase hover:text-white transition-all">← Voltar</button>
                  <button 
                    onClick={handleFinish} 
                    disabled={!config.script || loading}
                    className="bg-gradient-to-r from-pink-600 to-indigo-600 text-white px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all disabled:opacity-30"
                  >
                    {loading ? 'PROCESSANDO...' : 'REQUISITAR VÍDEO VEO 3.1'}
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wizard;
