
import React, { useState, useEffect } from 'react';

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [developerName, setDeveloperName] = useState('MARCHEL DE SOUZA MARTINS');
  const [cnpj, setCnpj] = useState('54.586.274/0001-33');

  useEffect(() => {
    const saved = localStorage.getItem('vioshop_api_config');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.legalName) setDeveloperName(config.legalName.toUpperCase());
        if (config.cnpj) setCnpj(config.cnpj);
      } catch (e) {}
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen text-black selection:bg-zinc-200">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 font-serif">
        <button 
          onClick={onBack} 
          className="mb-12 text-zinc-500 font-sans font-bold flex items-center gap-2 hover:text-black no-print transition-colors"
        >
          <i className="fas fa-arrow-left"></i> Voltar ao Aplicativo
        </button>
        
        <header className="border-b-[6px] border-black pb-10 mb-16">
          <div className="mb-8 font-sans text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
            Documentação Oficial de Auditoria • GSO/TikTok Shop
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 font-sans italic">
            Política de Privacidade <br/> e Uso de Dados
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-4 font-sans text-[9px] font-bold uppercase tracking-widest text-zinc-500">
            <p>Em conformidade com a LGPD (BR) e Políticas Globais TikTok</p>
            <p>Versão: 2.5 • Atualizado em: 13 de Fevereiro de 2026</p>
          </div>
        </header>

        <div className="p-10 border-4 border-black rounded-sm mb-16 bg-zinc-50 font-sans shadow-2xl">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 border-b border-zinc-200 pb-4">
            Identificação Legal do Desenvolvedor (Third Party Provider)
          </h2>
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-[9px] font-black text-zinc-400 uppercase">Razão Social / Nome Legal:</p>
                <p className="text-xl font-black tracking-tight border-b-2 border-black/10 pb-2">{developerName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-zinc-400 uppercase">Número do CNPJ / Tax ID:</p>
                <p className="text-xl font-black tracking-tight border-b-2 border-black/10 pb-2">{cnpj}</p>
              </div>
            </div>
            <div className="space-y-2">
                <p className="text-[9px] font-black text-zinc-400 uppercase">Nome da Plataforma (Service Name):</p>
                <p className="text-2xl font-black tracking-tighter italic uppercase text-indigo-600">VIOSHOP AI</p>
            </div>
            <p className="text-[12px] leading-relaxed text-zinc-700 italic border-l-4 border-indigo-500 pl-6 py-4 bg-white">
              Este documento declara formalmente que <strong>{developerName}</strong>, inscrito sob o CNPJ <strong>{cnpj}</strong>, é o único desenvolvedor e responsável legal pela plataforma <strong>VioShop AI</strong>, assumindo total responsabilidade pelo tratamento de dados via API junto ao TikTok Shop.
            </p>
          </div>
        </div>

        <div className="space-y-12 text-[16px] leading-relaxed text-zinc-800">
          <section className="space-y-4">
            <h3 className="text-lg font-black uppercase font-sans border-b-2 border-black pb-2">1. Coleta de Dados via TikTok Shop API</h3>
            <p>
              A plataforma VioShop AI, de propriedade de {developerName}, coleta dados estritamente necessários para o funcionamento do serviço de marketing de afiliados, incluindo: (a) Identificador de Vendedor/Afiliado (OpenID); (b) Informações de catálogo de produtos autorizados; (c) Métricas de desempenho de anúncios vinculados.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-black uppercase font-sans border-b-2 border-black pb-2">2. Compartilhamento com Terceiros</h3>
            <p>
              Declaramos que os dados coletados do TikTok Shop não são vendidos ou compartilhados com entidades externas para fins publicitários. O processamento de inteligência artificial (IA) é realizado via infraestrutura Google Cloud com criptografia de ponta a ponta.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-black uppercase font-sans border-b-2 border-black pb-2">3. Segurança e Retenção</h3>
            <p>
              {developerName} mantém protocolos rígidos de segurança. Os dados são retidos apenas enquanto a autorização OAuth do TikTok Shop estiver ativa. Caso o usuário revogue o acesso, todos os metadados vinculados são eliminados permanentemente de nossos servidores em até 48 horas.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-black uppercase font-sans border-b-2 border-black pb-2">4. Contato do Encarregado de Dados</h3>
            <p>
              Para questões sobre privacidade ou remoção de dados, entre em contato diretamente com o responsável legal no e-mail cadastrado no TikTok Shop Partner Center vinculado a <strong>{developerName}</strong>.
            </p>
          </section>

          <section className="pt-16 mt-32 border-t-4 border-black flex flex-col md:flex-row justify-between items-end font-sans">
            <div className="space-y-2">
              <p className="text-[9px] font-black text-zinc-400 uppercase">Assinado e Declarado por:</p>
              <p className="text-2xl font-black italic tracking-tighter uppercase">{developerName}</p>
              <p className="text-[10px] font-bold text-zinc-500">CNPJ: {cnpj}</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-black font-black uppercase tracking-[0.2em] mb-1">VioShop Engine v2.5</p>
                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Digital Service Provider Authorized</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
