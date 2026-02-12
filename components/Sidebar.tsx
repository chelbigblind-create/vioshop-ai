
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  hasApiKey?: boolean;
  onActivateKey?: () => void;
  user?: any;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, hasApiKey, onActivateKey, user, onLogout }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Painel', icon: 'fas fa-chart-pie' },
    { id: View.PRODUCT_DISCOVERY, label: 'Catálogo API', icon: 'fab fa-tiktok' },
    { id: View.SAVED_PRODUCTS, label: 'Biblioteca', icon: 'fas fa-box-open' },
    { id: View.HISTORY, label: 'Meus Vídeos', icon: 'fas fa-clapperboard' },
    { id: View.BRANDING, label: 'Identidade', icon: 'fas fa-palette' },
    { id: View.SETTINGS, label: 'Ajustes API', icon: 'fas fa-cog' },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col w-72 bg-zinc-950 border-r border-zinc-900 h-screen sticky top-0 p-8 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer group" onClick={() => setCurrentView(View.DASHBOARD)}>
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
            <i className="fas fa-bolt text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none text-white italic">VioShop</h1>
            <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em] animate-pulse">v2.5 ULTRA</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                currentView === item.id 
                  ? 'bg-white/5 text-white border border-white/10 shadow-[0_0_20px_rgba(236,72,153,0.1)]' 
                  : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <i className={`${item.icon} text-lg ${currentView === item.id ? 'text-pink-500' : ''}`}></i>
              <span className="font-black text-[11px] uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Sessão</span>
              <span className="text-[10px] font-bold text-zinc-300 truncate max-w-[120px]">{user?.email || 'Guest'}</span>
            </div>
            <button onClick={onLogout} className="text-zinc-600 hover:text-red-500 transition-colors">
              <i className="fas fa-power-off text-xs"></i>
            </button>
          </div>

          <div className="space-y-3">
             <div className="flex items-center justify-between px-2">
                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Sync Status</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
             </div>
             <div className="py-2 px-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[9px] font-black text-emerald-500 text-center uppercase tracking-widest">
                Deploy Real-time: OK
             </div>
          </div>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-2xl border-t border-zinc-800 px-6 py-4 flex justify-between items-center z-50">
        {menuItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 ${currentView === item.id ? 'text-pink-500' : 'text-zinc-600'}`}
          >
            <i className={item.icon}></i>
            <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
