import { GoogleGenAI, Modality } from "@google/genai";
import type { GeneratedContent } from '../types';

// Helper to run a function with a temporary fetch override for custom base URLs
async function runWithProxy<T>(baseUrl: string, operation: () => Promise<T>): Promise<T> {
    if (!baseUrl || !baseUrl.startsWith('http')) {
        return operation();
    }

    const originalFetch = window.fetch;
    // FIX: Correctly handle URL, string, and Request objects as fetch input.
    // The previous implementation had a type error and a runtime bug when handling URL and Request objects.
    const proxiedFetch: typeof window.fetch = (input, init) => {
        if (input instanceof Request) {
            const proxiedUrl = input.url.replace(/https?:\/\/[\w.-]+/, baseUrl);
            const newRequest = new Request(proxiedUrl, input);
            return originalFetch(newRequest, init);
        }

        const url = String(input);
        const proxiedUrl = url.replace(/https?:\/\/[\w.-]+/, baseUrl);
        return originalFetch(proxiedUrl, init);
    };

    try {
        window.fetch = proxiedFetch;
        return await operation();
    } finally {
        window.fetch = originalFetch;
    }
}


function getAiClient(apiKey: string): GoogleGenAI {
  const finalApiKey = apiKey || import.meta.env.VITE_API_KEY;
  if (!finalApiKey) {
    throw new Error("API Key is not configured. Please add it in settings or as a VITE_API_KEY environment variable.");
  }
  return new GoogleGenAI({ apiKey: finalApiKey });
}

export async function editImage(
    prompt: string,
    imageParts: { base64: string; mimeType: string }[],
    maskBase64: string | null,
    apiKey: string,
    baseUrl: string
): Promise<GeneratedContent> {
  
  const finalBaseUrl = baseUrl || import.meta.env.VITE_BASE_URL;

  return runWithProxy(finalBaseUrl, async () => {
    const ai = getAiClient(apiKey);
    try {
      let fullPrompt = prompt;
      const parts: any[] = [];

      if (imageParts.length > 0) {
          parts.push({
              inlineData: { data: imageParts[0].base64, mimeType: imageParts[0].mimeType },
          });
      }

      if (maskBase64) {
        parts.push({
          inlineData: { data: maskBase64, mimeType: 'image/png' },
        });
        fullPrompt = `Apply the following instruction only to the masked area of the image: "${prompt}". Preserve the unmasked area.`;
      }
      
      if (imageParts.length > 1) {
          imageParts.slice(1).forEach(img => {
              parts.push({
                  inlineData: { data: img.base64, mimeType: img.mimeType },
              });
          });
      }

      parts.push({ text: fullPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts },
        config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });

      const result: GeneratedContent = { imageUrl: null, text: null };
      const responseParts = response.candidates?.[0]?.content?.parts;

      if (responseParts) {
        for (const part of responseParts) {
          if (part.text) {
            result.text = (result.text ? result.text + "\n" : "") + part.text;
          } else if (part.inlineData) {
            result.imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }

      if (!result.imageUrl) {
          let errorMessage;
          if (result.text) {
              errorMessage = `The model responded: "${result.text}"`;
          } else {
              const finishReason = response.candidates?.[0]?.finishReason;
              const safetyRatings = response.candidates?.[0]?.safetyRatings;
              errorMessage = "The model did not return an image. It might have refused the request. Please try a different image or prompt.";
              
              if (finishReason === 'SAFETY') {
                  const blockedCategories = safetyRatings?.filter(r => r.blocked).map(r => r.category).join(', ');
                  errorMessage = `The request was blocked for safety reasons. Categories: ${blockedCategories || 'Unknown'}. Please modify your prompt or image.`;
              }
          }
          throw new Error(errorMessage);
      }

      return result;

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      if (error instanceof Error) {
          let errorMessage = error.message;
          try {
              if (errorMessage.startsWith('{') && errorMessage.endsWith('}')) {
                  const parsedError = JSON.parse(errorMessage);
                  if (parsedError.error && parsedError.error.message) {
                      if (parsedError.error.status === 'RESOURCE_EXHAUSTED') {
                          errorMessage = "You've likely exceeded the request limit. Please wait a moment before trying again.";
                      } else if (parsedError.error.code === 500 || parsedError.error.status === 'UNKNOWN') {
                          errorMessage = "An unexpected server error occurred. This might be a temporary issue. Please try again in a few moments.";
                      } else {
                          errorMessage = parsedError.error.message;
                      }
                  }
              }
          } catch (e) {
               // Ignore if parsing fails, it's not a JSON error
          }
          throw new Error(errorMessage);
      }
      throw new Error("An unknown error occurred while communicating with the API.");
    }
  });
}

export async function generateImageEditsBatch(
    prompt: string,
    imageParts: { base64: string; mimeType: string }[],
    apiKey: string,
    baseUrl: string
): Promise<string[]> {
    try {
        const promises: Promise<GeneratedContent>[] = [];
        for (let i = 0; i < 4; i++) {
            promises.push(editImage(prompt, imageParts, null, apiKey, baseUrl));
        }
        const results = await Promise.all(promises);
        const imageUrls = results.map(r => r.imageUrl).filter((url): url is string => !!url);
        
        if (imageUrls.length === 0) {
          throw new Error("Failed to generate any image variations. The model may have refused the request.");
        }
        
        return imageUrls;
    } catch (error) {
        console.error("Error generating image edits batch:", error);
        if (error instanceof Error) {
            // Re-throw the specific error message from a failed child `editImage` call
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred during batch image generation.");
    }
}

type ImageAspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export async function generateImageFromText(
    prompt: string,
    aspectRatio: ImageAspectRatio,
    apiKey: string,
    baseUrl: string,
): Promise<GeneratedContent> {
  const finalBaseUrl = baseUrl || import.meta.env.VITE_BASE_URL;

  return runWithProxy(finalBaseUrl, async () => {
    const ai = getAiClient(apiKey);
    try {
      const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: aspectRatio,
          },
      });

      if (!response.generatedImages || response.generatedImages.length === 0) {
          throw new Error("The model did not return an image. It might have refused the request.");
      }

      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/png;base64,${base64ImageBytes}`;

      return { imageUrl, text: null };

    } catch (error) {
      console.error("Error calling Gemini API for text-to-image:", error);
      if (error instanceof Error) {
          let errorMessage = error.message;
          try {
              if (errorMessage.startsWith('{') && errorMessage.endsWith('}')) {
                  const parsedError = JSON.parse(errorMessage);
                  if (parsedError.error && parsedError.error.message) {
                      if (parsedError.error.status === 'RESOURCE_EXHAUSTED') {
                          errorMessage = "You've likely exceeded the request limit. Please wait a moment before trying again.";
                      } else if (parsedError.error.code === 500 || parsedError.error.status === 'UNKNOWN') {
                          errorMessage = "An unexpected server error occurred. This might be a temporary issue. Please try again in a few moments.";
                      } else {
                          errorMessage = parsedError.error.message;
                      }
                  }
              }
          } catch (e) {}
          throw new Error(errorMessage);
      }
      throw new Error("An unknown error occurred while communicating with the API.");
    }
  });
}
