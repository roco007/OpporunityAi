import { Link } from 'react-router-dom';
import { 
  Sparkles, Target, Brain, Rocket, Shield, TrendingUp, 
  ArrowRight, CheckCircle2, Zap, BarChart3, Globe
} from 'lucide-react';
import { mockOpportunities } from '../data/opportunities';
import IdeaCard from '../components/IdeaCard';

export default function Landing() {
  const features = [
    { icon: Brain, title: 'AI-Powered Discovery', description: 'Generate tailored AI project ideas based on your market, skills, budget, and goals.' },
    { icon: Target, title: 'Market Validation', description: 'Real market signals, competitor analysis, and customer pain points — not generic ideas.' },
    { icon: BarChart3, title: 'Opportunity Scoring', description: 'Intelligent scoring across 8 dimensions: demand, revenue, feasibility, AI advantage, and more.' },
    { icon: Rocket, title: 'MVP Planning', description: 'Complete MVP plans with tech stack, features, timeline, and infrastructure estimates.' },
    { icon: Shield, title: 'Risk Assessment', description: 'SWOT analysis, market signals, and validation strategies before you invest time.' },
    { icon: Globe, title: 'US & EU Focus', description: 'Opportunities specifically relevant to US and European markets with regulatory awareness.' },
  ];

  const steps = [
    { step: '01', title: 'Define Your Parameters', description: 'Select your target market, industry, business type, budget, and technology preferences.' },
    { step: '02', title: 'Discover Opportunities', description: 'AI generates detailed project opportunities with real market analysis and scoring.' },
    { step: '03', title: 'Analyze & Compare', description: 'Deep-dive into each opportunity with full analysis, competitor research, and MVP plans.' },
    { step: '04', title: 'Validate & Build', description: 'Follow validation strategies, then build your MVP with confidence.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-50 via-primary-50/30 to-surface-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm text-primary-700 font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Opportunity Discovery
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 leading-tight mb-6">
                Find Your Next
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  Profitable AI Project
                </span>
              </h1>
              
              <p className="text-lg text-surface-600 mb-8 max-w-lg">
                Discover real market problems, validate opportunities, and get complete MVP plans 
                for AI projects in US and European markets. No generic ideas — only actionable opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/generate"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25"
                >
                  <Zap className="w-5 h-5" />
                  Generate Opportunities
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-surface-200 text-surface-700 font-semibold rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all"
                >
                  Browse Opportunities
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-surface-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  No generic ideas
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  Real market data
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  Complete MVP plans
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-primary-500/10 border border-surface-200 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-surface-400 ml-2">Opportunity Analysis</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-surface-900">ContractGuard AI</p>
                      <p className="text-xs text-surface-500">Legal Tech • B2B SaaS</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">8.1</p>
                      <p className="text-xs text-surface-400">Score</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['Market', 'Revenue', 'Feasibility', 'AI Edge'].map((label, i) => (
                      <div key={label} className="text-center p-2 bg-primary-50 rounded-lg">
                        <p className="text-lg font-bold text-primary-700">{[9, 8, 8, 9][i]}</p>
                        <p className="text-xs text-primary-500">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-accent-50 border border-accent-200 rounded-xl">
                    <p className="text-xs font-medium text-accent-700 mb-1">💡 Market Signal</p>
                    <p className="text-xs text-accent-600">30M+ US SMBs need affordable contract review</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs bg-surface-100 text-surface-600 rounded-md">8-12 weeks MVP</span>
                    <span className="px-2 py-1 text-xs bg-surface-100 text-surface-600 rounded-md">$500K-2M ARR</span>
                    <span className="px-2 py-1 text-xs bg-surface-100 text-surface-600 rounded-md">2-3 devs</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 animate-float border border-surface-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-semibold text-surface-900">+340% demand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              From Problem to Product in 4 Steps
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Our platform guides you through the complete journey from identifying real market problems to building validated AI products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent -translate-x-8" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white text-xl font-bold mb-4 shadow-lg shadow-primary-500/25">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-surface-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Everything You Need to Find & Validate Opportunities
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              A complete toolkit for AI project discovery, market analysis, and MVP planning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 border border-surface-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Sample Opportunities
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Here are real AI project opportunities generated by our platform. Each includes complete analysis, scoring, and MVP plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockOpportunities.slice(0, 3).map(opp => (
              <IdeaCard key={opp.id} opportunity={opp} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-900 text-white font-semibold rounded-xl hover:bg-surface-800 transition-all"
            >
              View All Opportunities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gradient-to-br from-surface-900 to-surface-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The Complete Opportunity Journey
            </h2>
            <p className="text-lg text-surface-300 max-w-2xl mx-auto">
              We don't just generate ideas. We guide you through the entire process from problem discovery to monetization.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🔍', title: 'Real Market Problem', desc: 'Identify genuine customer pain points backed by market data and signals.' },
              { emoji: '💡', title: 'Business Opportunity', desc: 'Validate the market gap, timing, and commercial viability.' },
              { emoji: '🤖', title: 'AI Solution', desc: 'Design how AI specifically solves the problem better than alternatives.' },
              { emoji: '🚀', title: 'MVP Plan', desc: 'Complete technical architecture, features, and development timeline.' },
              { emoji: '✅', title: 'Validation Strategy', desc: 'Actionable steps to validate before investing in development.' },
              { emoji: '💰', title: 'Monetization', desc: 'Pricing strategies and business models for US and EU markets.' },
            ].map(item => (
              <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <span className="text-3xl mb-3 block">{item.emoji}</span>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-surface-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            Ready to Discover Your Next AI Project?
          </h2>
          <p className="text-lg text-surface-600 mb-8 max-w-2xl mx-auto">
            Stop guessing. Start building AI products that solve real problems for real customers in profitable markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Start Generating Opportunities
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-surface-200 text-surface-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-700 transition-all text-lg"
            >
              Browse Existing Ideas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
