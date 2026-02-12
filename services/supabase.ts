
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Variável privada para armazenar a instância única do cliente
let supabaseInstance: SupabaseClient | null = null;

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

/**
 * Retorna uma instância única do cliente Supabase (Singleton).
 * Isso evita o erro de "Multiple GoTrueClient instances" visto no console.
 */
export const getSupabaseClient = (): SupabaseClient | null => {
  // Se já existir uma instância, retornamos ela imediatamente
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const config = getSupabaseConfig();
  
  if (!config.url || !config.url.startsWith('http')) {
    return null;
  }
  
  try {
    // Criamos a instância apenas se ela ainda não existir
    supabaseInstance = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'vioshop-auth-token',
        storage: window.localStorage
      }
    });
    return supabaseInstance;
  } catch (e) {
    console.error("Falha ao inicializar Supabase:", e);
    return null;
  }
};

/**
 * Função utilitária para resetar a instância (usada quando o usuário troca as chaves nas configurações)
 */
export const resetSupabaseInstance = () => {
  supabaseInstance = null;
};
