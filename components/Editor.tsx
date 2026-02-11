
import React, { useState, useEffect } from 'react';
import { VideoProject } from '../types';
import { generateVideoWithVeo } from '../services/gemini';

interface EditorProps {
  project: VideoProject;
  onBack: () => void;
}

const Editor: React.FC<EditorProps> = ({ project, onBack }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('text');

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Prompt otimizado para qualidade cinemática
      const prompt = `Hyper-realistic 4K vertical 9:16 video of an AI influencer demonstrating ${project.script.substring(0, 150)}... The scene is professionally lit, cinematic background, sharp focus, 60fps style. The avatar is talking directly to the viewer with natural movements.`;
      
      const url = await generateVideoWithVeo(prompt, '9:16');
      setVideoUrl(url);
    } catch (e: any) {
      console.error("Video generation failed", e);
      
      const errorMessage = e.message || "";
      if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("404")) {
        setError("O modelo Veo 3.1 ainda não está ativo no seu projeto 'apps criados' ou a chave não é Nível Pago 1.");
        // Correcting error handling for 404/Not Found: Trigger key selection and proceed without artificial delay
        // @ts-ignore
        if (window.aistudio && window.aistudio.openSelectKey) {
           // @ts-ignore
           await window.aistudio.openSelectKey();
           // Proceed immediately to retry generation assuming selection was successful
           generate();
        }
      } else if (errorMessage.includes("quota") || errorMessage.includes("429")) {
        setError("Limite de cota atingido. Aguarde um minuto e tente novamente.");
      } else {
        setError("Ocorreu um erro técnico. Verifique seu faturamento no Google Cloud.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generate();
  }, [project]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] gap-6 animate-in zoom-in duration-500">
      {/* Video Preview Column */}
      <div className="lg:w-[400px] flex flex-col bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-video text-pink-500"></i>
            Output Veo 3.1
          </h3>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded font-black uppercase tracking-widest">720p HD</span>
        </div>
        
        <div className="flex-1 bg-black relative flex items-center justify-center p-4">
          {loading ? (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-pink-500/20 rounded-full"></div>
                <div className="absolute inset-0 w-20 h-20 border-t-2 border-pink-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-bolt text-pink-500 animate-pulse"></i>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-white font-black text-lg tracking-tight">CRIANDO VÍDEO VIRAL</p>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Processando via Google Veo</p>
                  <p className="text-[10px] text-zinc-600 px-6 italic">A renderização de IA pode levar até 3 minutos em contas pagas.</p>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-6 text-center p-8 bg-zinc-950/50 rounded-3xl border border-red-500/10">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-2xl">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="space-y-2">
                 <p className="text-sm text-zinc-200 font-bold leading-relaxed">{error}</p>
                 <p className="text-[10px] text-zinc-500">Certifique-se de que selecionou a chave do projeto 'apps criados'.</p>
              </div>
              <div className="flex flex-col gap-2 w-full pt-4">
                <button 
                  onClick={generate}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  Tentar Renderizar
                </button>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  className="text-[10px] text-zinc-600 hover:text-pink-500 transition-colors"
                >
                  Verificar Status Billing <i className="fas fa-external-link-alt ml-1"></i>
                </a>
              </div>
            </div>
          ) : (
            <video 
              src={videoUrl!} 
              controls 
              autoPlay
              className="h-full rounded-2xl shadow-2xl border border-zinc-800 ring-1 ring-white/5"
            />
          )}
        </div>

        <div className="p-4 bg-zinc-900 border-t border-zinc-800 grid grid-cols-2 gap-3">
          <button disabled={loading || !!error} className="flex items-center justify-center gap-2 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-20">
            <i className="fas fa-play"></i> Play
          </button>
          <button disabled={loading || !!error} className="flex items-center justify-center gap-2 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-20 shadow-lg shadow-pink-600/20">
            <i className="fas fa-download"></i> Baixar
          </button>
        </div>
      </div>

      {/* Editor Controls Column */}
      <div className="flex-1 flex flex-col bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl">
        <div className="flex border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          {[
            { id: 'text', icon: 'fas fa-heading', label: 'Estilos' },
            { id: 'captions', icon: 'fas fa-closed-captioning', label: 'Legendas' },
            { id: 'audio', icon: 'fas fa-volume-high', label: 'Áudio' },
            { id: 'fx', icon: 'fas fa-sparkles', label: 'Efeitos' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-5 flex flex-col items-center gap-1.5 transition-all border-b-2 ${
                activeTab === tab.id ? 'border-pink-500 text-pink-500 bg-pink-500/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <i className={`${tab.icon} text-sm`}></i>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {activeTab === 'text' && (
            <div className="space-y-8">
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest text-zinc-400 mb-6">Presets de Texto Viral</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-pink-500 transition-all text-left group">
                    <p className="text-2xl font-black italic tracking-tighter group-hover:text-pink-500 transition-colors">70% OFF</p>
                    <p className="text-[10px] text-zinc-600 mt-2 uppercase font-black tracking-widest">Flash Sale Style</p>
                  </button>
                  <button className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-indigo-500 transition-all text-left group">
                    <p className="text-xl font-bold text-indigo-400 group-hover:scale-105 transition-transform origin-left">PRODUTO #1</p>
                    <p className="text-[10px] text-zinc-600 mt-2 uppercase font-black tracking-widest">Review Style</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'captions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-pink-600/5 rounded-3xl border border-pink-500/10">
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest">Legendas Dinâmicas</h4>
                  <p className="text-xs text-zinc-500 mt-1">Sincronização automática via IA.</p>
                </div>
                <div className="w-14 h-7 bg-pink-600 rounded-full flex items-center px-1.5 cursor-pointer">
                   <div className="w-5 h-5 bg-white rounded-full ml-auto shadow-lg"></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-8">
              <h4 className="font-black text-sm uppercase tracking-widest text-zinc-400">Trilha Sonora Recomendada</h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { title: 'TikTok Trending House', tag: 'Vendas' },
                  { title: 'Chill Lo-fi Coffee', tag: 'Aesthetic' },
                  { title: 'Cinematic Excitement', tag: 'Promo' },
                ].map(track => (
                  <div key={track.title} className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-indigo-500/30 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                        <i className="fas fa-play text-[10px] text-zinc-600 group-hover:text-indigo-400"></i>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight">{track.title}</p>
                        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{track.tag}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-zinc-900 border-t border-zinc-800">
          <button 
            onClick={onBack}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
          >
            <i className="fas fa-save"></i>
            SALVAR NO PROJETO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
