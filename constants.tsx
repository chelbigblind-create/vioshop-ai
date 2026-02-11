
import { Product, Avatar, Voice, Scene } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Liquidificador Portátil USB Turbo',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=400&h=400&auto=format&fit=crop',
    price: 89.90,
    commissionRate: 20,
    category: 'Cozinha',
    link: '#',
    stats: { sales: 1200, conversion: 12.5, trending: true }
  },
  {
    id: 'p2',
    name: 'Fone Noise Cancelling Pro',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=400&auto=format&fit=crop',
    price: 249.00,
    commissionRate: 15,
    category: 'Eletrônicos',
    link: '#',
    stats: { sales: 850, conversion: 8.2, trending: false }
  },
  {
    id: 'p3',
    name: 'Kit Maquiagem Matte Finish',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=400&h=400&auto=format&fit=crop',
    price: 159.00,
    commissionRate: 30,
    category: 'Beleza',
    link: '#',
    stats: { sales: 2300, conversion: 15.4, trending: true }
  },
  {
    id: 'p4',
    name: 'Luminária Projetor Galaxy 360',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400&h=400&auto=format&fit=crop',
    price: 119.00,
    commissionRate: 25,
    category: 'Decoração',
    link: '#',
    stats: { sales: 4500, conversion: 22.1, trending: true }
  },
];

export const AVATARES: Avatar[] = [
  { id: 'a1', name: 'Lucas', style: 'Casual Moderno', previewUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=400&auto=format&fit=crop' },
  { id: 'a2', name: 'Sofia', style: 'Executiva Pro', previewUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=400&auto=format&fit=crop' },
  { id: 'a3', name: 'Mundo AI', style: 'Futurista', previewUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=300&h=400&auto=format&fit=crop' },
  { id: 'a4', name: 'Juliana', style: 'Blogger', previewUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&h=400&auto=format&fit=crop' },
];

export const VOICES: Voice[] = [
  { id: 'v1', name: 'Ricardo', gender: 'M', previewUrl: '#' },
  { id: 'v2', name: 'Ana', gender: 'F', previewUrl: '#' },
  { id: 'v3', name: 'Carlos', gender: 'M', previewUrl: '#' },
  { id: 'v4', name: 'Helena', gender: 'F', previewUrl: '#' },
];

export const SCENES: Scene[] = [
  { id: 's1', name: 'Quarto Moderno', previewUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&h=500&auto=format&fit=crop' },
  { id: 's2', name: 'Home Office', previewUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=300&h=500&auto=format&fit=crop' },
  { id: 's3', name: 'Estúdio Pro', previewUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=300&h=500&auto=format&fit=crop' },
  { id: 's4', name: 'Fundo Comercial', previewUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=300&h=500&auto=format&fit=crop' },
];
