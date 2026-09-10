export interface AISettings {
  provider: 'gemini';
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
    const parsed = JSON.parse(stored);
    // Migrate old settings to Gemini
    if (parsed.provider !== 'gemini') {
      return {
        provider: 'gemini',
        apiKey: '',
        model: defaultModel,
      };
    }
    return parsed;
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

export const defaultModel = 'gemini-2.5-flash';

export const availableModels = [
  { 
    value: 'gemini-2.5-pro', 
    label: 'Gemini 2.5 Pro (Most Capable)',
    description: 'Best quality, highest reasoning capability'
  },
  { 
    value: 'gemini-2.5-flash', 
    label: 'Gemini 2.5 Flash (Recommended)',
    description: 'Great balance of speed and quality'
  },
  { 
    value: 'gemini-2.5-flash-lite', 
    label: 'Gemini 2.5 Flash Lite (Fastest)',
    description: 'Fastest responses, lowest cost'
  },
  { 
    value: 'gemini-2.0-flash', 
    label: 'Gemini 2.0 Flash (Stable)',
    description: 'Reliable and well-tested'
  },
];
