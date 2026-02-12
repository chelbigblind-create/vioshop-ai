
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
  const [status, setStatus] = useState<{type: 'error' | 'success', message: string} | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setStatus(null);
    
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      setStatus({ 
        type: 'error', 
        message: 'ERRO CRÍTICO: Conexão com o banco de dados falhou. Verifique as configurações.' 
      });
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // Fluxo de Cadastro SaaS
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: email.split('@')[0],
              plan: 'ULTRA_V2.5_PRO'
            }
          }
        });
        
        if (error) throw error;
        
        // Se o 'Confirm Email' estiver DESATIVADO no Supabase, 'data.session' existirá aqui.
        if (data.session) {
          onSession(data.session);
        } else {
          // Se cair aqui, a conta foi criada no Supabase mas a verificação de e-mail ainda é obrigatória no painel.
          setStatus({ 
            type: 'success', 
            message: 'Licença pré-aprovada! Por favor, valide o link enviado ao seu e-mail para desbloquear o motor Veo 3.1.' 
          });
        }
      } else {
        // Fluxo de Login Tradicional
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) onSession(data.session);
      }
    } catch (error: any) {
      console.error("Auth Exception:", error);
      let msg = error.message;
      
      // Tradução de erros comuns do Supabase para o usuário final
      if (msg.includes('Email not confirmed')) {
        msg = 'Sua conta aguarda verificação. Confira seu e-mail ou desative a exigência de confirmação no painel de controle do banco.';
      } else if (msg.includes('Invalid login credentials')) {
        msg = 'Dados de acesso incorretos. Verifique seu e-mail e senha de segurança.';
      } else if (msg.includes('User already registered')) {
        msg = 'Este e-mail já possui uma licença ativa. Tente realizar o login.';
      } else if (msg.includes('rate limit')) {
        msg = 'Muitas tentativas. Por segurança, aguarde alguns minutos.';
      }
      
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-1 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 rounded-[3.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.9)] animate-in zoom-in duration-500">
      <div className="bg-[#080808] p-12 rounded-[3.3rem] relative overflow-hidden h-full">
        {/* Camadas de Brilho Decorativas */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-pink-600/10 blur-[100px] rounded-full"></div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[2.2rem] flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] mx-auto mb-8 transition-transform hover:scale-110 duration-500">
            <i className="fas fa-bolt text-white text-4xl"></i>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
            {isSignUp ? 'Assinar VioShop' : 'Acesso Cliente'}
          </h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-4">
            Licença Enterprise v2.5 Active
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-7 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-5 tracking-[0.2em]">E-mail Corporativo</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl py-6 px-8 focus:outline-none focus:border-indigo-500/50 text-white font-bold text-sm transition-all focus:ring-8 focus:ring-indigo-500/5 placeholder:text-zinc-700"
              placeholder="contato@empresa.com"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-5 tracking-[0.2em]">Chave de Segurança</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl py-6 px-8 focus:outline-none focus:border-indigo-500/50 text-white font-bold text-sm transition-all focus:ring-8 focus:ring-indigo-500/5 placeholder:text-zinc-700"
              placeholder="••••••••"
            />
          </div>

          {status && (
            <div className={`p-6 rounded-2xl text-[11px] font-bold border leading-relaxed animate-in slide-in-from-top-3 duration-300 ${
              status.type === 'error' ? 'bg-red-500/5 border-red-500/20 text-red-400' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
            }`}>
              <div className="flex items-start gap-4">
                <i className={`fas ${status.type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check'} mt-1 text-sm`}></i>
                <p>{status.message}</p>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-7 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-indigo-600 hover:text-white transition-all duration-300 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center gap-3">
              {loading ? <i className="fas fa-circle-notch animate-spin text-lg"></i> : (isSignUp ? 'Ativar Minha Licença' : 'Entrar no Sistema')}
            </span>
          </button>
        </form>

        <div className="mt-10 flex flex-col gap-6 items-center relative z-10 border-t border-zinc-900 pt-10">
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setStatus(null);
            }}
            type="button"
            className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-all hover:tracking-[0.2em]"
          >
            {isSignUp ? 'Já possui licença? Fazer Login' : 'Novo Afiliado? Criar conta de acesso'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
