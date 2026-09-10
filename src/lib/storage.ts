export interface AISettings {
  provider: 'gemini';
  apiKey: string;
  model: string;
}

const STORAGE_KEY = 'opportunity-ai-settings';

// Environment variables (set in .env.local for local, Vercel env vars for production)
const ENV_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const defaultModel = 'gemini-2.5-flash';

// Now we can reference defaultModel
const ENV_MODEL = import.meta.env.VITE_GEMINI_MODEL || defaultModel;

export const saveSettings = (settings: AISettings): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const loadSettings = (): AISettings | null => {
  // Priority: localStorage override > environment variables
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migrate old settings to Gemini
      if (parsed.provider !== 'gemini') {
        return {
          provider: 'gemini',
          apiKey: ENV_API_KEY,
          model: ENV_MODEL,
        };
      }
      return parsed;
    } catch {
      // Fall through to env vars
    }
  }
  
  // Use environment variables if no localStorage override
  if (ENV_API_KEY) {
    return {
      provider: 'gemini',
      apiKey: ENV_API_KEY,
      model: ENV_MODEL,
    };
  }
  
  return null;
};

export const clearSettings = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const hasValidSettings = (): boolean => {
  // Check if env var is set OR localStorage has valid settings
  if (ENV_API_KEY && ENV_API_KEY !== 'mock_gemini_api_key_for_local_development') {
    return true;
  }
  
  const settings = loadSettings();
  return !!(settings && settings.apiKey && settings.apiKey.trim().length > 0);
};

export const isUsingEnvKey = (): boolean => {
  return !!(ENV_API_KEY && ENV_API_KEY !== 'mock_gemini_api_key_for_local_development');
};

export const getEnvInfo = () => {
  return {
    hasEnvKey: !!ENV_API_KEY && ENV_API_KEY !== 'mock_gemini_api_key_for_local_development',
    envModel: ENV_MODEL,
  };
};

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
