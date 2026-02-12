
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
  const [status, setStatus] = useState<{type: 'error' | 'success' | 'info', message: string} | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setStatus(null);
    
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      setStatus({ 
        type: 'error', 
        message: 'ERRO DE CONEXÃO: Configure as chaves do Supabase em "Configurações" ou entre como visitante.' 
      });
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // --- PROCESSO DE CADASTRO ---
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: email.split('@')[0],
              avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user && !data.session) {
          // Caso comum: E-mail enviado mas precisa confirmar
          setStatus({ 
            type: 'success', 
            message: 'CONTA CRIADA! Verifique seu e-mail para ativar. Liberando acesso temporário...' 
          });
          // Permitir entrada imediata mesmo sem confirmação para não travar o UX
          setTimeout(() => handleForceEntry(), 2000);
        } else if (data.session) {
          onSession(data.session);
        }
      } else {
        // --- PROCESSO DE LOGIN ---
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) onSession(data.session);
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      let msg = error.message;
      
      if (msg.includes('rate limit')) {
        msg = 'LIMITE EXCEDIDO: O servidor bloqueou novas tentativas. Tente entrar como Visitante abaixo.';
      } else if (msg.includes('Email not confirmed')) {
        msg = 'E-mail não confirmado. Verifique sua caixa de entrada ou use o modo visitante.';
      } else if (msg.includes('Invalid login')) {
        msg = 'E-mail ou senha incorretos.';
      }
      
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleForceEntry = () => {
    // Session Mock robusta para garantir funcionamento offline/failover
    const mockSession = {
      user: {
        email: email || 'guest@vioshop.ai',
        id: 'temp_' + Math.random().toString(36).substr(2, 9),
        user_metadata: { full_name: 'Usuário Pro' }
      },
      access_token: 'local-session-' + Date.now(),
      expires_at: Math.floor(Date.now() / 1000) + 3600
    };
    onSession(mockSession);
  };

  return (
    <div className="w-full max-w-md p-1 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-[3.2rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-in zoom-in duration-500">
      <div className="bg-zinc-950 p-10 rounded-[3rem] relative overflow-hidden h-full">
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full"></div>
        
        <div className="text-center mb-10 relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-pink-500/20 mx-auto mb-6 group cursor-pointer">
            <i className="fas fa-bolt text-white text-3xl group-hover:scale-125 transition-transform"></i>
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
            {isSignUp ? 'Nova Conta' : 'Acessar VioShop'}
          </h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
            v2.5 High-Performance Engine
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-4 tracking-widest">Seu melhor E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-5 px-6 focus:outline-none focus:border-pink-500/50 text-white font-bold text-sm transition-all focus:ring-4 focus:ring-pink-500/5"
              placeholder="exemplo@dominio.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-4 tracking-widest">Sua Senha Mestra</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-5 px-6 focus:outline-none focus:border-pink-500/50 text-white font-bold text-sm transition-all focus:ring-4 focus:ring-pink-500/5"
              placeholder="••••••••"
            />
          </div>

          {status && (
            <div className={`p-5 rounded-2xl text-[11px] font-bold border leading-relaxed animate-in slide-in-from-top-2 ${
              status.type === 'error' ? 'bg-red-500/5 border-red-500/20 text-red-400' : 
              status.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' :
              'bg-blue-500/5 border-blue-500/20 text-blue-400'
            }`}>
              <div className="flex items-start gap-3">
                <i className={`fas ${status.type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'} mt-0.5`}></i>
                <p>{status.message}</p>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-pink-500 hover:text-white transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">
              {loading ? <i className="fas fa-spinner animate-spin"></i> : (isSignUp ? 'CRIAR MINHA CONTA AGORA' : 'ENTRAR NO DASHBOARD')}
            </span>
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-8 items-center relative z-10">
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setStatus(null);
            }}
            type="button"
            className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            {isSignUp ? 'Já possui uma conta? Clique aqui' : 'Novo por aqui? Criar acesso gratuito'}
          </button>

          <div className="w-full flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-800"></div>
            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em]">OU</span>
            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

          <button 
            onClick={handleForceEntry}
            type="button"
            className="w-full py-4 border border-zinc-800 text-zinc-500 rounded-2xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-zinc-800 hover:text-white transition-all"
          >
            Entrar como Visitante (Modo Rápido)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
