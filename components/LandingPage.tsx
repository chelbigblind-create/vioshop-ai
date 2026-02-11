
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
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
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
              className="bg-zinc-100 text-zinc-950 px-6 py-2 rounded-full font-black text-sm hover:bg-pink-500 hover:text-white transition-all active:scale-95 uppercase tracking-tighter"
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
            Powered by Veo 3.1 & Gemini
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            Transforme Produtos em <span className="gradient-text">Vendas Virais</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            A primeira plataforma SaaS que automatiza 100% da criação de vídeos para o TikTok Shop. Encontre produtos, gere roteiros e renderize com IA em segundos.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-pink-600/20 hover:scale-105 transition-all uppercase tracking-tighter"
            >
              {isLoggedIn ? 'VOLTAR AO MEU PAINEL' : 'COMEÇAR AGORA GRÁTIS'}
            </button>
            
            {isLoggedIn ? (
              <button 
                onClick={onLogout}
                className="text-xs font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] flex items-center gap-2 transition-all mt-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logado como {userEmail}. <span className="text-pink-500 underline">Trocar de conta?</span>
              </button>
            ) : (
              <button className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-zinc-800 transition-all uppercase tracking-tighter">
                VER DEMONSTRAÇÃO
              </button>
            )}
          </div>
          
          {/* Dashboard Preview */}
          <div className="mt-20 relative p-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden group max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop" 
              alt="Plataforma Preview" 
              className="w-full rounded-[1.8rem] opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
               <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center space-y-2 group-hover:scale-110 transition-transform">
                  <i className="fas fa-play text-white text-4xl"></i>
                  <p className="text-white font-bold uppercase tracking-widest text-xs">Preview do Dashboard</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Criado para <span className="text-indigo-500">Afiliados Elite</span></h2>
            <p className="text-zinc-400 font-medium">Tudo o que você precisa para dominar o TikTok Shop sem aparecer.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-4 hover:border-pink-500/50 transition-all">
              <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-xl flex items-center justify-center text-xl">
                <i className="fas fa-magnifying-glass-chart"></i>
              </div>
              <h3 className="text-xl font-bold">Mineração Inteligente</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Nossa IA analisa o TikTok Shop 24/7 para encontrar os produtos com maior potencial de viralização e lucro.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-4 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center text-xl">
                <i className="fas fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="text-xl font-bold">Roteiros Hipnóticos</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Usamos Gemini Pro para criar scripts baseados em gatilhos mentais de venda que prendem a atenção nos primeiros 3 segundos.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-4 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center text-xl">
                <i className="fas fa-video"></i>
              </div>
              <h3 className="text-xl font-bold">Motor Veo 3.1</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Gere clipes de vídeo realistas em 9:16 com avatares humanos de última geração, prontos para postar e converter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt text-white text-xs"></i>
              </div>
              <span className="text-xl font-black tracking-tighter">VioShop AI</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              VioShop AI é uma solução tecnológica independente desenvolvida para apoiar o ecossistema TikTok Shop.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Produto</h5>
            <ul className="text-xs text-zinc-500 space-y-2">
              <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-pink-500">Início</button></li>
              <li><a href="#features" className="hover:text-pink-500">Recursos de IA</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Legal</h5>
            <ul className="text-xs text-zinc-500 space-y-2">
              <li><button onClick={() => onNavigate(View.PRIVACY_POLICY)} className="hover:text-pink-500 text-left">Política de Privacidade</button></li>
              <li><button onClick={() => onNavigate(View.TERMS_OF_SERVICE)} className="hover:text-pink-500 text-left">Termos de Uso</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Social</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all"><i className="fab fa-tiktok"></i></a>
              <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
          © 2024 VioShop AI - Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
