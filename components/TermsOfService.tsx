
import React from 'react';

const TermsOfService: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="bg-zinc-950 min-h-screen p-8 md:p-20 text-zinc-300">
      <button onClick={onBack} className="mb-12 text-pink-500 font-bold flex items-center gap-2 hover:underline">
        <i className="fas fa-arrow-left"></i> Voltar para Home
      </button>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-black text-white">Termos de Uso</h1>
        <p className="text-sm italic text-zinc-500">Última atualização: 24 de Maio de 2024</p>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Aceitação dos Termos</h2>
          <p className="text-sm leading-relaxed">
            Ao acessar a plataforma VioShop AI, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. Licença de Uso</h2>
          <p className="text-sm leading-relaxed">
            É concedida permissão para baixar temporariamente uma cópia dos materiais (vídeos gerados) na plataforma VioShop AI, apenas para uso comercial relacionado ao marketing de afiliados e TikTok Shop.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Isenção de Responsabilidade</h2>
          <p className="text-sm leading-relaxed">
            A VioShop AI não garante que o uso de nossos vídeos resultará em vendas garantidas ou viralização. O sucesso comercial depende de diversos fatores externos, incluindo as políticas de algoritmos de redes sociais de terceiros como o TikTok.
          </p>
        </section>

        <footer className="pt-12 border-t border-zinc-900 text-[10px] text-zinc-600">
          VioShop AI - Software as a Service Solutions.
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
