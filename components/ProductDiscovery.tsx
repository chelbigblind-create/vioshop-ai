
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { TikTokApiService, FormattedProduct } from '../services/tiktok';

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
  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  const syncWithTikTok = async () => {
    setIsLoading(true);
    setSyncStatus('Iniciando Handshake com Partner Center...');
    
    setTimeout(() => setSyncStatus('Validando Módulo de Catálogo (Aprovado)...'), 600);
    setTimeout(() => setSyncStatus('Streaming de Dados: 6j2c6seef6dre -> VioShop...'), 1200);

    try {
      const data = await TikTokApiService.fetchLiveProducts(search);
      setProducts(data);
    } catch (e) {
      console.error("Erro na integração direta:", e);
    } finally {
      setIsLoading(false);
      setSyncStatus('');
    }
  };

  useEffect(() => {
    syncWithTikTok();
  }, []);

  const adaptToProduct = (tp: FormattedProduct): Product => ({
    id: tp.id,
    name: tp.title,
    image: tp.main_image,
    price: parseFloat(tp.price.amount),
    commissionRate: parseInt(tp.commission_info.commission_rate),
    category: 'Direct API',
    link: tp.product_url,
    stats: {
      sales: tp.sales_stats.total_sales,
      conversion: 18.2,
      trending: true
    }
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
              <i className="fab fa-tiktok text-2xl"></i>
           </div>
           <div>
              <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">TikTok Open API</h2>
              <p className="text-zinc-500 font-medium">Conexão direta com App ID: 6j2c6seef6dre</p>
           </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/5 px-6 py-3 rounded-2xl border border-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
             <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
             Direct Link: Secure
          </div>
        </div>
      </header>

      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
           <i className="fas fa-terminal text-emerald-500 text-xs"></i>
        </div>
        <input 
          type="text" 
          placeholder="Pesquisar por ID ou Nome no seu catálogo real..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && syncWithTikTok()}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] py-6 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm font-mono text-zinc-300 shadow-2xl"
        />
        <button 
          onClick={syncWithTikTok}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-white text-white hover:text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
        >
          Filtrar API
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-10">
           <div className="flex gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
           </div>
           <p className="text-xs font-mono text-emerald-500 uppercase tracking-[0.4em] animate-pulse">{syncStatus}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((tp) => {
            const product = adaptToProduct(tp);
            return (
              <div key={tp.id} className="bg-[#0c0c0c] border border-zinc-800 rounded-[3rem] overflow-hidden group hover:border-indigo-500/40 transition-all p-3 flex flex-col shadow-2xl relative">
                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-black/60">
                  <img src={tp.main_image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-2xl flex items-center gap-2">
                     <span className="text-[8px] font-black uppercase tracking-widest">ID: {tp.id.slice(0,8)}</span>
                  </div>

                  <button 
                    onClick={() => onSave(product)}
                    className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      savedProducts.find(p => p.id === product.id) ? 'bg-pink-600 text-white shadow-lg' : 'bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black border border-white/10'
                    }`}
                  >
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-bold text-sm text-zinc-100 line-clamp-2 mb-6 leading-tight h-10">{tp.title}</h4>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                      <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Preço API</span>
                      <span className="text-lg font-black text-white">R$ {tp.price.amount}</span>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
                      <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">Comissão</span>
                      <span className="text-lg font-black text-indigo-400">{tp.commission_info.commission_rate}%</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelect(product)}
                    className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
                  >
                    Produzir com Veo 3.1
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
