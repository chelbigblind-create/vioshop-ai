
import React from 'react';
import { VideoProject } from '../types';

interface HistoryProps {
  projects: VideoProject[];
  onEdit: (p: VideoProject) => void;
}

const History: React.FC<HistoryProps> = ({ projects, onEdit }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Meus Vídeos</h2>
        <p className="text-zinc-400 mt-1">Gerencie seu histórico de criações e exportações.</p>
      </header>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-pink-500/30 transition-all flex flex-col">
              <div className="relative aspect-[9/16] bg-zinc-800 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-play-circle text-5xl text-white/50 group-hover:text-pink-500 group-hover:scale-110 transition-all"></i>
                </div>
                {/* Fallback visual preview */}
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 flex flex-col justify-end">
                  <div className="bg-pink-600/20 text-pink-500 text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">9:16 VERTICAL</div>
                  <p className="text-xs text-zinc-400 line-clamp-3 italic">"{project.script}"</p>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-red-500/80 transition-all">
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-zinc-900">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">{new Date(project.createdAt).toLocaleDateString()}</span>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">ID: {project.id.slice(0, 6)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => onEdit(project)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-edit"></i>
                    Editar
                  </button>
                  <button className="flex-1 bg-pink-600/10 text-pink-500 border border-pink-500/30 hover:bg-pink-600/20 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                    <i className="fas fa-download"></i>
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-3xl py-24 flex flex-col items-center justify-center text-zinc-500">
          <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-film text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-zinc-300">Nenhum vídeo gerado</h3>
          <p className="mt-2 text-zinc-500 max-w-xs text-center">Inicie seu primeiro projeto através do painel de descoberta de produtos.</p>
        </div>
      )}
    </div>
  );
};

export default History;
