
/**
 * VioShop AI - Official TikTok Shop API Service (v202407)
 */

export interface FormattedProduct {
  id: string;
  title: string;
  description: string;
  main_image: string;
  price: { amount: string; currency: string; };
  commission_info: { commission_rate: string; commission_amount: string; };
  sales_stats: { total_sales: number; };
  product_url: string;
  category: string;
  shop_name: string;
  shop_rating?: string;
}

export const TikTokApiService = {
  /**
   * Gera o link para o vendedor/afiliado autorizar o acesso
   */
  getAuthLink: (appKey: string, region: string = 'BR') => {
    // O service_id no TikTok Shop Partner Center é o próprio App Key
    const baseUrl = region === 'US' 
      ? 'https://services.tiktokshops.us/open/authorize' 
      : 'https://services.tiktokshop.com/open/authorize';
    return `${baseUrl}?service_id=${appKey}&state=vioshop_auth`;
  },

  /**
   * Criptografia HMAC exigida pelo TikTok para validar cada chamada
   */
  generateSignature: async (path: string, params: Record<string, string>, secret: string) => {
    // 1. Ordenar chaves alfabeticamente (exigência do TikTok)
    const sortedKeys = Object.keys(params).sort();
    
    // 2. Concatenar: Secret + Path + Params (chave+valor) + Secret
    let signString = secret + path;
    for (const key of sortedKeys) {
      signString += key + params[key];
    }
    signString += secret;

    // 3. Gerar HMAC-SHA256
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false, ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(signString));
    
    // 4. Retornar Hexadecimal
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  },

  /**
   * Busca produtos reais usando o token de acesso obtido via OAuth
   */
  fetchLiveProducts: async (filters: { 
    search?: string, 
    category?: string, 
    minCommission?: number 
  }): Promise<FormattedProduct[]> => {
    const config = JSON.parse(localStorage.getItem('vioshop_api_config') || '{}');
    const { appKey, appSecret, accessToken } = config;

    // Se não houver token, retorna vazio (a UI mostrará o modo demo)
    if (!accessToken || !appKey || !appSecret) {
      console.warn("API TikTok não conectada. Usando dados Mock.");
      return [];
    }

    const path = "/affiliate/202309/products/search";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    // Parâmetros obrigatórios na URL
    const commonParams: Record<string, string> = {
      app_key: appKey,
      timestamp: timestamp,
    };

    // Corpo da requisição
    const bodyObj = {
      page_size: 20,
      keywords: filters.search || "viral",
      min_commission_rate: filters.minCommission || 10,
      region: "BR" // Altere conforme sua região no Partner Center
    };
    const bodyStr = JSON.stringify(bodyObj);

    try {
      // No TikTok, o body NÃO entra na assinatura para este endpoint específico (v202309), 
      // mas os query params sim.
      const signature = await TikTokApiService.generateSignature(path, commonParams, appSecret);
      
      const queryParams = new URLSearchParams({ ...commonParams, sign: signature });
      
      const response = await fetch(`https://open-api.tiktokglobalshop.com${path}?${queryParams.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tts-access-token': accessToken
        },
        body: bodyStr
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        console.error("Erro na API TikTok:", result.message);
        return [];
      }

      return result.data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description || "",
        main_image: p.main_images?.[0]?.url_list?.[0] || "",
        price: { 
          amount: (p.price?.sale_price || "0.00"), 
          currency: p.price?.currency || "BRL" 
        },
        commission_info: { 
          commission_rate: p.commission_rate || "10", 
          commission_amount: p.commission_amount || "0.00" 
        },
        sales_stats: { total_sales: p.sales || 0 },
        product_url: p.share_url || "#",
        category: p.category_name || "Geral",
        shop_name: p.seller_name || "TikTok Seller",
        shop_rating: p.seller_rating || "4.8"
      }));
    } catch (e) {
      console.error("Falha na mineração TikTok:", e);
      return [];
    }
  },

  /**
   * Troca o código temporário por um Token de Acesso permanente
   */
  exchangeCodeForToken: async (code: string) => {
    const config = JSON.parse(localStorage.getItem('vioshop_api_config') || '{}');
    const { appKey, appSecret } = config;

    if (!appKey || !appSecret) throw new Error("Chaves da API não encontradas no LocalStorage");

    const url = new URL('https://auth.tiktok-shops.com/api/v2/token/get');
    url.searchParams.append('app_key', appKey);
    url.searchParams.append('app_secret', appSecret);
    url.searchParams.append('auth_code', code);
    url.searchParams.append('grant_type', 'authorized_code');

    const response = await fetch(url.toString(), { method: 'GET' });
    const result = await response.json();

    if (result.code === 0) {
      const updatedConfig = {
        ...config,
        accessToken: result.data.access_token,
        refreshToken: result.data.refresh_token,
        tokenExpiry: result.data.access_token_expire_in,
        sellerName: result.data.seller_name || 'Loja Conectada'
      };
      localStorage.setItem('vioshop_api_config', JSON.stringify(updatedConfig));
      return updatedConfig;
    } else {
      throw new Error(result.message || "Erro ao trocar código por token");
    }
  }
};
