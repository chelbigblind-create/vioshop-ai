
import React from 'react';
import { View } from '../types';

interface LandingPageProps {
  onStart: () => void;
  onNavigate: (view: View) => void;
  isLoggedIn?: boolean;
  userEmail?: string;
  onLogout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onNavigate, isLoggedIn, userEmail, onLogout }) => {
  return (
    <div className="bg-[#050505] min-h-screen text-zinc-100 selection:bg-indigo-500/30 font-['Inter']">
      {/* Deploy Status Bar - IF YOU SEE THIS, THE DEPLOY WORKED */}
      <div className="bg-gradient-to-r from-indigo-600 to-pink-600 py-2 text-center overflow-hidden">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white animate-pulse">
           SISTEMA ATUALIZADO v2.5.0 ULTRA • CLOUD SYNC ACTIVE • DEPLOY OK
        </p>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <i className="fas fa-bolt text-white text-sm"></i>
            </div>
            <span className="text-2xl font-black tracking-tighter italic uppercase">VioShop <span className="text-indigo-500">AI</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="#features" className="hover:text-white transition-all">Tecnologia</a>
            <a href="#workflow" className="hover:text-white transition-all">Fluxo IA</a>
            <span className="opacity-30">Preços</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={onStart}
              className="bg-white text-black px-8 py-3 rounded-full font-black text-[11px] hover:bg-indigo-500 hover:text-white transition-all active:scale-95 uppercase tracking-widest shadow-xl shadow-white/5"
            >
              {isLoggedIn ? 'VOLTAR AO DASHBOARD' : 'ACESSAR AGORA'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - COMPLETELY REDESIGNED */}
      <section className="relative pt-32 pb-40 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Powered by Veo 3.1 & Gemini 3 Pro</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] text-white italic uppercase">
            VioShop AI: Domine o <br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">TikTok Shop</span>
          </h1>

          <p className="text-zinc-500 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            A revolução v2.5 chegou. Automatize 100% da criação de vídeos virais, 
            sincronize com o catálogo oficial e escale múltiplos perfis sem esforço.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={onStart}
              className="w-full md:w-auto bg-white text-black px-14 py-6 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-indigo-600 hover:text-white hover:scale-105 transition-all uppercase tracking-tighter"
            >
              Começar Escala Grátis
            </button>
            <button className="w-full md:w-auto bg-zinc-900 border border-zinc-800 text-white px-14 py-6 rounded-[2rem] font-black text-lg hover:bg-zinc-800 transition-all uppercase tracking-tighter">
              Ver Demo 4K
            </button>
          </div>

          {/* Device Mockup Simulating the new UI */}
          <div className="mt-24 relative max-w-5xl mx-auto p-4 bg-white/5 border border-white/10 rounded-[4rem] backdrop-blur-3xl shadow-2xl">
             <div className="bg-black rounded-[3rem] overflow-hidden aspect-video flex items-center justify-center border border-white/5">
                <div className="flex flex-col items-center gap-6 opacity-40">
                   <i className="fas fa-play text-6xl text-indigo-500"></i>
                   <p className="text-[10px] font-black uppercase tracking-[1em]">Engine Preview v2.5</p>
                </div>
             </div>
             {/* Floating UI Elements */}
             <div className="absolute -right-10 top-20 bg-indigo-600 p-6 rounded-3xl shadow-2xl hidden lg:block animate-bounce">
                <p className="text-[10px] font-black uppercase">ROI Estimado</p>
                <p className="text-2xl font-black">+450%</p>
             </div>
             <div className="absolute -left-10 bottom-20 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl hidden lg:block">
                <p className="text-[10px] font-black uppercase text-zinc-500">Status API</p>
                <p className="text-xl font-black text-emerald-500">CONECTADO</p>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { label: 'Vídeos/Dia', val: '50.000+' },
             { label: 'Uptime Cloud', val: '99.9%' },
             { label: 'Conversão Média', val: '12.4%' },
             { label: 'Modelos IA', val: 'Veo 3.1' }
           ].map((s, i) => (
             <div key={i} className="space-y-2">
               <p className="text-4xl font-black text-white italic tracking-tighter">{s.val}</p>
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{s.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-black">
              <i className="fas fa-bolt text-xs"></i>
            </div>
            <span className="text-xl font-black tracking-tighter italic uppercase">VioShop AI</span>
          </div>
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <button onClick={() => onNavigate(View.PRIVACY_POLICY)} className="hover:text-white transition-colors">Privacidade</button>
            <button onClick={() => onNavigate(View.TERMS_OF_SERVICE)} className="hover:text-white transition-colors">Termos</button>
            <span className="text-indigo-500">v2.5.0-ULTRA-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
