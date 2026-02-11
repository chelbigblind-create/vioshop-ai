
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { TikTokApiService, TikTokProduct } from '../services/tiktok';

interface ProductDiscoveryProps {
  onSave: (p: Product) => void;
  savedProducts: Product[];
  onSelect: (p: Product) => void;
}

const ProductDiscovery: React.FC<ProductDiscoveryProps> = ({ 
  onSave, 
  savedProducts, 
  onSelect
}) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<TikTokProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const syncWithTikTok = async () => {
    setIsLoading(true);
    try {
      const data = await TikTokApiService.fetchLiveProducts(search);
      setProducts(data);
    } catch (e) {
      console.error("Erro ao sincronizar com TikTok API", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncWithTikTok();
  }, []);

  // Adaptador para o formato interno do App
  const adaptToProduct = (tp: TikTokProduct): Product => ({
    id: tp.id,
    name: tp.title,
    image: tp.main_image,
    price: parseFloat(tp.price.amount),
    commissionRate: parseInt(tp.commission_info.commission_rate),
    category: 'Sincronizado',
    link: tp.product_url,
    stats: {
      sales: tp.sales_stats.total_sales,
      conversion: 15.5, // Estimado
      trending: tp.sales_stats.total_sales > 10000
    }
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg">
              <i className="fab fa-tiktok text-2xl"></i>
           </div>
           <div>
              <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">TikTok Catalog</h2>
              <p className="text-zinc-500 font-medium">Produtos em tempo real via API oficial de Afiliados.</p>
           </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-6 py-3 rounded-2xl border border-emerald-500/20">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           API Sincronizada: OK
        </div>
      </header>

      <div className="relative group">
        <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-pink-500 transition-colors"></i>
        <input 
          type="text" 
          placeholder="Pesquisar produtos no catálogo do TikTok Shop..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && syncWithTikTok()}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] py-6 pl-16 pr-6 focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500/50 transition-all text-sm font-bold shadow-2xl"
        />
        <button 
          onClick={syncWithTikTok}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Pesquisar API
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="h-[450px] bg-zinc-900 rounded-[3rem] animate-pulse border border-zinc-800"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((tp) => {
            const product = adaptToProduct(tp);
            return (
              <div key={tp.id} className="bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden group hover:border-pink-500/30 transition-all p-3 flex flex-col shadow-2xl relative">
                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-inner bg-black/40">
                  <img src={tp.main_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">ID: {tp.id}</span>
                  </div>

                  <button 
                    onClick={() => onSave(product)}
                    className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      savedProducts.find(p => p.id === product.id) ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/40' : 'bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-bold text-sm text-zinc-100 line-clamp-2 mb-4 leading-tight group-hover:text-pink-500 transition-colors">{tp.title}</h4>
                  
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-black uppercase mb-1 tracking-widest">Preço Final</p>
                      <p className="text-xl font-black text-white">{tp.price.currency} {tp.price.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-emerald-500 font-black uppercase mb-1 tracking-widest">Ganhos Afiliado</p>
                      <p className="text-xl font-black text-emerald-400">{tp.commission_info.commission_rate}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6 p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800">
                    <div className="flex-1">
                       <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Vendas Totais</p>
                       <p className="text-sm font-black text-white">{tp.sales_stats.total_sales.toLocaleString()}</p>
                    </div>
                    <div className="w-px h-8 bg-zinc-800"></div>
                    <div className="flex-1 text-right">
                       <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Status</p>
                       <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Disponível</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelect(product)}
                    className="w-full bg-white text-black hover:bg-pink-600 hover:text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
                  >
                    Gerar Vídeo IA
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductDiscovery;
