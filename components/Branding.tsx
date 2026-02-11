
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const Branding: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLogo = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A high-quality, professional, modern logo for a SaaS platform called 'VioShop AI'. The logo should feature a stylized lightning bolt combined with a video play button symbol. Minimalist design, vibrant gradient colors of pink and deep indigo, futuristic tech aesthetic. White background, high resolution, centered, app icon style.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setLogoUrl(`data:image/png;base64,${base64Data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) throw new Error("Não foi possível extrair a imagem da resposta.");

    } catch (err: any) {
      console.error(err);
      setError("Erro ao gerar logo. Verifique se sua chave de API suporta geração de imagens.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h2 className="text-4xl font-black tracking-tight">Identidade Visual</h2>
        <p className="text-zinc-400 mt-2 font-medium">Crie ativos de marca exclusivos para o seu SaaS VioShop AI.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 bg-zinc-900/40 p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <i className="fas fa-wand-magic-sparkles text-pink-500"></i>
              Gerador de Logotipo IA
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Utilizamos inteligência artificial generativa para criar uma marca que transmita velocidade, 
              tecnologia e foco em vendas para o TikTok Shop.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Paleta Sugerida</h4>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-600 shadow-lg shadow-pink-600/20"></div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/20"></div>
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-lg"></div>
              <div className="w-12 h-12 rounded-2xl bg-white shadow-lg"></div>
            </div>
          </div>

          <button
            onClick={generateLogo}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-pink-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <i className="fas fa-circle-notch animate-spin"></i>
                PROCESSANDO MARCA...
              </>
            ) : (
              <>
                <i className="fas fa-bolt"></i>
                GERAR LOGO AGORA
              </>
            )}
          </button>
          
          {error && (
            <p className="text-red-400 text-xs text-center font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="aspect-square bg-zinc-950 rounded-[3rem] border-4 border-zinc-900 shadow-inner flex items-center justify-center overflow-hidden relative group">
            {logoUrl ? (
              <>
                <img src={logoUrl} className="w-full h-full object-cover animate-in zoom-in-95 duration-700" alt="Generated Logo" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                  <a 
                    href={logoUrl} 
                    download="vioshop-ai-logo.png"
                    className="bg-white text-zinc-950 px-6 py-3 rounded-xl font-black text-sm hover:bg-zinc-200 transition-all flex items-center gap-2"
                  >
                    <i className="fas fa-download"></i>
                    DOWNLOAD PNG
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center p-12 space-y-4">
                <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-700 text-4xl border border-zinc-800 border-dashed">
                  <i className="fas fa-image"></i>
                </div>
                <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Aguardando Geração</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-1 bg-zinc-800 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-pink-500 animate-[loading_1.5s_infinite]"></div>
                </div>
                <p className="text-pink-500 font-black italic">IMAGINANDO SUA MARCA...</p>
                <style>{`
                  @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                  }
                `}</style>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Uso Sugerido</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <i className="fas fa-check-circle text-emerald-500"></i>
                  Favicon de Site
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <i className="fas fa-check-circle text-emerald-500"></i>
                  Ícone de App Móvel
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <i className="fas fa-check-circle text-emerald-500"></i>
                  Marca d'água de Vídeo
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Dica de Design</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold">
                O contraste entre o Rosa Neon e o Indigo Profundo garante visibilidade tanto em dispositivos móveis quanto em anúncios do TikTok Shop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
