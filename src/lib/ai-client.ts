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
  
  onProgress?.('Connecting to AI service...');

  let rawResponse: string;
  
  if (settings.provider === 'openai') {
    rawResponse = await callOpenAI(settings, userPrompt, onProgress);
  } else {
    rawResponse = await callAnthropic(settings, userPrompt, onProgress);
  }

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

async function callOpenAI(
  settings: AISettings,
  userPrompt: string,
  onProgress?: (stage: string) => void
): Promise<string> {
  onProgress?.('Sending request to OpenAI...');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 16000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
    
    if (response.status === 401) {
      throw new AIGenerationError('Invalid OpenAI API key. Please check your settings.', 401);
    }
    if (response.status === 429) {
      throw new AIGenerationError('Rate limit exceeded. Please wait a moment and try again.', 429);
    }
    if (response.status === 402 || response.status === 403) {
      throw new AIGenerationError('Insufficient credits or access denied. Please check your OpenAI account.', 402);
    }
    
    throw new AIGenerationError(`OpenAI API error: ${errorMessage}`, response.status);
  }

  onProgress?.('Processing AI response...');

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callAnthropic(
  settings: AISettings,
  userPrompt: string,
  onProgress?: (stage: string) => void
): Promise<string> {
  onProgress?.('Sending request to Anthropic...');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': settings.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: settings.model,
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
    
    if (response.status === 401) {
      throw new AIGenerationError('Invalid Anthropic API key. Please check your settings.', 401);
    }
    if (response.status === 429) {
      throw new AIGenerationError('Rate limit exceeded. Please wait a moment and try again.', 429);
    }
    
    throw new AIGenerationError(`Anthropic API error: ${errorMessage}`, response.status);
  }

  onProgress?.('Processing AI response...');

  const data = await response.json();
  return data.content[0].text;
}

export function estimateCost(provider: string, model: string): string {
  const costs: Record<string, Record<string, string>> = {
    openai: {
      'gpt-4o': '~$0.05-0.15 per generation',
      'gpt-4o-mini': '~$0.01-0.03 per generation',
      'gpt-4-turbo': '~$0.08-0.20 per generation',
    },
    anthropic: {
      'claude-3-5-sonnet-20241022': '~$0.05-0.15 per generation',
      'claude-3-opus-20240229': '~$0.10-0.30 per generation',
      'claude-3-haiku-20240307': '~$0.01-0.03 per generation',
    },
  };

  return costs[provider]?.[model] || 'Cost varies';
}
