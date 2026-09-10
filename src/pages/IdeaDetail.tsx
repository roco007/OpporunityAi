import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Building2, Clock, DollarSign, 
  TrendingUp, AlertTriangle, CheckCircle2, XCircle,
  Lightbulb, Target, Zap, Shield, Code2, Users,
  ChevronRight, ExternalLink, BookOpen, BarChart3, Rocket, Download, Copy, FileText, X, Loader2
} from 'lucide-react';
import { mockOpportunities } from '../data/opportunities';
import { Opportunity } from '../types';
import ScoreRadar from '../components/ScoreRadar';
import ScoreCard from '../components/ScoreCard';
import { buildDevelopmentPrompt, downloadAnalysisPdf } from '../lib/analysis-export';

export default function IdeaDetail() {
  const { id } = useParams();
  const [showBuildPrompt, setShowBuildPrompt] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  
  // Check session storage first (for AI-generated opportunities)
  const sessionData = sessionStorage.getItem(`opportunity-${id}`);
  const sessionOpp: Opportunity | null = sessionData ? JSON.parse(sessionData) : null;
  
  // Fall back to mock data
  const opportunity: Opportunity | undefined = sessionOpp || mockOpportunities.find(o => o.id === id);

  if (!opportunity) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-surface-900 mb-4">Opportunity Not Found</h2>
        <Link to="/dashboard" className="text-primary-600 hover:text-primary-700">← Back to Dashboard</Link>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCopyBuildPrompt = async () => {
    const prompt = buildDevelopmentPrompt(opportunity);
    try {
      await navigator.clipboard.writeText(prompt);
      setPromptCopied(true);
      window.setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setPromptCopied(true);
      window.setTimeout(() => setPromptCopied(false), 2000);
    }
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      await downloadAnalysisPdf(opportunity);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Opportunities
      </Link>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-surface-200 p-6 sm:p-8 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">{opportunity.industry}</span>
              <span className="px-3 py-1 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">{opportunity.category}</span>
              {opportunity.businessType.map(bt => (
                <span key={bt} className="px-3 py-1 text-xs font-medium bg-accent-50 text-accent-700 rounded-full">{bt}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-3">{opportunity.projectName}</h1>
            <p className="text-lg text-surface-600 mb-4">{opportunity.shortDescription}</p>
            
            {/* Elevator Pitch */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 border border-primary-100">
              <p className="text-sm font-medium text-primary-800 mb-1">🎯 Elevator Pitch</p>
              <p className="text-sm text-surface-700">{opportunity.elevatorPitch}</p>
            </div>
          </div>

          {/* Overall Score */}
          <div className="flex-shrink-0 text-center lg:text-right">
            <div className="inline-flex flex-col items-center bg-surface-50 rounded-2xl p-6 border border-surface-200">
              <p className="text-xs font-medium text-surface-500 mb-1">Opportunity Score</p>
              <p className={`text-5xl font-bold ${getScoreColor(opportunity.scores.overall)}`}>
                {opportunity.scores.overall.toFixed(1)}
              </p>
              <p className="text-xs text-surface-400 mt-1">out of 10</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-surface-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-xs text-surface-500">Region</p>
              <p className="text-sm font-medium text-surface-900">{opportunity.region}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-xs text-surface-500">Target Market</p>
              <p className="text-sm font-medium text-surface-900">{opportunity.targetMarket}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-xs text-surface-500">Complexity</p>
              <p className="text-sm font-medium text-surface-900">{opportunity.complexity}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-xs text-surface-500">Revenue Potential</p>
              <p className="text-sm font-medium text-surface-900">{opportunity.revenuePotential}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share and Build Actions */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-5 sm:p-6 mb-6 text-white shadow-lg shadow-primary-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5" />
              <h2 className="text-lg font-bold">Share or build this opportunity</h2>
            </div>
            <p className="text-sm text-primary-100">Export the full research as a PDF, or generate a complete build brief for your preferred LLM.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors disabled:opacity-70"
            >
              {isDownloadingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isDownloadingPdf ? 'Preparing PDF...' : 'Download PDF'}
            </button>
            <button
              type="button"
              onClick={() => setShowBuildPrompt(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500/40 border border-primary-300/50 text-white text-sm font-semibold hover:bg-primary-500/60 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Build prompt
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Analysis */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Problem Analysis
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-surface-700 mb-1">What problem does this solve?</p>
                <p className="text-sm text-surface-600">{opportunity.problemDescription}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-1">Who experiences this problem?</p>
                <p className="text-sm text-surface-600">{opportunity.whoExperiencesProblem}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="text-xs font-medium text-orange-700 mb-1">Problem Significance</p>
                  <p className="text-sm text-orange-600">{opportunity.problemSignificance}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="text-xs font-medium text-orange-700 mb-1">Frequency</p>
                  <p className="text-sm text-orange-600">{opportunity.problemFrequency}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Market Opportunity */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Market Opportunity
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-surface-700 mb-1">Why does this opportunity exist?</p>
                <p className="text-sm text-surface-600">{opportunity.whyOpportunityExists}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-1">What market gap has been identified?</p>
                <p className="text-sm text-surface-600">{opportunity.marketGap}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs font-medium text-green-700 mb-1">Why existing solutions are insufficient</p>
                  <p className="text-sm text-green-600">{opportunity.whyExistingInsufficient}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs font-medium text-green-700 mb-1">Why now?</p>
                  <p className="text-sm text-green-600">{opportunity.whyNow}</p>
                </div>
              </div>
            </div>
          </section>

          {/* AI Solution */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-500" />
              AI Solution
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-surface-700 mb-1">How AI solves this problem</p>
                <p className="text-sm text-surface-600">{opportunity.howAISolves}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-2">Recommended AI Models</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.recommendedModels.map(model => (
                    <span key={model} className="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg border border-primary-100">
                      {model}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-2">Suggested APIs & Integrations</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.suggestedAPIs.map(api => (
                    <span key={api} className="px-3 py-1.5 bg-surface-100 text-surface-700 text-xs font-medium rounded-lg">
                      {api}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-2">AI Workflows</p>
                <div className="space-y-2">
                  {opportunity.aiWorkflows.map((workflow, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-surface-50 rounded-lg">
                      <ChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-surface-600">{workflow}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Competition Analysis */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Competition Analysis
            </h2>
            <div className="space-y-4">
              {opportunity.competitors.map((comp, i) => (
                <div key={i} className="border border-surface-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-surface-900">{comp.name}</h4>
                      <p className="text-xs text-surface-500">{comp.description}</p>
                    </div>
                    <span className="text-xs font-medium text-surface-500 bg-surface-100 px-2 py-1 rounded">{comp.pricing}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <div>
                      <p className="text-xs font-medium text-green-700 mb-1">Strengths</p>
                      <ul className="space-y-1">
                        {comp.strengths.map((s, j) => (
                          <li key={j} className="flex items-center gap-1.5 text-xs text-surface-600">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-red-700 mb-1">Weaknesses</p>
                      <ul className="space-y-1">
                        {comp.weaknesses.map((w, j) => (
                          <li key={j} className="flex items-center gap-1.5 text-xs text-surface-600">
                            <XCircle className="w-3 h-3 text-red-500" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                <p className="text-xs font-medium text-primary-700 mb-2">🎯 Differentiation Opportunities</p>
                <ul className="space-y-1">
                  {opportunity.differentiation.map((d, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-sm text-primary-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* MVP Plan */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-500" />
              MVP Plan
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-surface-700 mb-2">Core Features (MVP)</p>
                <div className="space-y-2">
                  {opportunity.mvp.coreFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-accent-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-accent-500" />
                      <span className="text-sm text-surface-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-2">Future Features</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.mvp.futureFeatures.map((f, i) => (
                    <span key={i} className="px-2.5 py-1 bg-surface-100 text-surface-600 text-xs rounded-lg">{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-2">User Journey</p>
                <div className="space-y-2">
                  {opportunity.mvp.userJourney.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-surface-600 pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-2">Technical Architecture</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {Object.entries(opportunity.mvp.techStack).map(([key, values]) => (
                    <div key={key} className="bg-surface-50 rounded-xl p-3 border border-surface-200">
                      <p className="text-xs font-medium text-surface-500 mb-1.5 capitalize">{key}</p>
                      <div className="flex flex-wrap gap-1">
                        {values.map((v, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white text-surface-700 text-xs rounded border border-surface-200">{v}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Monetization */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              Monetization Strategy
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {opportunity.monetization.models.map((m, i) => (
                  <span key={i} className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-100">{m}</span>
                ))}
              </div>
              <p className="text-sm text-surface-600">{opportunity.monetization.pricingStrategy}</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {opportunity.monetization.examplePricing.map((tier, i) => (
                  <div key={i} className="border border-surface-200 rounded-xl p-4 text-center">
                    <p className="text-sm font-bold text-surface-900">{tier.tier}</p>
                    <p className="text-lg font-bold text-primary-600 my-1">{tier.price}</p>
                    <ul className="space-y-1 mt-2">
                      {tier.features.map((f, j) => (
                        <li key={j} className="text-xs text-surface-500">{f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Validation Strategy */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Validation Strategy
            </h2>
            <div className="space-y-4">
              {Object.entries(opportunity.validation).map(([key, items]) => (
                <div key={key}>
                  <p className="text-sm font-medium text-surface-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="space-y-1.5">
                    {(items as string[]).map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-surface-600">
                        <span className="w-5 h-5 rounded bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Market Signals */}
          <section className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-500" />
              Market Signals
            </h2>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="text-xs font-medium text-green-700 mb-2">✅ Verified Market Signals</p>
                <ul className="space-y-1.5">
                  {opportunity.marketSignals.verified.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-600">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                <p className="text-xs font-medium text-yellow-700 mb-2">⚠️ Assumptions (Require Validation)</p>
                <ul className="space-y-1.5">
                  {opportunity.marketSignals.assumptions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-yellow-600">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs font-medium text-blue-700 mb-2">🔬 Hypotheses (To Be Tested)</p>
                <ul className="space-y-1.5">
                  {opportunity.marketSignals.hypotheses.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-600">
                      <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Score Radar */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Opportunity Scores</h3>
            <ScoreRadar scores={opportunity.scores} size={250} />
            <div className="space-y-3 mt-4">
              <ScoreCard label="Market Demand" score={opportunity.scores.marketDemand} />
              <ScoreCard label="Revenue Potential" score={opportunity.scores.revenuePotential} />
              <ScoreCard label="Competition Level" score={opportunity.scores.competitionLevel} />
              <ScoreCard label="Technical Feasibility" score={opportunity.scores.technicalFeasibility} />
              <ScoreCard label="AI Advantage" score={opportunity.scores.aiAdvantage} />
              <ScoreCard label="Speed to MVP" score={opportunity.scores.speedToMvp} />
              <ScoreCard label="Customer Pain Level" score={opportunity.scores.customerPainLevel} />
              <ScoreCard label="Scalability" score={opportunity.scores.scalability} />
            </div>
          </div>

          {/* SWOT */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h3 className="text-lg font-bold text-surface-900 mb-4">SWOT Analysis</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-green-700 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Strengths
                </p>
                <ul className="space-y-1">
                  {opportunity.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-surface-600 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-red-700 mb-2 flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Weaknesses
                </p>
                <ul className="space-y-1">
                  {opportunity.weaknesses.map((w, i) => (
                    <li key={i} className="text-xs text-surface-600 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-orange-700 mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Risks
                </p>
                <ul className="space-y-1">
                  {opportunity.risks.map((r, i) => (
                    <li key={i} className="text-xs text-surface-600 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> Opportunities
                </p>
                <ul className="space-y-1">
                  {opportunity.opportunities.map((o, i) => (
                    <li key={i} className="text-xs text-surface-600 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Development Effort */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-500" />
              Development Effort
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-surface-100">
                <span className="text-xs text-surface-500">Complexity</span>
                <span className="text-sm font-medium text-surface-900">{opportunity.developmentEffort.complexity}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-100">
                <span className="text-xs text-surface-500">Estimated Time</span>
                <span className="text-sm font-medium text-surface-900">{opportunity.developmentEffort.estimatedTime}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-100">
                <span className="text-xs text-surface-500">Team Size</span>
                <span className="text-sm font-medium text-surface-900">{opportunity.developmentEffort.teamSize}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-100">
                <span className="text-xs text-surface-500">Infra Cost</span>
                <span className="text-sm font-medium text-surface-900">{opportunity.developmentEffort.infrastructureCost}</span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-surface-500 mb-1.5">Required Skills</p>
                <div className="flex flex-wrap gap-1">
                  {opportunity.developmentEffort.requiredSkills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Target Market */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-500" />
              Target Market
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-surface-500 mb-1.5">Customer Profiles</p>
                <ul className="space-y-1">
                  {opportunity.customerProfiles.map((p, i) => (
                    <li key={i} className="text-xs text-surface-600 flex items-start gap-1.5">
                      <Users className="w-3 h-3 text-teal-500 mt-0.5 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-teal-50 rounded-xl p-3 border border-teal-100">
                <p className="text-xs font-medium text-teal-700 mb-1">Ideal Customer Persona</p>
                <p className="text-xs text-teal-600">{opportunity.idealPersona}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 mb-1.5">Potential Industries</p>
                <div className="flex flex-wrap gap-1">
                  {opportunity.potentialIndustries.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 bg-surface-100 text-surface-600 text-xs rounded">{ind}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBuildPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button type="button" aria-label="Close build prompt" className="absolute inset-0 bg-surface-950/70 backdrop-blur-sm" onClick={() => setShowBuildPrompt(false)} />
          <div role="dialog" aria-modal="true" aria-labelledby="build-prompt-title" className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white border border-surface-200 shadow-2xl">
            <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-surface-200">
              <div>
                <h2 id="build-prompt-title" className="text-lg font-bold text-surface-900">LLM build prompt</h2>
                <p className="text-sm text-surface-500 mt-1">Copy this brief into ChatGPT, Codex, Claude, or another coding LLM to build {opportunity.projectName} from scratch.</p>
              </div>
              <button type="button" aria-label="Close build prompt" onClick={() => setShowBuildPrompt(false)} className="p-2 -mr-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-164px)]">
              <textarea
                readOnly
                value={buildDevelopmentPrompt(opportunity)}
                aria-label="Generated LLM build prompt"
                className="w-full min-h-[390px] resize-y rounded-xl bg-surface-50 border border-surface-200 p-4 font-mono text-xs leading-5 text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div className="flex justify-end gap-3 px-5 sm:px-6 py-4 border-t border-surface-200 bg-surface-50">
              <button type="button" onClick={() => setShowBuildPrompt(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-white transition-colors">Close</button>
              <button type="button" onClick={handleCopyBuildPrompt} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                {promptCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {promptCopied ? 'Copied!' : 'Copy prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
