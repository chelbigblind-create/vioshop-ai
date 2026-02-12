
import React from 'react';
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
  const stats = [
    { label: 'Lucro Estimado', value: 'R$ 1.240,50', growth: '+12%', icon: 'fa-dollar-sign', color: 'text-emerald-500', glow: 'shadow-emerald-500/10' },
    { label: 'Cliques em Links', value: '8.432', growth: '+25%', icon: 'fa-mouse-pointer', color: 'text-blue-500', glow: 'shadow-blue-500/10' },
    { label: 'Vídeos Ativos', value: videoCount.toString(), growth: 'UP', icon: 'fa-video', color: 'text-pink-500', glow: 'shadow-pink-500/10' },
    { label: 'Taxa de Conv.', value: '4.2%', growth: '+2%', icon: 'fa-chart-line', color: 'text-indigo-500', glow: 'shadow-indigo-500/10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Top Header - Ultra Modern */}
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
          className="group relative px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden hover:scale-105 transition-all active:scale-95"
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Gráfico Principal */}
        <div className="lg:col-span-8 bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 blur-[100px] -z-10"></div>
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-widest">Conversão Automática</h3>
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Sincronizado com API TikTok Shop</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-[9px] font-black text-zinc-500 uppercase">Orgânico</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-[9px] font-black text-zinc-500 uppercase">Ads AI</span>
               </div>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-56 gap-5 px-4">
             {[30, 60, 40, 85, 55, 75, 95].map((h, i) => (
               <div key={i} className="flex-1 group relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    +{h}%
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-zinc-800 to-zinc-700 rounded-2xl group-hover:from-indigo-600 group-hover:to-pink-500 transition-all duration-700 ease-out"
                    style={{ height: `${h}%` }}
                  ></div>
                  <p className="text-[9px] font-black text-zinc-600 text-center mt-5 uppercase tracking-tighter">Day {i+1}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Live Feed / Activity */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 h-full flex flex-col">
            <h3 className="text-lg font-black text-white uppercase italic tracking-widest mb-10 flex items-center justify-between">
              Live Feed
              <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">ON</span>
            </h3>
            <div className="space-y-8 flex-1">
              {history.slice(0, 4).map((v, i) => (
                <div key={i} className="flex items-start gap-5 animate-in slide-in-from-right duration-500" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="mt-1 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                  <div>
                    <p className="text-[11px] font-black text-white uppercase leading-none mb-1">Vídeo Renderizado</p>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">ID: {v.id.slice(0,6)} • {new Date(v.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center py-20">
                  <i className="fas fa-satellite-dish text-zinc-800 text-4xl mb-6 animate-pulse"></i>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Aguardando primeira transmissão...</p>
                </div>
              )}
            </div>
            <div className="mt-10 pt-10 border-t border-zinc-800">
               <div className="p-5 bg-black rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Cloud Usage</p>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                     <div className="w-1/3 h-full bg-pink-500"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
