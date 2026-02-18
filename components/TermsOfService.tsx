
import React, { useState, useEffect } from 'react';

const TermsOfService: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [developerName, setDeveloperName] = useState('MARCHEL DE SOUZA MARTINS');
  const [cnpj, setCnpj] = useState('54.586.274/0001-33');

  useEffect(() => {
    const saved = localStorage.getItem('vioshop_api_config');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.legalName) setDeveloperName(config.legalName);
        if (config.cnpj) setCnpj(config.cnpj);
      } catch (e) {}
    }
  }, []);

  return (
    <div className="bg-zinc-950 min-h-screen p-8 md:p-20 text-zinc-300">
      <button onClick={onBack} className="mb-12 text-pink-500 font-bold flex items-center gap-2 hover:underline">
        <i className="fas fa-arrow-left"></i> Voltar para Home
      </button>
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-zinc-800 pb-10">
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">Termos de Uso</h1>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Licenciamento de Software as a Service (SaaS)</p>
        </header>
        
        <div className="p-10 bg-zinc-900 border-2 border-zinc-800 rounded-[2.5rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl"></div>
           <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em] mb-6">Detentor dos Direitos de Exploração:</p>
           <div className="space-y-2">
             <p className="text-2xl font-black text-white italic uppercase tracking-tighter">{developerName}</p>
             <p className="text-sm font-bold text-zinc-500">CNPJ: {cnpj}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-zinc-400">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">1. Propriedade Intelectual</h2>
            <p>
              A plataforma VioShop AI, incluindo sua interface, algoritmos de automação e integração com a API TikTok, é de propriedade exclusiva de <strong>{developerName}</strong>. O uso da plataforma não transfere direitos de propriedade ao usuário, apenas uma licença de uso comercial.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">2. Uso Permitido</h2>
            <p>
              O usuário está autorizado a gerar vídeos para fins de marketing no TikTok Shop. É proibido o uso da ferramenta para atividades ilegais, spam ou qualquer prática que viole os termos de comunidade do TikTok.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">3. Limitação de Lucros</h2>
            <p>
              <strong>{developerName}</strong> fornece as ferramentas tecnológicas, mas não garante resultados financeiros específicos. O desempenho das vendas depende da estratégia individual do afiliado e dos algoritmos de terceiros.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">4. Foro Jurídico</h3>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer litígio será resolvido no foro de domicílio do licenciante <strong>{developerName}</strong>.
            </p>
          </section>
        </div>

        <footer className="pt-20 border-t border-zinc-900 flex justify-between items-center text-[9px] text-zinc-600 uppercase tracking-widest font-black">
           <div>{developerName} • {cnpj}</div>
           <div className="text-zinc-800">VioShop Engine v2.5.0</div>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
