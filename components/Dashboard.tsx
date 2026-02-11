
import React from 'react';
import { VideoProject } from '../types';

interface DashboardProps {
  onNewVideo: () => void;
  videoCount: number;
  savedCount: number;
  history: VideoProject[];
  hasApiKey: boolean;
  onActivateKey: () => void;
  isCloudSync?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onNewVideo, 
  videoCount, 
  savedCount, 
  history, 
  hasApiKey,
  onActivateKey,
  isCloudSync
}) => {
  const launchChecklist = [
    { task: "Definir Nicho de Atuação", desc: "Escolha entre Cozinha, Tech ou Beleza.", status: true },
    { task: "Gerar Identidade Visual", desc: "Crie seu logo na aba Identidade.", status: savedCount > 0 },
    { task: "Baixar Documentos de Auditoria", desc: "PDFs enviados para o TikTok.", status: true },
    { task: "Aquecer Conta do TikTok", desc: "Poste 2 vídeos orgânicos por dia na conta nova.", status: false },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Banner de Status de Auditoria */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-pink-900/40 border border-indigo-500/20 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl relative overflow-hidden">
        {isCloudSync && (
          <div className="absolute top-4 right-8 flex items-center gap-2">
            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Nuvem Supabase Ativa</span>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
          </div>
        )}
        
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
            <i className="fas fa-hourglass-half animate-spin-slow"></i>
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase italic">Modo Preparação Ativo</h3>
            <p className="text-zinc-400 text-sm">Sua conta está em análise. Use este tempo para estruturar sua estratégia.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            Auditoria: 100% Enviada
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checklist de Lançamento */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Checklist de Lançamento</h3>
            <span className="text-pink-500 font-black text-xs uppercase tracking-widest">Acelere seus Resultados</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {launchChecklist.map((item, idx) => (
              <div key={idx} className={`p-6 rounded-[2rem] border transition-all ${item.status ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-zinc-950 border-zinc-800 opacity-60'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${item.status ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                    {item.status ? <i className="fas fa-check"></i> : idx + 1}
                  </div>
                  {item.status && <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Concluído</span>}
                </div>
                <h4 className={`font-bold mb-1 ${item.status ? 'text-white' : 'text-zinc-400'}`}>{item.task}</h4>
                <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 text-center space-y-6 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Sua Biblioteca</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <p className="text-2xl font-black text-white leading-none mb-1">{savedCount}</p>
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Produtos</p>
              </div>
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <p className="text-2xl font-black text-white leading-none mb-1">{videoCount}</p>
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Vídeos</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
               <p className="text-[9px] text-zinc-600 font-bold leading-relaxed italic uppercase">
                 Dica: {isCloudSync ? 'Seus dados estão seguros na nuvem VioShop.' : 'Logue para salvar seus dados permanentemente.'}
               </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
