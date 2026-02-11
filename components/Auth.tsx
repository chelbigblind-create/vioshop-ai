
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
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

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
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu e-mail (ou tente logar se o e-mail estiver desativado no painel).' });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) onSession(data.session);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro na autenticação' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 mx-auto mb-4">
          <i className="fas fa-bolt text-white text-2xl"></i>
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
          {isSignUp ? 'Criar Conta' : 'Acessar VioShop'}
        </h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">
          {isSignUp ? 'Sua jornada no TikTok Shop começa aqui' : 'Bem-vindo de volta, estrategista'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">E-mail</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-pink-500 text-white font-bold text-sm mt-1"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">Senha</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-pink-500 text-white font-bold text-sm mt-1"
            placeholder="••••••••"
          />
        </div>

        {message && (
          <div className={`p-4 rounded-xl text-xs font-bold border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
            {message.text}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-pink-600 to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {loading ? <i className="fas fa-circle-notch animate-spin"></i> : (isSignUp ? 'CADASTRAR AGORA' : 'ENTRAR NA PLATAFORMA')}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-pink-500 transition-colors"
        >
          {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Crie uma agora'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
