
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
    <div className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-pink-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-bolt text-white text-xs"></i>
            </div>
            <span className="text-xl font-black tracking-tighter">VioShop <span className="text-pink-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Recursos</a>
            <a href="#pricing" className="hover:text-white transition-colors text-zinc-700 pointer-events-none">Preços (Em breve)</a>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <button 
                onClick={onLogout}
                className="hidden md:block text-[10px] font-black text-zinc-500 hover:text-red-500 uppercase tracking-widest transition-all"
              >
                Sair ({userEmail?.split('@')[0]})
              </button>
            )}
            <button 
              onClick={onStart}
              className="bg-zinc-100 text-zinc-950 px-6 py-2 rounded-full font-black text-sm hover:bg-pink-500 hover:text-white transition-all active:scale-95 uppercase tracking-tighter shadow-xl shadow-white/5"
            >
              {isLoggedIn ? 'IR PARA O PAINEL' : 'ENTRAR NO APP'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-pink-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">
            <i className="fas fa-sparkles"></i>
            Versão 2.1 - Estabilidade Total
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            Vídeos de Produtos <span className="gradient-text">Feitos por IA</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            O único SaaS 100% automatizado para o TikTok Shop. Gerencie múltiplos perfis e escale suas vendas sem gravar um único vídeo.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-pink-600/20 hover:scale-105 transition-all uppercase tracking-tighter"
            >
              {isLoggedIn ? 'RETOMAR OPERAÇÃO' : 'CRIAR CONTA GRÁTIS'}
            </button>
            
            {isLoggedIn ? (
              <button 
                onClick={onLogout}
                className="text-xs font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] flex items-center gap-2 transition-all mt-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logado como {userEmail}. <span className="text-pink-500 underline">Desconectar?</span>
              </button>
            ) : (
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Acesso liberado para Beta Testers</p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Escalabilidade <span className="text-indigo-500">Infinita</span></h2>
            <p className="text-zinc-400 font-medium">A tecnologia VioShop elimina o gargalo da produção de conteúdo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-4 hover:border-pink-500/50 transition-all group">
              <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <i className="fas fa-magnifying-glass-chart"></i>
              </div>
              <h3 className="text-xl font-bold">API Real-Time</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Conecte seu ID de Afiliado e puxe produtos diretamente do catálogo oficial com as melhores comissões.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-4 hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <i className="fas fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="text-xl font-bold">Scripts VSL</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Nossa IA cria roteiros baseados nas estruturas de anúncios que mais vendem no mundo.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-4 hover:border-emerald-500/50 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <i className="fas fa-video"></i>
              </div>
              <h3 className="text-xl font-bold">Motor Veo 3.1</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Vídeos cinemáticos que parecem gravados em estúdio profissional, sem gastar com equipamentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-bolt text-white text-xs"></i>
            </div>
            <span className="text-xl font-black tracking-tighter italic">VioShop AI</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">
            <button onClick={() => onNavigate(View.PRIVACY_POLICY)} className="hover:text-white">Privacidade</button>
            <button onClick={() => onNavigate(View.TERMS_OF_SERVICE)} className="hover:text-white">Termos</button>
          </div>
          <div className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">
            VioShop Platform v2.1.0-Stable
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
