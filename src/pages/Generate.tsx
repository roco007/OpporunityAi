import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Globe, Building2, Users, DollarSign, 
  Code2, Target, Briefcase, Loader2, ArrowRight, Lightbulb,
  Settings, AlertCircle, CheckCircle2, XCircle
} from 'lucide-react';
import { industries, regions, businessTypes, complexities, problemCategories } from '../data/opportunities';
import { GenerateParams, Opportunity } from '../types';
import { loadSettings, hasValidSettings } from '../lib/storage';
import { generateOpportunities, AIGenerationError } from '../lib/ai-client';
import { saveGeneratedOpportunities } from '../lib/generated-storage';
import SettingsModal from '../components/SettingsModal';

export default function Generate() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [generatedOpps, setGeneratedOpps] = useState<Opportunity[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(hasValidSettings());
  
  const [params, setParams] = useState<GenerateParams>({
    targetMarket: '',
    region: 'United States',
    industry: '',
    targetAudience: '',
    businessType: [],
    budget: 'medium',
    complexity: 'Medium',
    technologies: [],
    revenuePotential: '',
    problemCategory: '',
  });

  useEffect(() => {
    setHasApiKey(hasValidSettings());
  }, [showSettings]);

  const techOptions = [
    'OpenAI / GPT-4', 'Anthropic / Claude', 'LangChain', 'Computer Vision',
    'NLP / Text Analysis', 'Recommendation Systems', 'Speech/Audio AI',
    'Predictive Analytics', 'RAG Systems', 'AI Agents', 'Fine-tuning', 'Embeddings'
  ];

  const budgetOptions = [
    { value: 'low', label: 'Bootstrapped', desc: '< $5K, solo developer' },
    { value: 'medium', label: 'Small Team', desc: '$5K-$25K, 1-3 developers' },
    { value: 'high', label: 'Funded', desc: '$25K-$100K, small team' },
    { value: 'enterprise', label: 'Enterprise', desc: '$100K+, dedicated team' },
  ];

  const revenueOptions = [
    '$10K-$100K ARR',
    '$100K-$500K ARR',
    '$500K-$2M ARR',
    '$2M-$5M ARR',
    '$5M+ ARR',
  ];

  const toggleBusinessType = (type: string) => {
    setParams(prev => ({
      ...prev,
      businessType: prev.businessType.includes(type)
        ? prev.businessType.filter(t => t !== type)
        : [...prev.businessType, type]
    }));
  };

  const toggleTech = (tech: string) => {
    setParams(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleGenerate = async () => {
    if (!hasApiKey) {
      setShowSettings(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedOpps([]);
    setProgress('Initializing...');

    try {
      const settings = loadSettings();
      if (!settings) {
        throw new AIGenerationError('Settings not found. Please configure your API key.');
      }

      const opportunities = await generateOpportunities(params, settings, (stage) => {
        setProgress(stage);
      });

      // Save to localStorage for persistence
      saveGeneratedOpportunities(opportunities);
      
      setGeneratedOpps(opportunities);
      setProgress('Complete!');
    } catch (err) {
      if (err instanceof AIGenerationError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(`An unexpected error occurred: ${err.message}`);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm text-primary-700 font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          AI-Powered Generation
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-3">
          Generate AI Project Opportunities
        </h1>
        <p className="text-lg text-surface-600 max-w-2xl mx-auto">
          Define your parameters and let AI discover profitable project opportunities tailored to your skills, market, and goals.
        </p>
        
        {/* API Key Status */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {hasApiKey ? (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              AI configured and ready
            </div>
          ) : (
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
              Configure Gemini API key to generate ideas
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Generation Form */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-xl shadow-surface-200/50 overflow-hidden">
        <div className="p-6 sm:p-8 space-y-8">
          {/* Market & Region */}
          <div>
            <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-600" />
              Target Market
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Region</label>
                <select
                  value={params.region}
                  onChange={(e) => setParams({...params, region: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                >
                  {regions.filter(r => r !== 'All Regions').map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Industry</label>
                <select
                  value={params.industry}
                  onChange={(e) => setParams({...params, industry: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                >
                  <option value="">Any Industry</option>
                  {industries.filter(i => i !== 'All Industries').map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Target Market</label>
                <input
                  type="text"
                  placeholder="e.g., Small businesses, Enterprise, Consumers"
                  value={params.targetMarket}
                  onChange={(e) => setParams({...params, targetMarket: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g., Marketing agencies, SaaS founders"
                  value={params.targetAudience}
                  onChange={(e) => setParams({...params, targetAudience: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Business Type */}
          <div>
            <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-600" />
              Business Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {businessTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleBusinessType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    params.businessType.includes(type)
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'bg-surface-50 border-surface-200 text-surface-600 hover:bg-surface-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Category */}
          <div>
            <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" />
              Problem Category
            </h3>
            <select
              value={params.problemCategory}
              onChange={(e) => setParams({...params, problemCategory: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              <option value="">Any Problem Category</option>
              {problemCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              Budget & Resources
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {budgetOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setParams({...params, budget: option.value})}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    params.budget === option.value
                      ? 'bg-primary-50 border-primary-300 ring-2 ring-primary-500/20'
                      : 'bg-surface-50 border-surface-200 hover:bg-surface-100'
                  }`}
                >
                  <p className="text-sm font-semibold text-surface-900">{option.label}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity & Revenue */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-600" />
                Development Complexity
              </h3>
              <div className="flex gap-2">
                {complexities.map(c => (
                  <button
                    key={c}
                    onClick={() => setParams({...params, complexity: c})}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      params.complexity === c
                        ? 'bg-primary-50 border-primary-300 text-primary-700'
                        : 'bg-surface-50 border-surface-200 text-surface-600 hover:bg-surface-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600" />
                Revenue Potential
              </h3>
              <select
                value={params.revenuePotential}
                onChange={(e) => setParams({...params, revenuePotential: e.target.value})}
                className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
                <option value="">Any Revenue Range</option>
                {revenueOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary-600" />
              Preferred AI Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {techOptions.map(tech => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    params.technologies.includes(tech)
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'bg-surface-50 border-surface-200 text-surface-600 hover:bg-surface-100'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="bg-surface-50 border-t border-surface-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-surface-500">
              <Lightbulb className="w-5 h-5 text-primary-500" />
              <span>AI will generate 3 detailed opportunities based on your parameters</span>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Opportunities
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="mt-8 bg-white rounded-2xl border border-surface-200 p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-surface-900 mb-2">Generating Opportunities...</h3>
            <p className="text-sm text-surface-500 mb-6">{progress}</p>
            <div className="max-w-md mx-auto space-y-3">
              {[
                'Gemini is analyzing market data and trends...',
                'Researching competitor landscape...',
                'Evaluating technical feasibility...',
                'Calculating opportunity scores...',
                'Generating detailed analysis...'
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-surface-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  {step}
                </div>
              ))}
            </div>
            <p className="text-xs text-surface-400 mt-6">This may take 20-60 seconds depending on the Gemini model...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-1">Generation Failed</h3>
              <p className="text-sm text-red-700 mb-4">{error}</p>
              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 bg-white border border-red-200 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                >
                  Check Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Results */}
      {generatedOpps.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-surface-900">Generated Opportunities</h2>
            <span className="text-sm text-surface-500">{generatedOpps.length} opportunities generated</span>
          </div>
          
          {generatedOpps.map((opp) => (
            <div key={opp.id} className="bg-white rounded-2xl border border-surface-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                      {opp.industry}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-medium bg-accent-50 text-accent-700 rounded-full">
                      {opp.scores.overall.toFixed(1)}/10
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-surface-900">{opp.projectName}</h3>
                  <p className="text-sm text-surface-600 mt-1">{opp.shortDescription}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-surface-50 rounded-xl p-3">
                  <p className="text-xs text-surface-500 mb-1">Revenue Potential</p>
                  <p className="text-sm font-semibold text-surface-900">{opp.revenuePotential}</p>
                </div>
                <div className="bg-surface-50 rounded-xl p-3">
                  <p className="text-xs text-surface-500 mb-1">Development Time</p>
                  <p className="text-sm font-semibold text-surface-900">{opp.developmentEffort.estimatedTime}</p>
                </div>
                <div className="bg-surface-50 rounded-xl p-3">
                  <p className="text-xs text-surface-500 mb-1">Complexity</p>
                  <p className="text-sm font-semibold text-surface-900">{opp.complexity}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Store in session and navigate to detail
                    sessionStorage.setItem(`opportunity-${opp.id}`, JSON.stringify(opp));
                    navigate(`/idea/${opp.id}`);
                  }}
                  className="flex-1 py-2.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-xl hover:bg-primary-100 transition-colors"
                >
                  View Full Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSettingsChange={() => setHasApiKey(hasValidSettings())}
      />
    </div>
  );
}
