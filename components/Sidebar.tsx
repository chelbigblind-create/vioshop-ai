
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
      <aside className="hidden lg:flex flex-col w-72 bg-zinc-900 border-r border-zinc-800 h-screen sticky top-0 p-8">
        <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer" onClick={() => setCurrentView(View.DASHBOARD)}>
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
            <i className="fas fa-bolt text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">VioShop</h1>
            <span className="text-[10px] font-bold text-pink-500 uppercase tracking-[0.2em]">SaaS Solution</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                currentView === item.id 
                  ? 'bg-zinc-800 text-white shadow-xl' 
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              <i className={`${item.icon} text-lg ${currentView === item.id ? 'text-pink-500' : ''}`}></i>
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          {user && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Sessão Ativa</span>
                <span className="text-[10px] font-bold text-white truncate max-w-[120px]">{user.email}</span>
              </div>
              <button onClick={onLogout} className="text-zinc-500 hover:text-red-500 transition-colors">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          )}

          {!hasApiKey && (
            <button 
              onClick={onActivateKey}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-pink-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-pink-500/20 transition-all"
            >
              Ativar Motor IA
            </button>
          )}
          
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cloud Status</span>
               <div className={`w-2 h-2 rounded-full ${user ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
            </div>
            <p className="text-[10px] font-medium text-zinc-400 leading-tight">
              {user ? 'Sincronizado via Supabase.' : 'Modo Offline (LocalStorage).'}
            </p>
          </div>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 px-6 py-4 flex justify-between items-center z-50">
        {menuItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 ${currentView === item.id ? 'text-pink-500' : 'text-zinc-500'}`}
          >
            <i className={item.icon}></i>
            <span className="text-[8px] font-bold uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
