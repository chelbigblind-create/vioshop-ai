
import React, { useState } from 'react';
import { Product, View } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductDiscoveryProps {
  onSave: (p: Product) => void;
  savedProducts: Product[];
  onSelect: (p: Product) => void;
}

const ProductDiscovery: React.FC<ProductDiscoveryProps> = ({ onSave, savedProducts, onSelect }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (filter === 'trending') return matchesSearch && p.stats.trending;
    if (filter === 'best') return matchesSearch && p.stats.sales > 1000;
    if (filter === 'conversion') return matchesSearch && p.stats.conversion > 10;
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Explorar TikTok Shop</h2>
        <p className="text-zinc-400 mt-1">Encontre produtos vencedores para seu próximo vídeo viral.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"></i>
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { id: 'all', label: 'Todos', icon: 'fas fa-th-large' },
            { id: 'trending', label: 'Trending', icon: 'fas fa-fire text-orange-500' },
            { id: 'best', label: 'Mais Vendidos', icon: 'fas fa-medal text-yellow-500' },
            { id: 'conversion', label: 'Alta Conversão', icon: 'fas fa-chart-line text-emerald-500' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${
                filter === f.id ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <i className={f.icon}></i>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-zinc-800">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.stats.trending && (
                  <span className="bg-orange-500/90 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white">Trending</span>
                )}
                <span className="bg-zinc-900/80 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white border border-zinc-700">{product.category}</span>
              </div>
              <button 
                onClick={() => onSave(product)}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  savedProducts.find(p => p.id === product.id) ? 'bg-pink-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <i className={`${savedProducts.find(p => p.id === product.id) ? 'fas' : 'far'} fa-bookmark`}></i>
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="font-semibold text-zinc-100 mb-1 line-clamp-2">{product.name}</h4>
              <p className="text-xl font-bold text-pink-500 mt-auto">R$ {product.price.toFixed(2)}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-zinc-500 border-t border-zinc-800 pt-3">
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-shopping-cart text-zinc-600"></i>
                  <span>{product.stats.sales} vendas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-percent text-zinc-600"></i>
                  <span>{product.stats.conversion}% conv.</span>
                </div>
              </div>

              <button 
                onClick={() => onSelect(product)}
                className="w-full mt-4 bg-zinc-800 hover:bg-pink-600 text-white py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 group-hover:bg-pink-600 active:scale-95"
              >
                Criar Vídeo
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDiscovery;
