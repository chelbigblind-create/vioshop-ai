
import React, { useState } from 'react';
import { VideoProject } from '../types';

interface DashboardProps {
  onNewVideo: () => void;
  videoCount: number;
  savedCount: number;
  history: VideoProject[];
  hasApiKey: boolean;
  onActivateKey: () => void;
  isCloudSync?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onNewVideo, 
  videoCount, 
  savedCount, 
  history, 
  hasApiKey,
  onActivateKey,
  isCloudSync
}) => {
  const [showHelper, setShowHelper] = useState(false);

  const stats = [
    { label: 'Lucro Estimado', value: 'R$ 1.240,50', growth: '+12%', icon: 'fa-dollar-sign', color: 'text-emerald-500', glow: 'shadow-emerald-500/10' },
    { label: 'Cliques em Links', value: '8.432', growth: '+25%', icon: 'fa-mouse-pointer', color: 'text-blue-500', glow: 'shadow-blue-500/10' },
    { label: 'Vídeos Ativos', value: videoCount.toString(), growth: 'UP', icon: 'fa-video', color: 'text-pink-500', glow: 'shadow-pink-500/10' },
    { label: 'Taxa de Conv.', value: '4.2%', growth: '+2%', icon: 'fa-chart-line', color: 'text-indigo-500', glow: 'shadow-indigo-500/10' },
  ];

  const helperData = [
    { label: 'Nome do Serviço', content: 'VioShop AI - Inteligência Artificial para Afiliados' },
    { label: 'Breve Descrição', content: 'Plataforma completa para mineração de produtos e geração automática de anúncios com IA para o TikTok Shop Brasil.' },
    { label: 'Introdução Detalhada (200+ char)', content: 'O VioShop AI é uma solução SaaS desenvolvida para otimizar o fluxo de trabalho de afiliados no ecossistema TikTok Shop. Nossa tecnologia se integra à API oficial para fornecer dados analíticos sobre tendências de produtos e automatizar a produção de conteúdo em escala. Com o uso de inteligência artificial generativa, eliminamos a necessidade de edição manual, permitindo que o usuário foque na estratégia de vendas e na análise de conversão.' },
    { label: 'Benefício 1', content: 'Mineração de Produtos: Acesso direto ao catálogo do TikTok Shop para identificar produtos lucrativos.' },
    { label: 'Benefício 2', content: 'Vídeos IA: Geração automática de anúncios com avatares realistas (Veo 3.1).' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Modal de Ajuda TikTok */}
      {showHelper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
           <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[3rem] p-10 relative shadow-[0_0_100px_rgba(99,102,241,0.2)]">
              <button onClick={() => setShowHelper(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><i className="fas fa-times"></i></button>
              <h3 className="text-2xl font-black italic uppercase text-white mb-2">Copiador de Homologação</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Copie e cole os textos abaixo no TikTok Partner Center</p>
              
              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 custom-scroll">
                 {helperData.map((item, i) => (
                   <div key={i} className="space-y-2">
                      <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.label}</label>
                      <div className="flex gap-3">
                         <div className="flex-1 bg-black p-4 rounded-xl border border-white/5 text-[11px] text-zinc-300 font-medium">
                           {item.content}
                         </div>
                         <button 
                          onClick={() => navigator.clipboard.writeText(item.content)}
                          className="bg-white/5 hover:bg-white/10 text-white w-12 rounded-xl flex items-center justify-center border border-white/10"
                         >
                           <i className="fas fa-copy"></i>
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
              <p className="mt-10 text-[10px] text-zinc-600 font-bold uppercase text-center tracking-widest">
                Isso ajudará sua API a sair do Sandbox para o modo LIVE.
              </p>
           </div>
        </div>
      )}

      {/* TikTok Status Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-1 bg-gradient-to-r from-emerald-500/20 via-zinc-900 to-emerald-500/20 rounded-[2rem] border border-emerald-500/20">
          <div className="bg-[#080808] rounded-[1.9rem] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 text-xl border border-emerald-500/20">
                  <i className="fab fa-tiktok"></i>
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest leading-none mb-2">Checklist de Lançamento TikTok</p>
                  <div className="flex flex-wrap gap-3">
                     <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20 uppercase">✓ Registro OK</span>
                     <span className="text-[8px] font-black bg-amber-500/10 text-amber-500 px-2 py-1 rounded border border-amber-500/20 uppercase animate-pulse">● Segurança: Em Análise</span>
                     <span className="text-[8px] font-black bg-zinc-800 text-zinc-500 px-2 py-1 rounded border border-white/5 uppercase">○ Aguardando App/Anúncio</span>
                  </div>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Status da API</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Modo Sandbox (Limitado)</p>
             </div>
          </div>
        </div>

        <button 
          onClick={() => setShowHelper(true)}
          className="bg-indigo-600 p-6 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group hover:bg-indigo-500 transition-all text-left"
        >
           <div className="absolute -right-4 -bottom-4 text-white/10 text-6xl rotate-12 group-hover:rotate-0 transition-transform">
             <i className="fas fa-rocket"></i>
           </div>
           <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Como Publicar?</p>
           <h4 className="text-white font-black italic uppercase leading-tight">Guia de <br/>Homologação</h4>
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-10">
        <div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
            Estatísticas <span className="text-pink-500">Live</span>
          </h2>
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.3em] mt-4">
            Performance consolidada da rede de afiliados AI
          </p>
        </div>
        <button 
          onClick={onNewVideo}
          className="group relative px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden hover:scale-105 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
        >
          <div className="absolute inset-0 bg-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative z-10 group-hover:text-white">Gerar Novo Viral</span>
        </button>
      </div>

      {/* Grid de Métricas Neon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-zinc-700 transition-all shadow-xl ${stat.glow}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-black flex items-center justify-center ${stat.color} border border-white/5 shadow-inner`}>
                <i className={`fas ${stat.icon} text-xl`}></i>
              </div>
              <span className="text-[10px] font-black text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10">{stat.growth}</span>
            </div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white italic tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Seção Explicativa da Homologação (Nova) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[3rem] space-y-6">
           <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
             <i className="fas fa-list-check text-indigo-500"></i> O que é "Avaliação de Anúncios"?
           </h3>
           <p className="text-xs text-zinc-500 leading-relaxed">
             Não se preocupe, o TikTok não vai te cobrar por anúncios agora. No painel de parceiro, <strong className="text-zinc-300">"Anúncio"</strong> é apenas o texto descritivo que explica o que seu aplicativo faz. Eles exigem isso para que seu app possa ser listado no mercado de serviços oficial.
           </p>
           <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Dica de Ouro:</p>
              <p className="text-[10px] text-zinc-400 font-medium">Use prints do nosso Dashboard para preencher as imagens da "Avaliação de Aplicativo". Isso prova ao TikTok que seu sistema é funcional e profissional.</p>
           </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[3rem] space-y-6">
           <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
             <i className="fas fa-shield-halved text-emerald-500"></i> Por que "Publicar"?
           </h3>
           <p className="text-xs text-zinc-500 leading-relaxed">
             A "Publicação" é o passo final para sair do modo de teste. Após aprovado, sua plataforma terá acesso ao banco de dados real do <strong className="text-zinc-300">TikTok Shop Brasil</strong>, permitindo que seus usuários minerem produtos com precisão de 100%.
           </p>
           <div className="flex gap-4">
              <div className="flex-1 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-1/2"></div>
              </div>
              <span className="text-[9px] font-black text-zinc-500 uppercase">50% Completo</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
