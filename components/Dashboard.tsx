
import React, { useState } from 'react';
import { VideoProject } from '../types';

interface DashboardProps {
  onNewVideo: () => void;
  videoCount: number;
  savedCount: number;
  history: VideoProject[];
  isTikTokConnected: boolean;
  onConnect: () => void;
  hasApiKey: boolean;
  onActivateKey: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onNewVideo, 
  videoCount, 
  savedCount, 
  history, 
  isTikTokConnected, 
  onConnect,
  hasApiKey,
  onActivateKey
}) => {
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const currentOrigin = window.location.origin;

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    alert(message);
  };

  const copyObjetoSocialDev = () => {
    const text = "Desenvolvimento e licenciamento de programas de computador customizáveis e soluções tecnológicas para marketing digital. Foco em ferramentas de automação de conteúdo e suporte a ecossistemas de e-commerce e social commerce.";
    handleCopy(text, "Objeto Social (Perfil Dev) copiado!");
  };

  const copyDescricaoNegocioDev = () => {
    const text = "A VioShop AI é uma plataforma SaaS (Software as a Service) desenvolvida para potencializar o desempenho de afiliados e criadores de conteúdo dentro do ecossistema TikTok Shop. Nossa competência principal reside na integração de Inteligência Artificial Generativa para automatizar a produção de vídeos de alta conversão.";
    handleCopy(text, "Descrição do SaaS copiada!");
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Banner de Status de API */}
      <div className={`p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${
        hasApiKey 
          ? 'bg-emerald-500/5 border-emerald-500/20' 
          : 'bg-zinc-900 border-zinc-800 shadow-2xl shadow-indigo-500/5'
      }`}>
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all ${
            hasApiKey ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-indigo-600 text-white shadow-indigo-600/20'
          }`}>
            <i className={`fas ${hasApiKey ? 'fa-check-double' : 'fa-key'}`}></i>
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              {hasApiKey ? 'API Nível Pago Ativada' : 'Configuração de API'}
              {hasApiKey && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Pro</span>}
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mt-1">
              {hasApiKey 
                ? 'Sua conta "apps criados" está pronta para gerar vídeos de alta definição com Veo 3.1.' 
                : 'Conecte sua chave do Google AI Studio para desbloquear o motor de vídeo IA.'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {!hasApiKey ? (
            <button 
              onClick={onActivateKey}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              ATIVAR CHAVE AGORA
            </button>
          ) : (
            <button 
              onClick={onActivateKey}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all border border-zinc-700 active:scale-95"
            >
              Mudar Chave
            </button>
          )}
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="w-12 h-12 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-2xl flex items-center justify-center hover:text-white transition-all"
          >
            <i className={`fas ${showHelp ? 'fa-times' : 'fa-question'}`}></i>
          </button>
        </div>
      </div>

      {showHelp && (
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] animate-in zoom-in-95 duration-300 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400">Guia de Aprovação TikTok Shop</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Use estes dados ao registrar seu App no TikTok Shop Partner Center para garantir uma aprovação rápida.
            </p>
            <div className="space-y-2">
              <button onClick={copyObjetoSocialDev} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                <i className="fas fa-copy"></i> Copiar Objeto Social (TI)
              </button>
              <button onClick={copyDescricaoNegocioDev} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                <i className="fas fa-copy"></i> Copiar Descrição SaaS
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-pink-400">Dica Billing Google</h4>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              <p className="text-xs text-zinc-400 leading-relaxed italic">
                "O modelo Veo 3.1 pode levar alguns minutos para ser habilitado no console após a ativação do faturamento. Se receber erro 404, aguarde 15 minutos."
              </p>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="inline-block mt-4 text-[10px] text-pink-500 font-bold hover:underline">
                DOCS FATURAMENTO <i className="fas fa-external-link-alt ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white">Seu Império TikTok</h2>
          <p className="text-zinc-400 mt-2 font-medium">Estatísticas em tempo real da sua operação de Social Commerce.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onNewVideo}
            className="bg-gradient-to-r from-pink-600 to-indigo-600 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-pink-600/20 active:scale-95"
          >
            <i className="fas fa-wand-magic-sparkles"></i>
            NOVO VÍDEO VIRAL
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all group">
          <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
            <i className="fas fa-clapperboard"></i>
          </div>
          <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest">Produções Ativas</h3>
          <p className="text-4xl font-black mt-2 text-white">{videoCount}</p>
        </div>
        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all group">
          <div className="w-14 h-14 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
            <i className="fas fa-heart"></i>
          </div>
          <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest">Produtos Minerados</h3>
          <p className="text-4xl font-black mt-2 text-white">{savedCount}</p>
        </div>
        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all group">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
            <i className="fas fa-arrow-trend-up"></i>
          </div>
          <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest">Alcance Estimado</h3>
          <p className="text-4xl font-black mt-2 text-emerald-400">142.8k</p>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black tracking-tight text-white">Clippings Recentes</h3>
        </div>
        
        {history.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {history.slice(0, 4).map((project) => (
              <div key={project.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden group hover:border-pink-500/30 transition-all">
                <div className="aspect-[9/16] bg-zinc-800 relative group-hover:cursor-pointer">
                  {project.generatedUrl ? (
                    <video src={project.generatedUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-700 gap-3">
                      <i className="fas fa-wand-sparkles text-3xl animate-pulse"></i>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Renderizando...</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{new Date(project.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm font-bold truncate mt-2 text-white">VioShop Clip #{project.id.slice(0, 4)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-[2.5rem] py-20 flex flex-col items-center justify-center text-zinc-500">
            <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-video-slash text-2xl text-zinc-600"></i>
            </div>
            <h4 className="text-lg font-bold text-zinc-300">Nenhum vídeo no estúdio</h4>
            <p className="text-sm mt-2 max-w-xs text-center px-6">Escolha um produto e deixe nossa IA criar o vídeo perfeito para você vender mais.</p>
            <button 
              onClick={onNewVideo} 
              className="mt-8 px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold transition-all active:scale-95 shadow-xl shadow-pink-600/20"
            >
              Começar Agora
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
