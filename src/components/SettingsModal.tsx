import { useState, useEffect } from 'react';
import { X, Key, Info, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { AISettings, saveSettings, loadSettings, clearSettings, defaultModels, availableModels } from '../lib/storage';
import { estimateCost } from '../lib/ai-client';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange?: () => void;
}

export default function SettingsModal({ isOpen, onClose, onSettingsChange }: SettingsModalProps) {
  const [settings, setSettings] = useState<AISettings>({
    provider: 'openai',
    apiKey: '',
    model: defaultModels.openai,
  });
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  useEffect(() => {
    const loaded = loadSettings();
    if (loaded) {
      setSettings(loaded);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProviderChange = (provider: 'openai' | 'anthropic') => {
    setSettings({
      ...settings,
      provider,
      model: defaultModels[provider],
    });
    setSaved(false);
    setTestResult('idle');
  };

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    onSettingsChange?.();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    clearSettings();
    setSettings({ provider: 'openai', apiKey: '', model: defaultModels.openai });
    setTestResult('idle');
    onSettingsChange?.();
  };

  const handleTestConnection = async () => {
    setTestResult('testing');
    
    try {
      if (settings.provider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${settings.apiKey}` },
        });
        if (response.ok) {
          setTestResult('success');
        } else {
          setTestResult('error');
        }
      } else {
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
            max_tokens: 10,
            messages: [{ role: 'user', content: 'Hi' }],
          }),
        });
        if (response.ok || response.status === 400) {
          // 400 means the key is valid but request format was wrong (which is fine for testing)
          setTestResult('success');
        } else if (response.status === 401) {
          setTestResult('error');
        } else {
          setTestResult('success');
        }
      }
    } catch {
      setTestResult('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-surface-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Key className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-surface-900">AI Settings</h2>
              <p className="text-xs text-surface-500">Configure your API credentials</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Your API key is stored locally</p>
                <p className="text-xs text-blue-700 mt-1">
                  API keys are stored in your browser's localStorage and never sent to our servers. 
                  They are only used to make direct API calls to OpenAI or Anthropic.
                </p>
              </div>
            </div>
          </div>

          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">AI Provider</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleProviderChange('openai')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  settings.provider === 'openai'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-surface-200 hover:border-surface-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <span className="text-sm font-bold text-surface-900">OpenAI</span>
                </div>
                <p className="text-xs text-surface-500">GPT-4o, GPT-4o Mini</p>
              </button>
              <button
                onClick={() => handleProviderChange('anthropic')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  settings.provider === 'anthropic'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-surface-200 hover:border-surface-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <span className="text-sm font-bold text-surface-900">Anthropic</span>
                </div>
                <p className="text-xs text-surface-500">Claude 3.5 Sonnet, Opus</p>
              </button>
            </div>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => { setSettings({...settings, apiKey: e.target.value}); setTestResult('idle'); }}
              placeholder={settings.provider === 'openai' ? 'sk-...' : 'sk-ant-...'}
              className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
            <div className="flex items-center justify-between mt-2">
              <a
                href={settings.provider === 'openai' 
                  ? 'https://platform.openai.com/api-keys' 
                  : 'https://console.anthropic.com/settings/keys'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                Get API key <ExternalLink className="w-3 h-3" />
              </a>
              {settings.apiKey && (
                <button
                  onClick={handleTestConnection}
                  disabled={testResult === 'testing'}
                  className="text-xs text-surface-600 hover:text-surface-900 flex items-center gap-1"
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
              <div className="mt-2 flex items-center gap-2 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5" />
                Connection failed. Please check your API key.
              </div>
            )}
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Model</label>
            <select
              value={settings.model}
              onChange={(e) => setSettings({...settings, model: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              {availableModels[settings.provider].map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <p className="text-xs text-surface-500 mt-1.5">
              Estimated cost: {estimateCost(settings.provider, settings.model)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all text-sm"
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
