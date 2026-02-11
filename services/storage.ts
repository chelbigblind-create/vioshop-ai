
import { Product, VideoProject } from '../types';
import { getSupabaseClient } from './supabase';

const KEYS = {
  SAVED_PRODUCTS: 'vioshop_saved_products',
  VIDEO_HISTORY: 'vioshop_video_history'
};

export const StorageService = {
  // --- PRODUTOS ---
  getSavedProducts: async (): Promise<Product[]> => {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('saved_products').select('data').eq('user_id', user.id);
        if (data) return data.map(item => item.data as Product);
      }
    }
    const localData = localStorage.getItem(KEYS.SAVED_PRODUCTS);
    return localData ? JSON.parse(localData) : [];
  },

  saveProduct: async (product: Product) => {
    const products = await StorageService.getSavedProducts();
    if (!products.find(p => p.id === product.id)) {
      const updated = [product, ...products];
      localStorage.setItem(KEYS.SAVED_PRODUCTS, JSON.stringify(updated));
      
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('saved_products').insert({
            user_id: user.id,
            product_id: product.id,
            data: product
          });
        }
      }
      return updated;
    }
    return products;
  },

  // --- VÍDEOS ---
  getVideoHistory: async (): Promise<VideoProject[]> => {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('video_projects').select('data').eq('user_id', user.id);
        if (data) return data.map(item => item.data as VideoProject);
      }
    }
    const data = localStorage.getItem(KEYS.VIDEO_HISTORY);
    return data ? JSON.parse(data) : [];
  },

  saveVideo: async (video: VideoProject) => {
    const history = await StorageService.getVideoHistory();
    const updated = [video, ...history];
    localStorage.setItem(KEYS.VIDEO_HISTORY, JSON.stringify(updated));

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('video_projects').insert({
          user_id: user.id,
          project_id: video.id,
          data: video
        });
      }
    }
    return updated;
  }
};
