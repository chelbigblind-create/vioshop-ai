
import React, { useState } from 'react';
import { Product, Avatar, Voice, Scene, VideoProject } from '../types';
import { AVATARES, VOICES, SCENES } from '../constants';
import { generateScript, generateVideoWithVeo } from '../services/gemini';

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
      // Create final project object
      const finalProject: VideoProject = {
        ...config,
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        createdAt: new Date().toISOString()
      } as VideoProject;

      // For simulation, we wait a bit and then complete. 
      // In a real scenario, this is where generateVideoWithVeo would be called
      // but the process is long, so we'll move to the editor first.
      
      onComplete(finalProject);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Escolha o seu Avatar</h3>
        <p className="text-zinc-400">Como você quer que o seu apresentador apareça?</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {AVATARES.map(avatar => (
          <button
            key={avatar.id}
            onClick={() => setConfig(prev => ({ ...prev, avatarId: avatar.id }))}
            className={`p-2 rounded-2xl border-2 transition-all group ${
              config.avatarId === avatar.id ? 'border-pink-500 bg-pink-500/5' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
            }`}
          >
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3">
              <img src={avatar.previewUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <p className="font-semibold text-sm">{avatar.name}</p>
            <p className="text-[10px] text-zinc-500">{avatar.style}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-between pt-6 border-t border-zinc-800">
        <button onClick={onCancel} className="px-6 py-2 text-zinc-400 hover:text-white transition-colors">Cancelar</button>
        <button 
          disabled={!config.avatarId}
          onClick={handleNext} 
          className="bg-pink-600 disabled:opacity-50 hover:bg-pink-700 text-white px-8 py-2 rounded-xl font-bold transition-all"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Configuração de Voz</h3>
        <p className="text-zinc-400">Personalize o tom e a velocidade da fala.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-400">Selecione a Voz</label>
          <div className="grid grid-cols-2 gap-3">
            {VOICES.map(voice => (
              <button
                key={voice.id}
                onClick={() => setConfig(prev => ({ ...prev, voiceId: voice.id }))}
                className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                  config.voiceId === voice.id ? 'border-pink-500 bg-pink-500/5' : 'border-zinc-800 bg-zinc-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${voice.gender === 'M' ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'}`}>
                  <i className={`fas fa-user-${voice.gender === 'M' ? 'large' : 'large'}`}></i>
                </div>
                <div>
                  <p className="text-sm font-bold">{voice.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{voice.gender === 'M' ? 'Masculino' : 'Feminino'}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-400">Velocidade da Fala</label>
            <div className="flex gap-2">
              {['slow', 'normal', 'fast'].map(s => (
                <button
                  key={s}
                  onClick={() => setConfig(prev => ({ ...prev, voiceConfig: { ...prev.voiceConfig!, speed: s as any } }))}
                  className={`flex-1 py-2 text-xs rounded-lg border uppercase tracking-widest ${
                    config.voiceConfig?.speed === s ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                  }`}
                >
                  {s === 'slow' ? 'Lenta' : s === 'normal' ? 'Normal' : 'Rápida'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-400">Tom de Voz</label>
            <div className="flex gap-2">
              {['low', 'neutral', 'high'].map(t => (
                <button
                  key={t}
                  onClick={() => setConfig(prev => ({ ...prev, voiceConfig: { ...prev.voiceConfig!, pitch: t as any } }))}
                  className={`flex-1 py-2 text-xs rounded-lg border uppercase tracking-widest ${
                    config.voiceConfig?.pitch === t ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                  }`}
                >
                  {t === 'low' ? 'Grave' : t === 'neutral' ? 'Médio' : 'Agudo'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-400">Entonação</label>
            <select 
              value={config.voiceConfig?.intonation}
              onChange={(e) => setConfig(prev => ({ ...prev, voiceConfig: { ...prev.voiceConfig!, intonation: e.target.value as any } }))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 focus:outline-none"
            >
              <option value="neutral">Neutra</option>
              <option value="excited">Animada</option>
              <option value="persuasive">Persuasiva</option>
              <option value="energetic">Energética</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-zinc-800">
        <button onClick={handleBack} className="px-6 py-2 text-zinc-400 hover:text-white transition-colors">Voltar</button>
        <button 
          disabled={!config.voiceId}
          onClick={handleNext} 
          className="bg-pink-600 disabled:opacity-50 hover:bg-pink-700 text-white px-8 py-2 rounded-xl font-bold transition-all"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Selecione o Cenário</h3>
        <p className="text-zinc-400">Onde o seu avatar deve realizar a demonstração?</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SCENES.map(scene => (
          <button
            key={scene.id}
            onClick={() => setConfig(prev => ({ ...prev, sceneId: scene.id }))}
            className={`p-2 rounded-2xl border-2 transition-all ${
              config.sceneId === scene.id ? 'border-pink-500 bg-pink-500/5' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
            }`}
          >
            <div className="aspect-[9/16] rounded-xl overflow-hidden mb-3">
              <img src={scene.previewUrl} className="w-full h-full object-cover" />
            </div>
            <p className="font-semibold text-sm">{scene.name}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-between pt-6 border-t border-zinc-800">
        <button onClick={handleBack} className="px-6 py-2 text-zinc-400 hover:text-white transition-colors">Voltar</button>
        <button 
          disabled={!config.sceneId}
          onClick={handleNext} 
          className="bg-pink-600 disabled:opacity-50 hover:bg-pink-700 text-white px-8 py-2 rounded-xl font-bold transition-all"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Roteiro de Vendas</h3>
        <p className="text-zinc-400">O que o seu avatar vai falar sobre o produto?</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-400">Texto do Roteiro</label>
          <button 
            onClick={generateScriptAI}
            disabled={loading}
            className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-500/30 hover:bg-indigo-500/20 transition-all flex items-center gap-2"
          >
            <i className={`fas fa-magic ${loading ? 'animate-spin' : ''}`}></i>
            Gerar com IA
          </button>
        </div>
        <textarea 
          value={config.script}
          onChange={(e) => setConfig(prev => ({ ...prev, script: e.target.value }))}
          className="w-full h-64 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-pink-500/30 resize-none font-medium text-zinc-200 leading-relaxed"
          placeholder="Ex: Olá pessoal! Hoje quero mostrar esse produto incrível que mudou minha rotina..."
        />
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <i className="fas fa-info-circle"></i>
          <span>A IA levará em conta os benefícios do produto e uma CTA forte.</span>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-zinc-800">
        <button onClick={handleBack} className="px-6 py-2 text-zinc-400 hover:text-white transition-colors">Voltar</button>
        <button 
          disabled={!config.script || loading}
          onClick={handleFinish} 
          className="bg-pink-600 disabled:opacity-50 hover:bg-pink-700 text-white px-8 py-2 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          {loading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}
          Gerar Vídeo
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4 px-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {s}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                step >= s ? 'text-pink-500' : 'text-zinc-600'
              }`}>
                {s === 1 ? 'Avatar' : s === 2 ? 'Voz' : s === 3 ? 'Cenário' : 'Roteiro'}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-zinc-900 rounded-full relative overflow-hidden">
          <div 
            className="absolute h-full bg-pink-600 transition-all duration-500" 
            style={{ width: `${(step - 1) * 33.33}%` }}
          />
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default Wizard;
