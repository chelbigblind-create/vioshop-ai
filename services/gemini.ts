
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export const generateScript = async (product: Product, targetAudience: string = "Criadores do TikTok"): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
};
