
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { TikTokApiService, FormattedProduct } from '../services/tiktok';

interface ProductDiscoveryProps {
  onSave: (p: Product) => void;
  savedProducts: Product[];
  onSelect: (p: Product) => void;
}

const CATEGORIES = [
  { id: '', name: 'Todas as Categorias' },
  { id: 'fashion', name: 'Moda' },
  { id: 'electronics', name: 'Eletrônicos' },
  { id: 'beauty', name: 'Beleza' },
  { id: 'home', name: 'Casa' },
  { id: 'toys', name: 'Brinquedos' }
];

const ProductDiscovery: React.FC<ProductDiscoveryProps> = ({ onSave, savedProducts, onSelect }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minComm, setMinComm] = useState(15);
  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('vioshop_api_config') || '{}');
    setApiConnected(!!config.accessToken);
    mine();
  }, []);

  const mine = async () => {
    setIsLoading(true);
    try {
      const data = await TikTokApiService.fetchLiveProducts({
        search,
        category,
        minCommission: minComm
      });
      
      // Fallback Visual para Demonstração (Mock) se a API não estiver conectada
      if (data.length === 0 && !apiConnected) {
        setProducts([1,2,3,4,5,6,7,8].map(i => ({
          id: `demo_${i}`,
          title: `Produto Viral #${i} - Tendência TikTok`,
          description: "Dados capturados via TikTok Shop API",
          main_image: `https://images.unsplash.com/photo-${1550000000000 + i * 10000}?q=80&w=400&h=400&auto=format&fit=crop`,
          price: { amount: (Math.random() * 150 + 20).toFixed(2), currency: "BRL" },
          commission_info: { commission_rate: "20", commission_amount: "15.00" },
          sales_stats: { total_sales: Math.floor(Math.random() * 2000) },
          product_url: "#",
          category: "Viral",
          shop_name: "Top Store TikTok",
          shop_rating: "4.9"
        })));
      } else {
        setProducts(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const adaptToProduct = (tp: FormattedProduct): Product => ({
    id: tp.id,
    name: tp.title,
    image: tp.main_image,
    price: parseFloat(tp.price.amount),
    commissionRate: parseInt(tp.commission_info.commission_rate),
    category: tp.category,
    link: tp.product_url,
    stats: { sales: tp.sales_stats.total_sales, conversion: 12.5, trending: tp.sales_stats.total_sales > 100 }
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
            Minerador <span className="text-indigo-500">TikTok Shop</span>
          </h2>
          <div className="flex items-center gap-3 mt-3">
             <div className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
               {apiConnected ? 'API Oficial: Conectada' : 'Modo Demonstração (Conecte sua API em Ajustes)'}
             </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-white text-[10px] font-black uppercase px-6 py-4 rounded-2xl outline-none"
          >
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl flex items-center gap-4">
             <span className="text-[10px] font-black text-zinc-500 uppercase">Comissão: {minComm}%+</span>
             <input 
              type="range" min="5" max="50" step="5" 
              value={minComm} 
              onChange={(e) => setMinComm(parseInt(e.target.value))}
              className="w-24 accent-indigo-500"
             />
          </div>
        </div>
      </header>

      <div className="relative group">
        <input 
          type="text" 
          placeholder="Buscar produtos lucrativos por palavra-chave..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && mine()}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-[2.5rem] py-7 pl-16 pr-40 focus:outline-none focus:border-indigo-500 transition-all text-sm font-medium text-white shadow-2xl"
        />
        <i className="fas fa-search absolute left-7 top-1/2 -translate-y-1/2 text-zinc-600"></i>
        <button 
          onClick={mine}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-indigo-600 hover:text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase transition-all"
        >
          {isLoading ? 'Escaneando...' : 'Minerar Agora'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((tp) => {
          const product = adaptToProduct(tp);
          return (
            <div key={tp.id} className="bg-zinc-900/40 border border-zinc-800/50 rounded-[3rem] overflow-hidden group hover:border-indigo-500/40 transition-all p-3 flex flex-col">
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden">
                <img src={tp.main_image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-black text-white uppercase">
                  ⭐ {tp.shop_rating}
                </div>
                {tp.sales_stats.total_sales > 500 && (
                   <div className="absolute bottom-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase">
                     🔥 Bestseller
                   </div>
                )}
              </div>
              
              <div className="p-6 space-y-6">
                <h4 className="font-bold text-xs text-zinc-200 line-clamp-2 h-8">{tp.title}</h4>
                
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-zinc-500 font-black uppercase">Preço Final</span>
                    <span className="text-sm font-black text-white">R$ {tp.price.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-indigo-400 font-black uppercase">Sua Comissão</span>
                    <span className="text-sm font-black text-indigo-400">{tp.commission_info.commission_rate}%</span>
                  </div>
                  <div className="w-full h-px bg-zinc-800"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-zinc-500 font-black uppercase">Total Vendas</span>
                    <span className="text-xs font-black text-zinc-300">{tp.sales_stats.total_sales} unid.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => onSelect(product)}
                    className="flex-1 bg-white text-black hover:bg-indigo-600 hover:text-white py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all"
                  >
                    Gerar Vídeo IA
                  </button>
                  <button 
                    onClick={() => onSave(product)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                      savedProducts.find(p => p.id === product.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
                    }`}
                  >
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDiscovery;
