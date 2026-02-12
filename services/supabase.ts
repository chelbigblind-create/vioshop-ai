
import { createClient } from '@supabase/supabase-js';

// Prioridade: LocalStorage (usuário configurou) -> Defaults do projeto
const getSupabaseConfig = () => {
  const saved = localStorage.getItem('vioshop_supabase_config');
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey && parsed.url.includes('supabase.co')) {
        return parsed;
      }
    } catch (e) {
      console.error("Erro ao ler config do localStorage", e);
    }
  }
  
  // Chaves padrões do sistema (Caso o usuário ainda não tenha configurado as dele)
  return { 
    url: 'https://qvscjobdzhqgnohizhde.supabase.co', 
    anonKey: 'sb_publishable_JAt9QKt4U-inxL6portt0w_jHZ8upeK' // Nota: Essa chave parece ser de outro serviço, mas mantendo conforme solicitado.
  };
};

export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  
  // Validação básica de URL de Supabase para evitar crash
  if (!config.url || !config.url.startsWith('http')) {
    console.warn("Supabase URL inválida. Verifique as Configurações.");
    return null;
  }
  
  try {
    return createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } catch (e) {
    console.error("Falha crítica ao inicializar Supabase Client:", e);
    return null;
  }
};
