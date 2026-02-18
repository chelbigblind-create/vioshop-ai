
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const getAIInstance = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// A função de busca foi removida pois agora os dados vêm DIRETAMENTE da API do TikTok no serviço tiktok.ts

export const generateScript = async (product: Product): Promise<string> => {
  // Fix: Create AI instance right before the generateContent API call
  const ai = getAIInstance();
  
  // O prompt agora recebe dados REAIS do catálogo injetados pelo serviço TikTokApiService
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Você é um copywriter de performance para o TikTok Shop. 
    PRODUTO REAL DO CATÁLOGO: "${product.name}"
    PREÇO ATUAL: R$ ${product.price}
    COMISSÃO: ${product.commissionRate}%
    
    Crie um roteiro de vídeo curto (15-30s) com um HOOK visual forte, 2 benefícios e um CTA direto para a sacolinha. 
    Use uma linguagem extremamente atual e brasileira.`,
    config: { temperature: 0.8 }
  });
  return response.text || "Erro ao gerar roteiro.";
};

export const generateVideoWithVeo = async (prompt: string, aspectRatio: '9:16' | '16:9' = '9:16') => {
  // Fix: Create AI instance right before the generateVideos API call
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
    // Fix: Create a fresh AI instance before polling to ensure the most up-to-date API key is used
    const aiPoll = getAIInstance();
    operation = await aiPoll.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  // Fix: Ensure the current API key is used when fetching the video
  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
};
