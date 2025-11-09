
import { UserSettings, Recipe, RecipeFilters, ChatMessage } from '../types';

async function callGeminiApi(action: string, payload: any) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, payload }),
    });

    if (!response.ok) {
      // Read the response body as text first, to avoid "body stream already read" error.
      const errorText = await response.text();
      try {
        // Try to parse the text as JSON to get a structured error message.
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `API call failed with status: ${response.status}`);
      } catch (e) {
        // If parsing fails, it's not a JSON response, so use the raw text as the error.
        // This handles cases like Vercel serverless function timeouts which return plain text/HTML.
        throw new Error(errorText || `API call failed with status: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ${action}:`, error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred during the API call.');
  }
}


export async function getRecipeRecommendations(ingredients: string[], priorityIngredients: string[], filters: RecipeFilters, language: 'en' | 'ko'): Promise<Recipe[]> {
  const payload = { ingredients, priorityIngredients, filters, language };
  const data = await callGeminiApi('getRecipeRecommendations', payload);
  return data.result;
}

export async function analyzeReceipt(base64Image: string): Promise<string[]> {
  const payload = { base64Image };
  const data = await callGeminiApi('analyzeReceipt', payload);
  return data.result;
}

export async function chatWithAIChef(history: ChatMessage[], message: string, settings: UserSettings, language: 'en' | 'ko', recipeContext?: Recipe | null): Promise<string> {
  const payload = { history, message, settings, language, recipeContext };
  const data = await callGeminiApi('chatWithAIChef', payload);
  return data.result;
}