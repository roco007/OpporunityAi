import { AISettings } from './storage';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompts';
import { validateAIResponse, extractJSON } from './validate';
import { Opportunity, GenerateParams } from '../types';

export class AIGenerationError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'AIGenerationError';
  }
}

export async function generateOpportunities(
  params: GenerateParams,
  settings: AISettings,
  onProgress?: (stage: string) => void
): Promise<Opportunity[]> {
  const userPrompt = buildUserPrompt(params);
  
  onProgress?.('Connecting to Google Gemini...');

  const rawResponse = await callGemini(settings, userPrompt, onProgress);

  onProgress?.('Parsing AI response...');

  // Extract JSON from response
  let parsed: unknown;
  try {
    parsed = extractJSON(rawResponse);
  } catch (error) {
    throw new AIGenerationError(
      `Failed to parse AI response as JSON. The AI may have returned an invalid format. Please try again.`
    );
  }

  onProgress?.('Validating opportunity data...');

  // Validate against schema
  const validation = validateAIResponse(parsed);
  
  if (!validation.success) {
    throw new AIGenerationError(
      `AI response validation failed: ${validation.error}. Please try again or adjust your parameters.`
    );
  }

  // Assign unique IDs
  const opportunities = validation.data.map((opp, index) => ({
    ...opp,
    id: `ai-${Date.now()}-${index}`,
    createdAt: new Date().toISOString().split('T')[0],
    saved: false,
  }));

  return opportunities;
}

async function callGemini(
  settings: AISettings,
  userPrompt: string,
  onProgress?: (stage: string) => void
): Promise<string> {
  onProgress?.('Sending request to Gemini...');

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 16000,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
    
    if (response.status === 400) {
      throw new AIGenerationError(`Invalid request: ${errorMessage}. Please check your API key and model selection.`, 400);
    }
    if (response.status === 403) {
      throw new AIGenerationError('API key is invalid or does not have permission. Please check your Google AI Studio settings.', 403);
    }
    if (response.status === 429) {
      throw new AIGenerationError('Rate limit exceeded. Please wait a moment and try again.', 429);
    }
    if (response.status === 500 || response.status === 503) {
      throw new AIGenerationError('Gemini service is temporarily unavailable. Please try again in a few moments.', response.status);
    }
    
    throw new AIGenerationError(`Gemini API error: ${errorMessage}`, response.status);
  }

  onProgress?.('Processing AI response...');

  const data = await response.json();
  
  // Extract text from Gemini response structure
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    // Check if response was blocked
    const blockReason = data.candidates?.[0]?.finishReason;
    if (blockReason === 'SAFETY') {
      throw new AIGenerationError('Response was blocked by safety filters. Try adjusting your parameters.');
    }
    if (blockReason === 'MAX_TOKENS') {
      throw new AIGenerationError('Response was too long. Try simplifying your parameters.');
    }
    throw new AIGenerationError('Unexpected response format from Gemini. Please try again.');
  }
  
  return text;
}

export function estimateCost(model: string): string {
  const costs: Record<string, string> = {
    'gemini-2.5-pro': '~$0.03-0.10 per generation',
    'gemini-2.5-flash': '~$0.01-0.03 per generation',
    'gemini-2.5-flash-lite': '~$0.005-0.01 per generation',
    'gemini-2.0-flash': '~$0.01-0.03 per generation',
  };

  return costs[model] || 'Cost varies';
}
