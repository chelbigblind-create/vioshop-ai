
/**
 * VioShop AI - Client Real TikTok Shop API (v202309)
 * Implementação técnica da assinatura e requests oficiais.
 */

export interface TikTokProductResponse {
  data: {
    products: Array<{
      id: string;
      title: string;
      description: string;
      main_images: { url_list: string[] }[];
      price: {
        sale_price: string;
        currency: string;
      };
    }>;
  };
}

export interface FormattedProduct {
  id: string;
  title: string;
  description: string;
  main_image: string;
  price: { amount: string; currency: string; };
  commission_info: { commission_rate: string; commission_amount: string; };
  sales_stats: { total_sales: number; };
  product_url: string;
}

export const TikTokApiService = {
  /**
   * Gera a assinatura HMAC-SHA256 exigida pelo TikTok Shop.
   * Algoritmo: app_secret + path + query_params + body + app_secret
   */
  generateSignature: async (path: string, params: Record<string, string>, body: string, secret: string) => {
    const sortedKeys = Object.keys(params).sort();
    let signString = secret + path;
    
    for (const key of sortedKeys) {
      signString += key + params[key];
    }
    
    signString += body + secret;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(signString));
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  },

  fetchLiveProducts: async (search_query: string = ""): Promise<FormattedProduct[]> => {
    const config = JSON.parse(localStorage.getItem('vioshop_api_config') || '{}');
    const { appKey, appSecret, accessToken, shopCipher } = config;

    if (!appKey || !appSecret || !accessToken) {
      console.error("[TikTok API] Credenciais incompletas no Settings.");
      return [];
    }

    const path = "/product/202309/products/search";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const params: Record<string, string> = {
      app_key: appKey,
      timestamp: timestamp,
      shop_cipher: shopCipher || ""
    };

    const bodyObj = {
      page_size: 20,
      search_emails: [],
      status: "ACTIVATE",
      title: search_query
    };
    const bodyStr = JSON.stringify(bodyObj);

    try {
      const signature = await TikTokApiService.generateSignature(path, params, bodyStr, appSecret);
      
      const queryStr = new URLSearchParams({ ...params, sign: signature }).toString();
      const url = `https://open-api.tiktokglobalshop.com${path}?${queryStr}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tts-access-token': accessToken
        },
        body: bodyStr
      });

      if (!response.ok) {
        throw new Error(`Erro API TikTok: ${response.status}`);
      }

      const result: TikTokProductResponse = await response.json();
      
      return result.data.products.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        main_image: p.main_images[0]?.url_list[0] || "",
        price: {
          amount: p.price.sale_price,
          currency: p.price.currency
        },
        commission_info: {
          commission_rate: "20", // Idealmente vem da API de Afiliados
          commission_amount: (parseFloat(p.price.sale_price) * 0.2).toFixed(2)
        },
        sales_stats: { total_sales: 0 },
        product_url: "#"
      }));

    } catch (e) {
      console.error("[TikTok API] Falha na requisição real:", e);
      // Fallback para fins de visualização de UI caso o CORS bloqueie
      return [];
    }
  }
};
