
import React, { useState, useEffect } from 'react';
import { ApiConfig } from '../types';
import { resetSupabaseInstance } from '../services/supabase';

const Settings: React.FC = () => {
  const [config, setConfig] = useState<ApiConfig>({
    appKey: '6j2c6seef6dre',
    appSecret: '',
    region: 'BR',
    shopId: ''
  });

  const [dbConfig, setDbConfig] = useState({
    url: 'https://qvscjobdzhqgnohizhde.supabase.co',
    anonKey: 'sb_publishable_JAt9QKt4U-inxL6portt0w_jHZ8upeK'
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isDbSaved, setIsDbSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vioshop_api_config');
    if (saved) setConfig(JSON.parse(saved));

    const savedDb = localStorage.getItem('vioshop_supabase_config');
    if (savedDb) setDbConfig(JSON.parse(savedDb));
  }, []);

  const handleSaveApi = () => {
    localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSaveDb = () => {
    localStorage.setItem('vioshop_supabase_config', JSON.stringify(dbConfig));
    resetSupabaseInstance(); // Limpa a instância antiga antes de recarregar
    setIsDbSaved(true);
    setTimeout(() => setIsDbSaved(false), 3000);
    // Pequeno delay para garantir o salvamento antes do reload
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24">
      <header className="relative p-12 rounded-[3.5rem] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
           <div className="w-24 h-24 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center text-3xl text-indigo-500 shadow-lg shadow-indigo-500/20">
              <i className="fas fa-database"></i>
           </div>
           <div className="text-center md:text-left">
              <h2 className="text-5xl font-black tracking-tighter text-white italic uppercase leading-none mb-4">
                Configurações do <span className="text-indigo-500">SaaS</span>
              </h2>
              <p className="text-zinc-400 font-medium max-w-xl">
                Conecte seu catálogo TikTok e seu banco de dados Supabase para escalar sua operação.
              </p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* BANCO DE DADOS SUPABASE */}
        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white italic uppercase">Nuvem Supabase</h3>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-emerald-500 uppercase">Detectado</span>
               <i className="fas fa-cloud text-indigo-500"></i>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">Project URL:</label>
              <input 
                type="text" 
                placeholder="https://xyz.supabase.co"
                value={dbConfig.url}
                onChange={(e) => setDbConfig({...dbConfig, url: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500 text-sm font-bold text-white mt-2"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">Anon Public Key:</label>
              <input 
                type="password" 
                placeholder="eyJh..."
                value={dbConfig.anonKey}
                onChange={(e) => setDbConfig({...dbConfig, anonKey: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500 text-sm font-bold text-white mt-2"
              />
            </div>
          </div>

          <button onClick={handleSaveDb} className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${isDbSaved ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'}`}>
            {isDbSaved ? 'CONEXÃO ESTABELECIDA ✓' : 'SALVAR E CONECTAR BANCO'}
          </button>
          
          <p className="text-[9px] text-zinc-600 text-center uppercase font-bold tracking-tighter">
            Nota: Certifique-se de rodar o SQL de tabelas no seu painel Supabase.
          </p>
        </div>

        {/* TIKTOK API */}
        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white italic uppercase">TikTok Shop API</h3>
            <i className="fab fa-tiktok text-pink-500"></i>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">App Secret:</label>
              <input 
                type="password" 
                placeholder="Insira após a aprovação do TikTok"
                value={config.appSecret}
                onChange={(e) => setConfig({...config, appSecret: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-pink-500 text-sm font-bold text-white mt-2"
              />
            </div>
          </div>

          <button onClick={handleSaveApi} className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-pink-600 hover:text-white shadow-xl'}`}>
            {isSaved ? 'API CONFIGURADA ✓' : 'SALVAR CHAVE TIKTOK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
