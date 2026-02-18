
export enum View {
  DASHBOARD = 'DASHBOARD',
  PRODUCT_DISCOVERY = 'PRODUCT_DISCOVERY',
  SAVED_PRODUCTS = 'SAVED_PRODUCTS',
  WIZARD = 'WIZARD',
  EDITOR = 'EDITOR',
  HISTORY = 'HISTORY',
  BRANDING = 'BRANDING',
  SETTINGS = 'SETTINGS',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
  LANDING = 'LANDING'
}

export interface TikTokPermissions {
  marketing: 'approved' | 'pending' | 'none';
  engagement: 'approved' | 'pending' | 'none';
  catalog: 'approved' | 'pending' | 'none';
  affiliate: 'approved' | 'pending' | 'none';
  connectors: 'approved' | 'pending' | 'none';
  security_assessment: 'approved' | 'pending' | 'none';
}

export interface ApiConfig {
  appKey: string;
  appSecret: string;
  partnerId: string;
  legalName: string; 
  cnpj: string; // Adicionado para conformidade fiscal/GSO
  region: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: number;
  sellerName?: string;
  openId?: string;
  permissions: TikTokPermissions;
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
