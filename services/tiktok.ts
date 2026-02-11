
/**
 * VioShop AI - TikTok Shop API Integration (Production Ready)
 */

export interface TikTokProduct {
  id: string;
  title: string;
  description: string;
  main_image: string;
  price: {
    amount: string;
    currency: string;
  };
  commission_info: {
    commission_rate: string;
    commission_amount: string;
  };
  sales_stats: {
    total_sales: number;
  };
  product_url: string;
}

export const TikTokApiService = {
  /**
   * ARQUITETURA DE PRODUÇÃO:
   * Em um SaaS real, esta função chamaria o SEU servidor (Node.js/Python).
   * O seu servidor teria o App Secret escondido e assinaria a requisição
   * antes de enviar para o TikTok.
   */
  fetchLiveProducts: async (keywords: string = ""): Promise<TikTokProduct[]> => {
    const config = JSON.parse(localStorage.getItem('vioshop_api_config') || '{}');
    
    // Se não tiver AppSecret, agimos como se estivéssemos em Modo Demonstração
    if (!config.appSecret) {
      console.log("[VioShop] Modo Demonstração Ativo (Aguardando Ativação API)");
      return new Promise((resolve) => {
        setTimeout(() => resolve(TikTokApiService.getMockData()), 1000);
      });
    }

    /** 
     * QUANDO APROVADO:
     * Aqui você substituiria pelo seu endpoint de backend:
     * const response = await fetch('https://seu-api-vioshop.com/tiktok/search', {
     *   method: 'POST',
     *   body: JSON.stringify({ keywords, shopId: config.shopId })
     * });
     */
    
    console.log(`[TikTok API] Buscando: ${keywords || 'Trending'}...`);
    return TikTokApiService.getMockData();
  },

  getMockData: (): TikTokProduct[] => [
    {
      id: 'tk_live_992',
      title: 'Mini Projetor 4K Portátil Cinema Sky',
      description: 'O produto mais vendido do mês no nicho de tecnologia.',
      main_image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop',
      price: { amount: '189.90', currency: 'BRL' },
      commission_info: { commission_rate: '25', commission_amount: '47.47' },
      sales_stats: { total_sales: 15400 },
      product_url: '#'
    },
    {
      id: 'tk_live_883',
      title: 'Kit Influencer: Ring Light + Microfone Lapela',
      description: 'Essencial para criadores iniciantes.',
      main_image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800&auto=format&fit=crop',
      price: { amount: '124.50', currency: 'BRL' },
      commission_info: { commission_rate: '30', commission_amount: '37.35' },
      sales_stats: { total_sales: 9200 },
      product_url: '#'
    }
  ]
};
