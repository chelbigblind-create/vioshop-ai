
import { Product, Avatar, Voice, Scene } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Liquidificador Portátil USB',
    image: 'https://picsum.photos/seed/blender/400/400',
    price: 89.90,
    category: 'Cozinha',
    link: 'https://tiktok.com/shop/example1',
    stats: { sales: 1200, conversion: 12.5, trending: true }
  },
  {
    id: 'p2',
    name: 'Fone de Ouvido Noise Cancelling',
    image: 'https://picsum.photos/seed/headphone/400/400',
    price: 249.00,
    category: 'Eletrônicos',
    link: 'https://tiktok.com/shop/example2',
    stats: { sales: 850, conversion: 8.2, trending: false }
  },
  {
    id: 'p3',
    name: 'Kit de Maquiagem Profissional',
    image: 'https://picsum.photos/seed/makeup/400/400',
    price: 159.00,
    category: 'Beleza',
    link: 'https://tiktok.com/shop/example3',
    stats: { sales: 2300, conversion: 15.4, trending: true }
  },
  {
    id: 'p4',
    name: 'Luminária Projetor Galáxia',
    image: 'https://picsum.photos/seed/galaxy/400/400',
    price: 119.00,
    category: 'Decoração',
    link: 'https://tiktok.com/shop/example4',
    stats: { sales: 4500, conversion: 22.1, trending: true }
  },
];

export const AVATARES: Avatar[] = [
  { id: 'a1', name: 'Lucas', style: 'Casual Moderno', previewUrl: 'https://picsum.photos/seed/lucas/200/300' },
  { id: 'a2', name: 'Sofia', style: 'Executiva Profissional', previewUrl: 'https://picsum.photos/seed/sofia/200/300' },
  { id: 'a3', name: 'Mundo AI', style: 'Futurista / Cyber', previewUrl: 'https://picsum.photos/seed/cyber/200/300' },
  { id: 'a4', name: 'Juliana', style: 'Lifestyle Blogger', previewUrl: 'https://picsum.photos/seed/juliana/200/300' },
];

export const VOICES: Voice[] = [
  { id: 'v1', name: 'Ricardo', gender: 'M', previewUrl: '#' },
  { id: 'v2', name: 'Ana', gender: 'F', previewUrl: '#' },
  { id: 'v3', name: 'Carlos', gender: 'M', previewUrl: '#' },
  { id: 'v4', name: 'Helena', gender: 'F', previewUrl: '#' },
];

export const SCENES: Scene[] = [
  { id: 's1', name: 'Quarto Moderno', previewUrl: 'https://picsum.photos/seed/room/300/500' },
  { id: 's2', name: 'Escritório Home Office', previewUrl: 'https://picsum.photos/seed/office/300/500' },
  { id: 's3', name: 'Estúdio Profissional', previewUrl: 'https://picsum.photos/seed/studio/300/500' },
  { id: 's4', name: 'Fundo Comercial', previewUrl: 'https://picsum.photos/seed/commercial/300/500' },
];
