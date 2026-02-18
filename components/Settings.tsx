
import React, { useState, useEffect } from 'react';
import { ApiConfig } from '../types';
import { TikTokApiService } from '../services/tiktok';

const Settings: React.FC = () => {
  const [config, setConfig] = useState<ApiConfig>({
    appKey: '6j2c6seef6dre', 
    appSecret: '',
    partnerId: '7494417584089827033',
    legalName: 'MARCHEL DE SOUZA MARTINS', 
    cnpj: '54.586.274/0001-33',
    region: 'BR',
    permissions: {
      marketing: 'approved',
      engagement: 'approved',
      catalog: 'approved',
      affiliate: 'pending',
      connectors: 'approved',
      security_assessment: 'pending'
    }
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vioshop_api_config');
    if (saved) {
      setConfig(prev => ({ ...prev, ...JSON.parse(saved) }));
    } else {
      // Salva os dados iniciais do usuário no primeiro acesso
      localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    }
  }, []);

  const handleSaveApi = () => {
    localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleConnect = () => {
    localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    const authLink = TikTokApiService.getAuthLink(config.appKey, config.region);
    window.location.href = authLink;
  };

  const isConnected = !!config.accessToken;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-24 text-zinc-100">
      <header className="p-12 rounded-[3.5rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10"></div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-black italic uppercase text-white mb-4">Configuração <span className="text-indigo-500">Legal</span></h2>
            <p className="text-zinc-400 font-medium">Configure sua identidade para aprovação no TikTok Shop.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
             <span className="text-[10px] font-black text-emerald-500 uppercase">Região: Brasil</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-amber-500/5 border-2 border-amber-500/20 p-10 rounded-[3rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/30">
                <i className="fas fa-id-card text-xl"></i>
              </div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Identidade do Desenvolvedor (GSO)</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nome do Desenvolvedor (Igual ao TikTok)</span>
                  <span className="bg-red-500/10 text-red-500 text-[8px] font-black px-2 py-1 rounded">CRÍTICO</span>
                </div>
                <input 
                  type="text" 
                  placeholder="EX: MARCHEL DE SOUZA MARTINS"
                  value={config.legalName} 
                  onChange={e => setConfig({...config, legalName: e.target.value.toUpperCase()})}
                  className="w-full bg-zinc-950 border border-amber-500/30 rounded-xl py-5 px-6 text-sm text-white focus:border-amber-500 outline-none placeholder:text-zinc-800 font-black" 
                />
              </div>

              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CNPJ do Responsável</span>
                </div>
                <input 
                  type="text" 
                  placeholder="54.586.274/0001-33"
                  value={config.cnpj} 
                  onChange={e => setConfig({...config, cnpj: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-5 px-6 text-sm text-white focus:border-indigo-500 outline-none placeholder:text-zinc-800 font-black" 
                />
              </div>

              <div className="flex gap-4 items-start bg-amber-500/10 p-6 rounded-2xl">
                <i className="fas fa-info-circle text-amber-500 mt-0.5"></i>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                  O TikTok GSO rejeita aplicações onde o nome no documento não bate 100% com o nome de cadastro. 
                  Garantimos que o nome <strong className="text-white">"{config.legalName}"</strong> apareça em destaque na sua Política de Privacidade.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-10">
            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Conexão TikTok Shop</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-600 ml-2 tracking-widest">App Key</label>
                <input 
                  type="text" 
                  value={config.appKey} 
                  onChange={e => setConfig({...config, appKey: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-5 px-6 text-sm text-white focus:border-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-600 ml-2 tracking-widest">App Secret</label>
                <input 
                  type="password" 
                  placeholder="App Secret"
                  value={config.appSecret} 
                  onChange={e => setConfig({...config, appSecret: e.target.value})} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-5 px-6 text-sm text-white focus:border-indigo-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${isConnected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
                     <i className={isConnected ? 'fas fa-link' : 'fas fa-link-slash'}></i>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Status Global</p>
                     <h4 className="text-xl font-black text-white italic uppercase">
                        {isConnected ? `Vendedor Ativo` : 'Não Autorizado'}
                     </h4>
                  </div>
               </div>
               
               <button 
                  onClick={handleConnect}
                  className="bg-white text-black px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
               >
                  Conectar TikTok Shop
               </button>
            </div>

            <button onClick={handleSaveApi} className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
              {isSaved ? 'SALVO COM SUCESSO ✓' : 'SALVAR ALTERAÇÕES'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-[2.5rem] space-y-6">
            <h4 className="text-xs font-black uppercase text-indigo-400 flex items-center gap-2">
              <i className="fas fa-shield-check"></i> Auditoria de Documentação
            </h4>
            
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
              Sua documentação vincula o serviço <strong>VioShop AI</strong> à entidade <strong>{config.legalName}</strong>. Isso resolve o erro de "Third Party alignment" do TikTok GSO.
            </p>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Empresa</span>
                <span className="text-emerald-500 font-bold">ATIVA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Documento</span>
                <span className="text-emerald-500 font-bold">GERADO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
