
import { createClient } from '@supabase/supabase-js';

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
  
  // Chaves padrão para o primeiro acesso
  return { 
    url: 'https://qvscjobdzhqgnohizhde.supabase.co', 
    anonKey: 'sb_publishable_JAt9QKt4U-inxL6portt0w_jHZ8upeK' 
  };
};

export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  
  if (!config.url || !config.url.startsWith('http')) {
    return null;
  }
  
  try {
    return createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'vioshop-auth-token',
        storage: window.localStorage
      }
    });
  } catch (e) {
    console.error("Falha ao inicializar Supabase:", e);
    return null;
  }
};
