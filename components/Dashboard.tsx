
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
    const text = "A VioShop AI é uma plataforma SaaS (Software as a Service) desenvolvida para potencializar o desempenho de afiliados e criadores de conteúdo dentro do ecossistema TikTok Shop. Nossa competência principal reside na integração de Inteligência Artificial Generativa para automatizar a produção de vídeos de alta conversão. Nosso objetivo como parceiros tecnológicos é fornecer ferramentas que facilitem a descoberta de produtos e a criação de roteiros criativos, permitindo que afiliados escalem suas operações de marketing de forma profissional e eficiente.";
    handleCopy(text, "Descrição do SaaS copiada!");
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Banner de Ajuda para Configuração TikTok Partner Center */}
      {!isTikTokConnected && (
        <div className="bg-zinc-900 border border-indigo-500/30 p-6 rounded-[2rem] shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className="text-indigo-400 hover:text-white transition-colors flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-full"
            >
              <i className={`fas ${showHelp ? 'fa-times' : 'fa-list-check'} text-sm`}></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">{showHelp ? 'Fechar Guia' : 'Checklist de Aprovação'}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pr-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-400">
                <i className="fas fa-shield-halved text-sm"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">TikTok Shop Partner Center</span>
              </div>
              <h3 className="text-xl font-bold">Registro de Desenvolvedor SaaS</h3>
              <p className="text-sm text-zinc-400 max-w-md">
                Para aprovação rápida do App, certifique-se de que sua Landing Page está pronta:
              </p>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-2">
               <div className="flex items-center gap-2 bg-zinc-950 p-2 rounded-2xl border border-zinc-800">
                <code className="px-4 py-2 text-xs font-mono text-zinc-300 break-all">{currentOrigin}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(currentOrigin);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  {copied ? 'Copiado!' : 'Copiar URL'}
                </button>
              </div>
              <p className="text-[10px] text-zinc-500 text-center italic">Use este link se já estiver em um subdomínio (ex: .vercel.app)</p>
            </div>
          </div>

          {showHelp && (
            <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">1. Dados da Empresa</h4>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <button 
                    onClick={copyObjetoSocialDev}
                    className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg transition-all"
                  >
                    Copiar Objeto Social (TI)
                  </button>
                  <button 
                    onClick={copyDescricaoNegocioDev}
                    className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg transition-all"
                  >
                    Copiar Descrição SaaS
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">2. Checklist do Site</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <i className="fas fa-check text-emerald-500"></i>
                    <span>Subdomínio Profissional (Vercel/Netlify)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <i className="fas fa-check text-emerald-500"></i>
                    <span>Explicar que é uma ferramenta para Afiliados</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-300 font-bold">
                    <i className="fas fa-circle-exclamation text-yellow-500"></i>
                    <span>Links de Privacidade e Termos de Uso</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Dica de Domínio</h4>
                <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20">
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    <strong>Pode usar domínio gratuito?</strong> Sim! Se você criar no <u>Vercel</u> ou <u>Netlify</u>, o TikTok aprova. Evite apenas domínios de "encurtadores" ou links que expiram.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!hasApiKey && (
        <div className="bg-gradient-to-r from-pink-500/10 to-indigo-500/10 border border-pink-500/20 p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center">
              <i className="fas fa-info-circle"></i>
            </div>
            <div>
              <p className="text-sm font-bold">Motor de Vídeo Veo 3.1 Desativado</p>
              <p className="text-xs text-zinc-400">Ative para começar a gerar clipes de vendas com IA.</p>
            </div>
          </div>
          <button 
            onClick={onActivateKey}
            className="text-[10px] font-black uppercase tracking-widest bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            Configurar Agora
          </button>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white">Painel de Controle</h2>
          <p className="text-zinc-400 mt-2 font-medium">Crie vídeos virais que convertem em vendas reais.</p>
        </div>
        <div className="flex gap-3">
          {!isTikTokConnected && (
            <button 
              onClick={onConnect}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-zinc-700 active:scale-95"
            >
              <i className="fab fa-tiktok"></i>
              Conectar TikTok Shop
            </button>
          )}
          <button 
            onClick={onNewVideo}
            className="bg-gradient-to-r from-pink-600 to-indigo-600 hover:opacity-90 text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-pink-600/20 active:scale-95"
          >
            <i className="fas fa-plus"></i>
            GERAR VÍDEO
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
          <h3 className="text-2xl font-black tracking-tight text-white">Projetos Recentes</h3>
          {history.length > 0 && (
            <button className="text-pink-500 text-sm font-bold hover:underline">Ver todos</button>
          )}
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
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i className="fas fa-play text-white text-3xl"></i>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{new Date(project.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm font-bold truncate mt-2 text-white">Clip de Vendas AI #{project.id.slice(0, 4)}</p>
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
            <p className="text-sm mt-2 max-w-xs text-center px-6">Comece explorando produtos no TikTok Shop para gerar seu primeiro roteiro e vídeo com IA.</p>
            <button 
              onClick={onNewVideo} 
              className="mt-8 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-bold transition-all active:scale-95"
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
