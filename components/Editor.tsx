
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
      const prompt = `Vertical 9:16 TikTok video for product demonstration. High quality realistic lighting. An AI avatar presenting: ${project.script.substring(0, 200)}... in a professional setting. The avatar is expressive, human-like, and looking at the camera.`;
      const url = await generateVideoWithVeo(prompt, '9:16');
      setVideoUrl(url);
    } catch (e: any) {
      console.error("Video generation failed", e);
      
      if (e.message?.includes("Requested entity was not found")) {
        setError("Erro de Autenticação: Uma chave de API paga é necessária para o Veo.");
        // @ts-ignore
        if (window.aistudio && window.aistudio.openSelectKey) {
          // @ts-ignore
          await window.aistudio.openSelectKey();
          // After opening, try to generate again or let the user click a retry button
        }
      } else {
        setError("Ocorreu um erro ao gerar o vídeo. Por favor, tente novamente.");
        // Fallback for demo if it's not a key error
        // setVideoUrl('https://file-examples.com/storage/fe279d45e467b70559b9a6b/2017/04/file_example_MP4_480_1_5MG.mp4');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generate();
  }, [project]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] gap-6 animate-in zoom-in duration-300">
      {/* Video Preview Column */}
      <div className="lg:w-[400px] flex flex-col bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-eye text-pink-500"></i>
            Preview 9:16
          </h3>
          <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">TikTok Format</span>
        </div>
        
        <div className="flex-1 bg-black relative flex items-center justify-center p-4">
          {loading ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="space-y-2">
                <p className="text-pink-500 font-bold">Gerando vídeo com IA...</p>
                <p className="text-[10px] text-zinc-500 px-8">Isso pode levar alguns minutos. Estamos renderizando seu roteiro com o avatar escolhido via Veo 3.1.</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 text-center p-6">
              <i className="fas fa-exclamation-triangle text-3xl text-yellow-500"></i>
              <p className="text-sm text-zinc-300">{error}</p>
              <button 
                onClick={generate}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Tentar Novamente
              </button>
            </div>
          ) : (
            <video 
              src={videoUrl!} 
              controls 
              className="h-full rounded-xl shadow-2xl border border-zinc-800"
            />
          )}
        </div>

        <div className="p-4 bg-zinc-900 border-t border-zinc-800 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all">
            <i className="fas fa-play"></i> Reproduzir
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold transition-all">
            <i className="fas fa-download"></i> Baixar
          </button>
        </div>
      </div>

      {/* Editor Controls Column */}
      <div className="flex-1 flex flex-col bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="flex border-b border-zinc-800">
          {[
            { id: 'text', icon: 'fas fa-font', label: 'Texto' },
            { id: 'captions', icon: 'fas fa-closed-captioning', label: 'Legendas' },
            { id: 'audio', icon: 'fas fa-music', label: 'Áudio' },
            { id: 'filters', icon: 'fas fa-magic', label: 'Filtros' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all border-b-2 ${
                activeTab === tab.id ? 'border-pink-500 text-pink-500 bg-pink-500/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <i className={tab.icon}></i>
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {activeTab === 'text' && (
            <div className="space-y-6">
              <h4 className="font-bold">Adicionar Texto na Tela</h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-pink-500 transition-all text-left">
                  <p className="text-xl font-black italic">TÍTULO IMPACTO</p>
                  <p className="text-[10px] text-zinc-500 mt-2 uppercase">Estilo Viral TikTok</p>
                </button>
                <button className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-pink-500 transition-all text-left">
                  <p className="text-lg font-bold text-yellow-400">OFERTA LIMITADA</p>
                  <p className="text-[10px] text-zinc-500 mt-2 uppercase">Estilo Promocional</p>
                </button>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-400">Conteúdo do Texto</label>
                <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3" placeholder="Digite aqui..." />
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-zinc-500">Cor</label>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-white border border-zinc-700 cursor-pointer"></div>
                      <div className="w-6 h-6 rounded-full bg-yellow-400 cursor-pointer"></div>
                      <div className="w-6 h-6 rounded-full bg-pink-500 cursor-pointer"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-zinc-500">Tamanho</label>
                    <input type="range" className="w-full accent-pink-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'captions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold">Legendas Automáticas</h4>
                <div className="w-12 h-6 bg-pink-600 rounded-full flex items-center px-1">
                   <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">A IA irá transcrever o áudio gerado e sincronizar as legendas com o vídeo.</p>
              
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-400">Estilo da Legenda</label>
                <div className="space-y-2">
                   {['Minimalista', 'Alex Hormozi (Colorida)', 'Moderno (com borda)', 'Dynamic (Pop up)'].map(style => (
                     <div key={style} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                       <span className="text-sm">{style}</span>
                       <i className="far fa-circle text-zinc-600"></i>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-6">
              <h4 className="font-bold">Música de Fundo (Trending)</h4>
              <div className="space-y-2">
                {[
                  { title: 'Motivational Corporate', duration: '0:45' },
                  { title: 'Chill Lo-fi Beats', duration: '1:00' },
                  { title: 'Upbeat Energetic', duration: '0:30' },
                  { title: 'Mysterious & Deep', duration: '0:50' },
                ].map(track => (
                  <div key={track.title} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-pink-500/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-xs">
                        <i className="fas fa-play text-zinc-500"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{track.title}</p>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{track.duration}</p>
                      </div>
                    </div>
                    <i className="fas fa-plus text-xs text-zinc-600"></i>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <label className="text-sm font-medium text-zinc-400">Ajuste de Volume</label>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] text-zinc-500 uppercase">
                     <span>Voz IA</span>
                     <span>100%</span>
                   </div>
                   <input type="range" className="w-full accent-pink-500" defaultValue={100} />
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] text-zinc-500 uppercase">
                     <span>Música</span>
                     <span>30%</span>
                   </div>
                   <input type="range" className="w-full accent-pink-500" defaultValue={30} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'filters' && (
            <div className="grid grid-cols-3 gap-3">
              {['Original', 'Warm', 'Cool', 'Vivid', 'Soft', 'Cinematic'].map(filter => (
                <div key={filter} className="space-y-2 cursor-pointer group">
                  <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all">
                    <img src={`https://picsum.photos/seed/${filter}/100/100`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100" />
                  </div>
                  <p className="text-[10px] text-center font-bold uppercase tracking-wider text-zinc-500 group-hover:text-pink-500">{filter}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-zinc-900 border-t border-zinc-800">
          <button 
            onClick={onBack}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-900/20 active:scale-[0.98] transition-all"
          >
            FINALIZAR E PUBLICAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
