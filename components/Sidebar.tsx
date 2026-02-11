
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isTikTokConnected?: boolean;
  hasApiKey?: boolean;
  onActivateKey?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isTikTokConnected, hasApiKey, onActivateKey }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Painel', icon: 'fas fa-chart-pie' },
    { id: View.PRODUCT_DISCOVERY, label: 'Mineração', icon: 'fas fa-rocket' },
    { id: View.SAVED_PRODUCTS, label: 'Meus Produtos', icon: 'fas fa-box-open' },
    { id: View.HISTORY, label: 'Estúdio', icon: 'fas fa-clapperboard' },
    { id: View.BRANDING, label: 'Identidade Visual', icon: 'fas fa-palette' },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col w-72 bg-zinc-900 border-r border-zinc-800 h-screen sticky top-0 p-8">
        <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer" onClick={() => setCurrentView(View.DASHBOARD)}>
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
            <i className="fas fa-bolt text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">VioShop</h1>
            <span className="text-[10px] font-bold text-pink-500 uppercase tracking-[0.2em]">SaaS Edition</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-4 mb-4">Menu Principal</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                currentView === item.id 
                  ? 'bg-zinc-800 text-white shadow-xl ring-1 ring-zinc-700' 
                  : 'text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-200'
              }`}
            >
              <i className={`${item.icon} text-lg ${currentView === item.id ? 'text-pink-500' : 'group-hover:text-zinc-300'}`}></i>
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          {!hasApiKey && (
            <button 
              onClick={onActivateKey}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-pink-500 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-pink-500/20 transition-all active:scale-95"
            >
              Ativar Veo 3.1 Pro
            </button>
          )}
          
          <div className={`p-4 rounded-2xl flex flex-col gap-3 transition-all ${
            isTikTokConnected ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-zinc-800/50 border border-zinc-800'
          }`}>
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">TikTok Shop</span>
               <div className={`w-2 h-2 rounded-full animate-pulse ${isTikTokConnected ? 'bg-emerald-500' : 'bg-zinc-600'}`}></div>
            </div>
            <p className="text-xs font-medium text-zinc-300">
              {isTikTokConnected ? 'Loja Conectada' : 'Aguardando Conexão'}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-800 px-6 py-4 flex justify-between items-center z-50">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 ${
              currentView === item.id ? 'text-pink-500' : 'text-zinc-500'
            }`}
          >
            <i className={item.icon}></i>
            <span className="text-[10px] font-bold">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
