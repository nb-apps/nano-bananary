

import { GoogleGenAI, Modality } from "@google/genai";
import type { GeneratedContent } from '../types';

interface AppSettings {
    apiKey?: string;
    baseUrl?: string;
}

// Helper to get settings from localStorage
function getSettings(): AppSettings {
  try {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (e) {
    console.error("Could not load settings from localStorage", e);
  }
  return {};
}

function getAiClient(): GoogleGenAI {
  const settings = getSettings();
  const apiKey = settings.apiKey || process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is not configured. Please set it in the settings panel or as an environment variable.");
  }

  return new GoogleGenAI({ apiKey });
}

/**
 * A wrapper function to proxy API calls to a custom base URL if provided.
 * It temporarily overrides window.fetch for the duration of the API call.
 */
async function runWithProxy<T>(apiCall: () => Promise<T>): Promise<T> {
  const settings = getSettings();
  const baseUrl = settings.baseUrl ?? process.env.BASE_URL;

  if (!baseUrl || !baseUrl.trim()) {
    return apiCall(); // No proxy needed, run directly
  }

  const originalFetch = window.fetch;
  const customBaseUrl = baseUrl.trim().replace(/\/$/, ""); // Remove trailing slash
  
  window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let urlString = input.toString();
    const originalHost = "https://generativelanguage.googleapis.com";
    
    if (urlString.startsWith(originalHost)) {
      const newUrl = customBaseUrl + urlString.substring(originalHost.length);
      return originalFetch(newUrl, init);
    }
    
    return originalFetch(input, init);
  };

  try {
    return await apiCall();
  } finally {
    window.fetch = originalFetch; // IMPORTANT: Always restore the original fetch
  }
}

// Internal, unwrapped version of the editImage function
async function _internalEditImage(
    prompt: string,
    imageParts: { base64: string; mimeType: string }[],
    maskBase64: string | null
): Promise<GeneratedContent> {
  const ai = getAiClient();
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
}

// Exported, wrapped version for external use
export async function editImage(
    prompt: string,
    imageParts: { base64: string; mimeType: string }[],
    maskBase64: string | null
): Promise<GeneratedContent> {
    return runWithProxy(() => _internalEditImage(prompt, imageParts, maskBase64));
}


export async function generateImageEditsBatch(
    prompt: string,
    imageParts: { base64: string; mimeType: string }[]
): Promise<string[]> {
    return runWithProxy(async () => {
        try {
            const promises: Promise<GeneratedContent>[] = [];
            for (let i = 0; i < 4; i++) {
                // Call the internal, unwrapped function to avoid nested proxies
                promises.push(_internalEditImage(prompt, imageParts, null));
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
    });
}

type ImageAspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export async function generateImageFromText(
    prompt: string,
    aspectRatio: ImageAspectRatio
): Promise<GeneratedContent> {
  return runWithProxy(async () => {
    const ai = getAiClient();
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