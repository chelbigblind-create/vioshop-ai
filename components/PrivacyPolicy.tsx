
import React from 'react';

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="bg-zinc-950 min-h-screen p-8 md:p-20 text-zinc-300">
      <button onClick={onBack} className="mb-12 text-pink-500 font-bold flex items-center gap-2 hover:underline">
        <i className="fas fa-arrow-left"></i> Voltar para Home
      </button>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-black text-white">Política de Privacidade</h1>
        <p className="text-sm italic text-zinc-500">Última atualização: 24 de Maio de 2024</p>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Informações que Coletamos</h2>
          <p className="text-sm leading-relaxed">
            A VioShop AI coleta informações necessárias para a prestação dos nossos serviços de automação de vídeo. Isso inclui dados de conta (nome, e-mail), dados de uso da plataforma e informações de produtos do TikTok Shop que você optar por minerar.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. Uso da Inteligência Artificial</h2>
          <p className="text-sm leading-relaxed">
            Utilizamos os serviços da Google Gemini API para geração de roteiros e imagens. Os dados enviados para a IA são limitados às descrições dos produtos para criar conteúdo criativo. Não compartilhamos dados pessoais identificáveis com modelos de treinamento de terceiros sem seu consentimento.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Segurança dos Dados</h2>
          <p className="text-sm leading-relaxed">
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou alteração. Seus vídeos gerados são armazenados de forma privada em sua conta.
          </p>
        </section>

        <footer className="pt-12 border-t border-zinc-900 text-[10px] text-zinc-600">
          VioShop AI - Desenvolvido para conformidade com o TikTok Shop Partner Center.
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
