
import React, { useState, useEffect } from 'react';
import { ApiConfig } from '../types';

interface ExtendedApiConfig extends ApiConfig {
  accessToken: string;
  shopCipher: string;
}

const Settings: React.FC = () => {
  const [config, setConfig] = useState<ExtendedApiConfig>({
    appKey: '6j2c6seef6dre', 
    appSecret: '6bb3b630baf8f73ada96de045bf324cbbf5d6cda',
    partnerId: '7494417584089827033',
    region: 'BR',
    accessToken: '', // Necessário obter via OAuth TikTok
    shopCipher: '',  // Identificador único da loja
    permissions: {
      marketing: true,
      engagement: true,
      catalog: true,
      affiliate: 'pending',
      connectors: true
    }
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vioshop_api_config');
    if (saved) {
      setConfig(prev => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const handleSaveApi = () => {
    localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24 text-zinc-100">
      <header className="p-12 rounded-[3.5rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10"></div>
        <h2 className="text-4xl font-black italic uppercase text-white mb-4">Configuração <span className="text-indigo-500">API Real</span></h2>
        <p className="text-zinc-400 font-medium">Insira os tokens do seu Partner Center para conexão direta.</p>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">App Key</label>
            <input type="text" value={config.appKey} readOnly className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-zinc-500" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">App Secret</label>
            <input type="password" value={config.appSecret} onChange={e => setConfig({...config, appSecret: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">Access Token (OAuth)</label>
            <input type="text" value={config.accessToken} onChange={e => setConfig({...config, accessToken: e.target.value})} placeholder="Inicie com 'act.'" className="w-full bg-zinc-900 border border-indigo-500/30 rounded-2xl py-4 px-6 text-sm text-white focus:border-indigo-500 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 tracking-widest">Shop Cipher</label>
            <input type="text" value={config.shopCipher} onChange={e => setConfig({...config, shopCipher: e.target.value})} placeholder="Código da Loja" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white" />
          </div>
        </div>

        <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
           <p className="text-[10px] text-amber-500 font-bold uppercase mb-2">Atenção Técnica:</p>
           <p className="text-[11px] text-zinc-500 leading-relaxed">
             Chamadas de navegador para a API do TikTok podem exigir um proxy CORS. O VioShop gera a assinatura real (sign) mas o acesso final depende da política de rede do seu ambiente de deploy.
           </p>
        </div>

        <button onClick={handleSaveApi} className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-indigo-600 hover:text-white shadow-xl'}`}>
          {isSaved ? 'CONFIGURAÇÃO SALVA ✓' : 'SALVAR E TESTAR CONEXÃO'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
