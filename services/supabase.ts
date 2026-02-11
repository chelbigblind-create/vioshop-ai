
import { createClient } from '@supabase/supabase-js';

// Prioridade: LocalStorage (usuário configurou) -> Defaults (chaves enviadas)
const getSupabaseConfig = () => {
  const saved = localStorage.getItem('vioshop_supabase_config');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.url && parsed.anonKey) return parsed;
  }
  
  // Suas chaves fornecidas
  return { 
    url: 'https://qvscjobdzhqgnohizhde.supabase.co', 
    anonKey: 'sb_publishable_JAt9QKt4U-inxL6portt0w_jHZ8upeK' 
  };
};

export const getSupabaseClient = () => {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;
  
  try {
    return createClient(url, anonKey);
  } catch (e) {
    console.error("Erro ao inicializar Supabase:", e);
    return null;
  }
};
