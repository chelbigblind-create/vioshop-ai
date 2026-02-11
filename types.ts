
export enum View {
  DASHBOARD = 'DASHBOARD',
  PRODUCT_DISCOVERY = 'PRODUCT_DISCOVERY',
  SAVED_PRODUCTS = 'SAVED_PRODUCTS',
  WIZARD = 'WIZARD',
  EDITOR = 'EDITOR',
  HISTORY = 'HISTORY',
  BRANDING = 'BRANDING',
  SETTINGS = 'SETTINGS', // Nova view para configurar API real
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
  LANDING = 'LANDING'
}

export interface ApiConfig {
  appKey: string;
  appSecret: string;
  region: string;
  shopId?: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  commissionRate: number;
  category: string;
  link: string;
  stats: {
    sales: number;
    conversion: number;
    trending: boolean;
  };
}

export interface Avatar {
  id: string;
  name: string;
  style: string;
  previewUrl: string;
}

export interface Voice {
  id: string;
  name: string;
  gender: 'M' | 'F';
  previewUrl: string;
}

export interface Scene {
  id: string;
  name: string;
  previewUrl: string;
}

export interface VideoProject {
  id: string;
  productId: string;
  avatarId: string;
  voiceId: string;
  sceneId: string;
  script: string;
  voiceConfig: {
    pitch: 'low' | 'neutral' | 'high';
    speed: 'slow' | 'normal' | 'fast';
    intonation: 'neutral' | 'excited' | 'persuasive' | 'energetic';
  };
  generatedUrl?: string;
  createdAt: string;
}
