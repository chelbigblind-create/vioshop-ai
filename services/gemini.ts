
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Função para garantir instância fresca com a API Key mais recente (evita race conditions)
const getAIInstance = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateBusinessDescription = async (language: 'pt' | 'en'): Promise<string> => {
  const ai = getAIInstance();
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
  const ai = getAIInstance();
  // Usando gemini-3-pro-preview para tarefas complexas de escrita persuasiva
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Você é um copywriter especialista em TikTok Shop. Crie um roteiro de vendas curto (máximo 60 segundos) para o produto "${product.name}" na categoria "${product.category}". 
    O roteiro deve seguir a estrutura:
    1. GANCHO (HOOK): Algo que pare o scroll nos primeiros 2 segundos.
    2. DESEJO: 3 benefícios emocionais/práticos.
    3. CTA: Chamada clara para clicar no carrinho laranja/link do TikTok Shop.
    O tom deve ser viral, rápido e persuasivo. Retorne APENAS o texto do roteiro.`,
    config: {
      temperature: 0.85,
    }
  });
  return response.text || "Erro ao gerar roteiro.";
};

export const generateVideoWithVeo = async (prompt: string, aspectRatio: '9:16' | '16:9' = '9:16') => {
  const ai = getAIInstance();
  
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
  // A URL de download requer a chave de API anexada
  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) {
    throw new Error(`Erro ao baixar vídeo: ${videoResponse.statusText}`);
  }
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
};
