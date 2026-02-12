
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
  const [statusMessage, setStatusMessage] = useState('Iniciando Motor Veo 3.1...');

  const loadingMessages = [
    'Conectando ao cluster de renderização...',
    'Processando roteiro persuasivo...',
    'Sincronizando movimentos labiais...',
    'Aplicando iluminação volumétrica...',
    'Codificando vídeo em 60fps...',
    'Quase lá! Finalizando texturas...',
  ];

  const generate = async () => {
    setLoading(true);
    setError(null);
    let msgIndex = 0;
    
    const interval = setInterval(() => {
      setStatusMessage(loadingMessages[msgIndex]);
      msgIndex = (msgIndex + 1) % loadingMessages.length;
    }, 15000);

    try {
      // Prompt otimizado para qualidade comercial
      const prompt = `Vertical 9:16 high-end commercial video for TikTok Shop. A professional AI influencer showing ${project.script.substring(0, 100)}. Cinematic lighting, professional studio background, hyper-realistic details, 8k resolution style, smooth camera movements. The character looks directly into the lens with high engagement.`;
      
      const url = await generateVideoWithVeo(prompt, '9:16');
      setVideoUrl(url);
    } catch (e: any) {
      console.error("Video generation failed", e);
      const errorMessage = e.message || "";
      
      if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("404")) {
        setError("PROJETO NÃO CONFIGURADO: O modelo Veo 3.1 exige uma chave de API de um projeto Google Cloud com faturamento ativo.");
        // @ts-ignore
        if (window.aistudio && window.aistudio.openSelectKey) {
           await window.aistudio.openSelectKey();
           generate(); // Tentar novamente após seleção
        }
      } else {
        setError("ERRO NA RENDERIZAÇÃO: Verifique sua cota de IA e conexão.");
      }
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  useEffect(() => {
    generate();
  }, [project]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-8 animate-in zoom-in duration-700">
      {/* Coluna de Preview (Aesthetic Mobile Style) */}
      <div className="lg:w-[450px] flex flex-col bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20 flex items-center justify-center border border-white/10">
          <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full mr-2"></div>
          <div className="w-8 h-1 bg-zinc-900 rounded-full"></div>
        </div>

        <div className="flex-1 bg-zinc-950 flex items-center justify-center p-6 pt-16">
          {loading ? (
            <div className="flex flex-col items-center gap-8 text-center max-w-[280px]">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-zinc-800" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="377" strokeDashoffset="100" className="text-pink-500 animate-[dash_3s_ease-in-out_infinite]" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-bolt text-pink-500 text-3xl animate-pulse"></i>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">Gerando Viral...</h4>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] animate-pulse leading-relaxed">
                  {statusMessage}
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl border border-red-500/20">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <p className="text-sm font-bold text-zinc-300 leading-relaxed uppercase">{error}</p>
              <button onClick={generate} className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-zinc-700 transition-all">
                Reiniciar Processo
              </button>
            </div>
          ) : (
            <div className="relative group w-full h-full">
              <video src={videoUrl!} controls autoPlay loop className="w-full h-full object-cover rounded-[2rem] shadow-2xl border border-white/5" />
              <div className="absolute bottom-10 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Preview Ativo</p>
                <p className="text-[9px] text-zinc-300">Formatado para TikTok Ads / Organics</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-zinc-900/50 backdrop-blur-xl border-t border-zinc-800 grid grid-cols-2 gap-4">
           <button disabled={loading} className="py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-30">
             <i className="fas fa-magic mr-2"></i> Remixar IA
           </button>
           <button disabled={loading || !!error} className="py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-pink-600/20 disabled:opacity-30">
             <i className="fas fa-download mr-2"></i> Exportar 4K
           </button>
        </div>
      </div>

      {/* Editor Controls (SaaS Panel Style) */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex bg-zinc-950/50 p-2 border-b border-zinc-800">
           {['text', 'audio', 'style'].map(tab => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${activeTab === tab ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
               {tab}
             </button>
           ))}
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          {activeTab === 'text' && (
            <div className="space-y-8">
               <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Legendas Dinâmicas</h4>
               <div className="grid grid-cols-1 gap-4">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl flex items-center justify-between group hover:border-pink-500/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500">
                        <i className="fas fa-font"></i>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight text-white">Estilo: "Alex Hormozi"</p>
                        <p className="text-[9px] text-zinc-600 font-bold uppercase">Impacto máximo e cores vibrantes</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-zinc-800 group-hover:border-pink-500 flex items-center justify-center transition-all">
                       <div className="w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-8">
               <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Trilha & Narração</h4>
               <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl flex items-center gap-6">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                    <i className="fas fa-volume-up text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-white mb-1">Música Viral Ativa</p>
                    <p className="text-[10px] text-zinc-500 font-medium">Sincronizada automaticamente com o ritmo do vídeo.</p>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-10 border-t border-zinc-800 bg-zinc-950/30">
           <button onClick={onBack} className="w-full py-5 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-pink-500 hover:text-white transition-all shadow-2xl">
              Salvar Projeto e Finalizar
           </button>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          0% { stroke-dashoffset: 377; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -377; }
        }
      `}</style>
    </div>
  );
};

export default Editor;
