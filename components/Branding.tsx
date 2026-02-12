import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const Branding: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThumbGenerating, setIsThumbGenerating] = useState(false);
  const [_error, setError] = useState<string | null>(null);

  const generateLogo = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      // Sempre use new GoogleGenAI({ apiKey: process.env.API_KEY }) conforme diretrizes
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A high-quality, professional, modern logo for a SaaS platform called 'VioShop AI'. The logo should feature a stylized lightning bolt combined with a video play button symbol. Minimalist design, vibrant gradient colors of pink and deep indigo, futuristic tech aesthetic. White background, high resolution, centered, app icon style.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          setLogoUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (err: any) {
      setError("Erro ao gerar logo.");
    } finally { setIsGenerating(false); }
  };

  const generateThumbnail = async () => {
    setIsThumbGenerating(true);
    setError(null);
    try {
      // Sempre use new GoogleGenAI({ apiKey: process.env.API_KEY }) conforme diretrizes
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A vibrant, eye-catching TikTok video thumbnail cover. High contrast, featuring a futuristic 3D product with floating text elements like 'TOP 1'. Pink and purple neon lighting, professional studio product photography style, vertical 9:16 aspect ratio.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "9:16" } }
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          setThumbUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (err: any) {
      setError("Erro ao gerar capa.");
    } finally { setIsThumbGenerating(false); }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <header>
        <h2 className="text-5xl font-black tracking-tight uppercase italic text-white">Identidade <span className="text-pink-500">Visual</span></h2>
        <p className="text-zinc-500 mt-2 font-medium">Prepare sua marca para o lançamento oficial.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-8">
          <div className="space-y-4">
             <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500">
                <i className="fas fa-bolt-lightning text-xl"></i>
             </div>
             <h3 className="text-2xl font-black text-white italic uppercase">Logo da Agência</h3>
             <p className="text-zinc-500 text-xs leading-relaxed uppercase font-bold tracking-widest">Gere o ícone que aparecerá nos seus vídeos e site oficial.</p>
          </div>

          <div className="aspect-square bg-zinc-950 rounded-[2.5rem] border border-zinc-800 flex items-center justify-center overflow-hidden relative">
            {logoUrl ? <img src={logoUrl} className="w-full h-full object-cover" alt="Logo IA" /> : <i className="fas fa-image text-4xl text-zinc-800"></i>}
            {isGenerating && <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"><i className="fas fa-circle-notch animate-spin text-pink-500"></i></div>}
          </div>

          <button onClick={generateLogo} disabled={isGenerating} className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-pink-600 hover:text-white transition-all uppercase text-xs tracking-[0.3em]">
            Gerar Logotipo IA
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-8">
          <div className="space-y-4">
             <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                <i className="fas fa-rectangle-ad text-xl"></i>
             </div>
             <h3 className="text-2xl font-black text-white italic uppercase">Capa de Vídeo</h3>
             <p className="text-zinc-500 text-xs leading-relaxed uppercase font-bold tracking-widest">Crie miniaturas que param o scroll.</p>
          </div>

          <div className="aspect-[9/16] h-[300px] mx-auto bg-zinc-950 rounded-[2rem] border border-zinc-800 flex items-center justify-center overflow-hidden relative">
            {thumbUrl ? <img src={thumbUrl} className="w-full h-full object-cover" alt="Thumbnail IA" /> : <i className="fas fa-clapperboard text-4xl text-zinc-800"></i>}
            {isThumbGenerating && <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"><i className="fas fa-circle-notch animate-spin text-indigo-500"></i></div>}
          </div>

          <button onClick={generateThumbnail} disabled={isThumbGenerating} className="w-full py-5 bg-zinc-800 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all uppercase text-xs tracking-[0.3em] border border-zinc-700">
            Gerar Capa Viral
          </button>
        </div>
      </div>
    </div>
  );
};

export default Branding;