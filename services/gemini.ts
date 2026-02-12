
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

export const generateBusinessDescription = async (language: 'pt' | 'en'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const prompt = language === 'en' 
    ? "Write a professional business description (max 300 chars) for a TikTok Shop Affiliate Partner agency that uses AI to create high-converting product videos. Focus on scalability, technology, and performance."
    : "Escreva uma descrição profissional (máx 300 caracteres) para uma agência parceira de afiliados do TikTok Shop que usa IA para criar vídeos de alta conversão. Foque em escala, tecnologia e performance.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text?.trim() || "";
};

export const generateScript = async (product: Product): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Crie um roteiro de vendas curto (máximo 60 segundos) para o produto "${product.name}" na categoria "${product.category}". 
    O roteiro deve ter:
    1. Gancho inicial impactante.
    2. Descrição de 3 benefícios principais.
    3. Chamada para ação (CTA) para o link do TikTok Shop.
    O tom deve ser persuasivo e energético. Retorne apenas o texto do roteiro.`,
    config: {
      temperature: 0.8,
    }
  });
  return response.text || "Erro ao gerar roteiro.";
};

export const generateVideoWithVeo = async (prompt: string, aspectRatio: '9:16' | '16:9' = '9:16') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) {
    throw new Error(`Erro ao baixar vídeo: ${videoResponse.statusText}`);
  }
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
};
