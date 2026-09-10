import { useState, useEffect } from 'react';
import { X, Key, Info, ExternalLink, CheckCircle2, AlertCircle, Shield, Moon, Sun, Palette } from 'lucide-react';
import { AISettings, saveSettings, loadSettings, clearSettings, defaultModel, availableModels, isUsingEnvKey, getEnvInfo } from '../lib/storage';
import { Theme } from '../lib/theme';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange?: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function SettingsModal({ isOpen, onClose, onSettingsChange, theme, onThemeChange }: SettingsModalProps) {
  const [settings, setSettings] = useState<AISettings>({
    provider: 'gemini',
    apiKey: '',
    model: defaultModel,
  });
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const loaded = loadSettings();
      if (loaded) {
        setSettings(loaded);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    onSettingsChange?.();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    clearSettings();
    setSettings({ provider: 'gemini', apiKey: '', model: defaultModel });
    setTestResult('idle');
    setTestError('');
    onSettingsChange?.();
  };

  const handleTestConnection = async () => {
    setTestResult('testing');
    setTestError('');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Say "OK"' }] }],
            generationConfig: { maxOutputTokens: 10 },
          }),
        }
      );

      if (response.ok) {
        setTestResult('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.error?.message || `HTTP ${response.status}`;
        setTestError(message);
        setTestResult('error');
      }
    } catch (err) {
      setTestError(err instanceof Error ? err.message : 'Network error');
      setTestResult('error');
    }
  };

  const selectedModel = availableModels.find(m => m.value === settings.model);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-surface-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-surface-900">Settings</h2>
              <p className="text-xs text-surface-500">Manage appearance and Gemini AI access</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Appearance */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Appearance</label>
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface-50 p-1 border border-surface-200">
              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                aria-pressed={theme === 'dark'}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${theme === 'dark'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-surface-600 hover:bg-white'
                  }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
              <button
                type="button"
                onClick={() => onThemeChange('light')}
                aria-pressed={theme === 'light'}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${theme === 'light'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-surface-600 hover:bg-white'
                  }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                type="button"
                onClick={() => onThemeChange('grey')}
                aria-pressed={theme === 'grey'}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${theme === 'grey'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-surface-600 hover:bg-white'
                  }`}
              >
                <Palette className="w-4 h-4" />
                Grey
              </button>
            </div>
            <p className="mt-2 text-xs text-surface-500">Dark mode is the default. Your preference is saved on this device.</p>
          </div>

          {/* Security Notice */}
          {isUsingEnvKey() ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900">✓ API Key Configured</p>
                  <p className="text-xs text-green-700 mt-1">
                    Your Gemini API key is configured via environment variables and ready to use.
                    You can optionally override it below with a different key.
                  </p>
                  <p className="text-xs text-green-600 mt-2 font-mono">
                    Model: {getEnvInfo().envModel}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Your API key stays in your browser</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Your Gemini API key is stored locally in your browser and sent directly to Google's API.
                    It never passes through our servers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Provider Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <div>
                <p className="text-sm font-bold text-surface-900">Google Gemini</p>
                <p className="text-xs text-surface-600">Powered by Google AI Studio</p>
              </div>
            </div>
            <p className="text-xs text-surface-600 mt-2">
              Gemini offers excellent reasoning capabilities, large context windows, and competitive pricing.
              Get a free API key from Google AI Studio.
            </p>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              <Key className="w-4 h-4 inline mr-1" />
              Gemini API Key
            </label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => { setSettings({ ...settings, apiKey: e.target.value }); setTestResult('idle'); setTestError(''); }}
              placeholder="AIza..."
              className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <div className="flex items-center justify-between mt-2">
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Get free API key from Google AI Studio <ExternalLink className="w-3 h-3" />
              </a>
              {settings.apiKey && (
                <button
                  onClick={handleTestConnection}
                  disabled={testResult === 'testing'}
                  className="text-xs text-surface-600 hover:text-surface-900 flex items-center gap-1 disabled:opacity-50"
                >
                  {testResult === 'testing' ? 'Testing...' : 'Test connection'}
                </button>
              )}
            </div>

            {/* Test Result */}
            {testResult === 'success' && (
              <div className="mt-2 flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Connection successful! API key is valid.
              </div>
            )}
            {testResult === 'error' && (
              <div className="mt-2 flex items-start gap-2 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Connection failed</p>
                  {testError && <p className="mt-0.5 text-red-600">{testError}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Model</label>
            <div className="space-y-2">
              {availableModels.map(model => (
                <button
                  key={model.value}
                  onClick={() => setSettings({ ...settings, model: model.value })}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all ${settings.model === model.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-surface-200 hover:border-surface-300 bg-white'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-surface-900">{model.label}</p>
                      <p className="text-xs text-surface-500 mt-0.5">{model.description}</p>
                    </div>
                    {settings.model === model.value && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            {selectedModel && (
              <p className="text-xs text-surface-500 mt-2">
                💡 Using <span className="font-mono text-surface-700">{selectedModel.value}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm shadow-lg shadow-blue-500/25"
            >
              {saved ? '✓ Saved!' : 'Save Settings'}
            </button>
            {settings.apiKey && (
              <button
                onClick={handleClear}
                className="px-4 py-2.5 border border-surface-200 text-surface-600 font-medium rounded-xl hover:bg-surface-50 transition-all text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
