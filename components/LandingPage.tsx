
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
      {/* Deploy Status Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-pink-600 py-2 text-center overflow-hidden">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white animate-pulse">
           SISTEMA ATUALIZADO v2.5.0 ULTRA • CLOUD SYNC ACTIVE • LICENÇA SAAS ATIVA
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
            <a href="#pricing" className="hover:text-white transition-all">Planos</a>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={onStart}
              className="bg-white text-black px-8 py-3 rounded-full font-black text-[11px] hover:bg-indigo-500 hover:text-white transition-all active:scale-95 uppercase tracking-widest shadow-xl shadow-white/5"
            >
              {isLoggedIn ? 'VOLTAR AO DASHBOARD' : 'ASSINAR AGORA'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Plataforma nº 1 para Afiliados TikTok Shop</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] text-white italic uppercase">
            Gere Vídeos que <br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Vendem no Automático</span>
          </h1>

          <p className="text-zinc-500 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            A tecnologia v2.5 utiliza Veo 3.1 para criar anúncios realistas. 
            Sincronize sua conta, escolha os produtos e deixe a IA lucrar por você.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={onStart}
              className="w-full md:w-auto bg-white text-black px-14 py-6 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-indigo-600 hover:text-white hover:scale-105 transition-all uppercase tracking-tighter"
            >
              Começar Escala Agora
            </button>
            <a href="#pricing" className="w-full md:w-auto bg-zinc-900 border border-zinc-800 text-white px-14 py-6 rounded-[2rem] font-black text-lg hover:bg-zinc-800 transition-all uppercase tracking-tighter flex items-center justify-center gap-3">
              Ver Planos
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black italic uppercase text-white">Planos de Acesso</h2>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em]">Escolha a potência da sua operação</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Plan Pro */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[3rem] space-y-8 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl"></div>
              <div>
                <h3 className="text-2xl font-black italic uppercase text-white">Afiliado Pro</h3>
                <p className="text-zinc-500 text-xs font-bold uppercase mt-2">Para quem está começando a escalar</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">R$ 197</span>
                <span className="text-zinc-500 font-bold text-xs">/mês</span>
              </div>
              <ul className="space-y-4 pt-6 border-t border-zinc-800">
                <li className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <i className="fas fa-check text-emerald-500"></i> 50 Vídeos IA / Mês
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <i className="fas fa-check text-emerald-500"></i> Acesso ao Veo 3.1
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <i className="fas fa-check text-emerald-500"></i> Catálogo TikTok Shop
                </li>
              </ul>
              <button onClick={onStart} className="w-full py-5 bg-white text-black font-black text-xs uppercase rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all tracking-widest">
                ASSINAR AGORA
              </button>
            </div>

            {/* Plan Agency */}
            <div className="bg-zinc-900 border-2 border-indigo-500 p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 bg-indigo-500 text-white text-[9px] font-black uppercase px-12 py-3 rotate-45 shadow-2xl">RECOMENDADO</div>
              <div>
                <h3 className="text-2xl font-black italic uppercase text-white">Agência Scale</h3>
                <p className="text-indigo-400 text-xs font-bold uppercase mt-2">Poder ilimitado para múltiplas contas</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">R$ 497</span>
                <span className="text-zinc-500 font-bold text-xs">/mês</span>
              </div>
              <ul className="space-y-4 pt-6 border-t border-zinc-800">
                <li className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <i className="fas fa-check text-emerald-500"></i> Vídeos Ilimitados
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <i className="fas fa-check text-emerald-500"></i> Suporte Prioritário 24/7
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <i className="fas fa-check text-emerald-500"></i> Analytics em Tempo Real
                </li>
              </ul>
              <button onClick={onStart} className="w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase rounded-2xl hover:bg-indigo-500 transition-all tracking-widest shadow-xl shadow-indigo-600/20">
                DOMINAR O MERCADO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-black">
              <i className="fas fa-bolt text-xs"></i>
            </div>
            <span className="text-xl font-black tracking-tighter italic uppercase text-white">VioShop AI</span>
          </div>
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <button onClick={() => onNavigate(View.PRIVACY_POLICY)} className="hover:text-white transition-colors">Privacidade</button>
            <button onClick={() => onNavigate(View.TERMS_OF_SERVICE)} className="hover:text-white transition-colors">Termos</button>
            <span className="text-indigo-500">© 2024 VioShop Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
