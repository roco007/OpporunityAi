export interface AISettings {
  provider: 'openai' | 'anthropic';
  apiKey: string;
  model: string;
}

const STORAGE_KEY = 'opportunity-ai-settings';

export const saveSettings = (settings: AISettings): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const loadSettings = (): AISettings | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearSettings = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const hasValidSettings = (): boolean => {
  const settings = loadSettings();
  return !!(settings && settings.apiKey && settings.apiKey.trim().length > 0);
};

export const defaultModels = {
  openai: 'gpt-4o',
  anthropic: 'claude-3-5-sonnet-20241022'
};

export const availableModels = {
  openai: [
    { value: 'gpt-4o', label: 'GPT-4o (Recommended)' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Faster, Cheaper)' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  ],
  anthropic: [
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Recommended)' },
    { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus (Most Capable)' },
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku (Fastest)' },
  ]
};
