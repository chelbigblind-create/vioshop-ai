
import React, { useState } from 'react';
import { getSupabaseClient } from '../services/supabase';

interface AuthProps {
  onSession: (session: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onSession }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<{type: 'error' | 'success' | 'warning', text: string, showForceButton?: boolean} | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase não configurado nos Ajustes.' });
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin 
          }
        });
        
        if (error) throw error;
        
        if (data.user && data.session) {
          onSession(data.session);
        } else {
          setMessage({ 
            type: 'warning', 
            text: 'CONTA PRÉ-CRIADA! O Supabase exige confirmação por e-mail por padrão.',
            showForceButton: true
          });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) onSession(data.session);
      }
    } catch (error: any) {
      let errorText = error.message;
      
      if (errorText.includes('Email not confirmed')) {
        setMessage({ 
          type: 'warning', 
          text: 'E-mail cadastrado, mas aguardando confirmação (Trava do Supabase).',
          showForceButton: true
        });
      } else if (errorText.includes('rate limit exceeded')) {
        setMessage({ type: 'error', text: 'Muitas tentativas. Tente novamente em alguns minutos.' });
      } else if (errorText.includes('Invalid login credentials')) {
        setMessage({ type: 'error', text: 'E-mail ou senha incorretos.' });
      } else {
        setMessage({ type: 'error', text: errorText });
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para entrar instantaneamente ignorando qualquer erro de auth
  const handleForceEntry = () => {
    const mockSession = {
      user: {
        email: email || 'dev@vioshop.ai',
        id: 'user_' + Math.random().toString(36).substr(2, 9)
      },
      access_token: 'bypass-token-' + Date.now()
    };
    onSession(mockSession);
  };

  return (
    <div className="w-full max-w-md p-10 bg-zinc-900 border border-zinc-800 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in duration-500 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full"></div>
      
      <div className="text-center mb-10 relative">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-pink-500/20 mx-auto mb-6">
          <i className="fas fa-bolt text-white text-3xl"></i>
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
          {isSignUp ? 'Nova Conta' : 'Acesso Seguro'}
        </h2>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
          VioShop Engine v2.5 Stable
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-5 relative">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-zinc-600 ml-4 tracking-widest">E-mail</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-5 px-6 focus:outline-none focus:border-pink-500 text-white font-bold text-sm transition-all"
            placeholder="seu@email.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-zinc-600 ml-4 tracking-widest">Senha</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-5 px-6 focus:outline-none focus:border-pink-500 text-white font-bold text-sm transition-all"
            placeholder="••••••••"
          />
        </div>

        {message && (
          <div className={`p-5 rounded-2xl text-[11px] font-bold border leading-relaxed animate-in slide-in-from-top-2 ${
            message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
            message.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
            'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            <div className="flex items-start gap-3">
              <i className={`fas ${message.type === 'error' ? 'fa-times-circle' : 'fa-exclamation-triangle'} mt-1`}></i>
              <div>
                <p>{message.text}</p>
                {message.showForceButton && (
                  <button 
                    type="button"
                    onClick={handleForceEntry}
                    className="mt-3 bg-amber-500 text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all"
                  >
                    Ignorar e Entrar Agora 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-2xl hover:bg-pink-500 hover:text-white transition-all disabled:opacity-50 active:scale-95"
        >
          {loading ? <i className="fas fa-circle-notch animate-spin"></i> : (isSignUp ? 'FINALIZAR CADASTRO' : 'AUTENTICAR NO HUB')}
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-6 items-center relative">
        <button 
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage(null);
          }}
          className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
        >
          {isSignUp ? 'Já é membro? Entrar' : 'Novo no ecossistema? Criar conta'}
        </button>

        <div className="w-full flex items-center gap-4 opacity-20">
          <div className="flex-1 h-px bg-zinc-500"></div>
          <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.5em]">ACESSO RÁPIDO</span>
          <div className="flex-1 h-px bg-zinc-500"></div>
        </div>

        <button 
          onClick={handleForceEntry}
          className="w-full py-5 bg-zinc-800/50 border border-white/5 text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all group"
        >
          Entrar como Convidado (Modo Demo)
        </button>
      </div>
    </div>
  );
};

export default Auth;
