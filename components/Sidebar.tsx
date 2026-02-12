
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
    { id: View.DASHBOARD, label: 'Performance', icon: 'fas fa-chart-line' },
    { id: View.PRODUCT_DISCOVERY, label: 'TikTok Catálogo', icon: 'fab fa-tiktok' },
    { id: View.SAVED_PRODUCTS, label: 'Minha Biblioteca', icon: 'fas fa-folder' },
    { id: View.HISTORY, label: 'Galeria Viral', icon: 'fas fa-play' },
    { id: View.BRANDING, label: 'Assets de Marca', icon: 'fas fa-fingerprint' },
    { id: View.SETTINGS, label: 'Configurações', icon: 'fas fa-sliders' },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col w-80 bg-[#080808] border-r border-white/5 h-screen sticky top-0 p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-16 px-2 cursor-pointer group" onClick={() => setCurrentView(View.DASHBOARD)}>
          <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform">
            <i className="fas fa-bolt text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none text-white italic uppercase">VioShop</h1>
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em] animate-pulse">ULTRA v2.5</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.2rem] transition-all duration-300 group ${
                currentView === item.id 
                  ? 'bg-white text-black shadow-2xl shadow-white/10' 
                  : 'text-zinc-600 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`${item.icon} text-lg ${currentView === item.id ? 'text-indigo-600' : 'group-hover:text-indigo-400'}`}></i>
              <span className="font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-8">
          {/* Version & Sync Status */}
          <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Estado do Deploy</span>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                   <span className="text-[8px] font-black text-emerald-500 uppercase">Sincronizado</span>
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-[8px] font-black text-zinc-600 uppercase mb-1">Conta Ativa</span>
                <span className="text-[10px] font-bold text-white truncate">{user?.email || 'v2.5_Guest'}</span>
             </div>
          </div>

          <button 
            onClick={onLogout}
            className="w-full py-4 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"
          >
            <i className="fas fa-power-off"></i> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] px-8 py-5 flex justify-between items-center z-50 shadow-2xl">
        {menuItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-2 ${currentView === item.id ? 'text-white scale-110' : 'text-zinc-500'}`}
          >
            <i className={item.icon}></i>
            <span className="text-[7px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
