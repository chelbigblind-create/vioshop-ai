
import React from 'react';
import { Product } from '../types';

interface SavedProductsProps {
  products: Product[];
  onRemove: (p: Product) => void;
  onSelect: (p: Product) => void;
}

const SavedProducts: React.FC<SavedProductsProps> = ({ products, onRemove, onSelect }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Produtos Salvos</h2>
        <p className="text-zinc-400 mt-1">Sua biblioteca pessoal de produtos potenciais para vídeos.</p>
      </header>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-zinc-800">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button 
                  onClick={() => onRemove(product)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-pink-600 text-white shadow-lg"
                >
                  <i className="fas fa-bookmark"></i>
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-semibold text-zinc-100 mb-1 line-clamp-2">{product.name}</h4>
                <p className="text-xl font-bold text-pink-500 mt-auto">R$ {product.price.toFixed(2)}</p>
                
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => onSelect(product)}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-bold transition-all text-sm"
                  >
                    Gerar Vídeo
                  </button>
                  <a 
                    href={product.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center rounded-lg transition-all"
                  >
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-3xl py-24 flex flex-col items-center justify-center text-zinc-500">
          <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-bookmark text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-zinc-300">Biblioteca vazia</h3>
          <p className="mt-2 text-zinc-500 max-w-xs text-center">Salve produtos que você encontrar no explorador para acessá-los rapidamente depois.</p>
        </div>
      )}
    </div>
  );
};

export default SavedProducts;
