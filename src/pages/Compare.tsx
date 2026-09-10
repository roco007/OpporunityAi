import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitCompare, ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { mockOpportunities } from '../data/opportunities';
import { Opportunity } from '../types';
import ScoreCard from '../components/ScoreCard';

export default function Compare() {
  const [selected, setSelected] = useState<Opportunity[]>([mockOpportunities[0], mockOpportunities[1]]);
  const [showSelector, setShowSelector] = useState(false);

  const allOpportunities = mockOpportunities;

  const addToComparison = (opp: Opportunity) => {
    if (selected.length < 4 && !selected.find(s => s.id === opp.id)) {
      setSelected([...selected, opp]);
    }
  };

  const removeFromComparison = (id: string) => {
    setSelected(selected.filter(s => s.id !== id));
  };

  const getBestScore = (key: keyof Opportunity['scores']) => {
    const values = selected.map(s => s.scores[key]);
    return Math.max(...values);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2 flex items-center gap-3">
          <GitCompare className="w-8 h-8 text-primary-600" />
          Compare Opportunities
        </h1>
        <p className="text-surface-600">Compare multiple AI project opportunities side-by-side to make informed decisions.</p>
      </div>

      {/* Selection Controls */}
      <div className="bg-white rounded-2xl border border-surface-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-surface-700">
              Comparing {selected.length} opportunities
            </span>
            <span className="text-xs text-surface-400">(max 4)</span>
          </div>
          <button
            onClick={() => setShowSelector(!showSelector)}
            className="px-4 py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
          >
            {showSelector ? 'Close Selector' : 'Add/Remove'}
          </button>
        </div>

        {showSelector && (
          <div className="mt-4 pt-4 border-t border-surface-200">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {allOpportunities.map(opp => {
                const isSelected = selected.find(s => s.id === opp.id);
                return (
                  <button
                    key={opp.id}
                    onClick={() => isSelected ? removeFromComparison(opp.id) : addToComparison(opp)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-primary-50 border-primary-300'
                        : 'bg-surface-50 border-surface-200 hover:bg-surface-100'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${
                      isSelected ? 'bg-primary-600' : 'border-2 border-surface-300'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900 truncate">{opp.projectName}</p>
                      <p className="text-xs text-surface-500">{opp.industry} • {opp.scores.overall.toFixed(1)}/10</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selected.length > 0 ? (
        <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left p-4 text-sm font-medium text-surface-500 w-48">Category</th>
                  {selected.map(opp => (
                    <th key={opp.id} className="p-4 text-left min-w-[250px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-surface-900">{opp.projectName}</p>
                          <p className="text-xs text-surface-500">{opp.industry}</p>
                        </div>
                        <button
                          onClick={() => removeFromComparison(opp.id)}
                          className="text-surface-400 hover:text-red-500 p-1"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Overall Score */}
                <tr className="border-b border-surface-100 bg-surface-50">
                  <td className="p-4 text-sm font-medium text-surface-700">Overall Score</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4">
                      <span className={`text-2xl font-bold ${
                        opp.scores.overall >= 8 ? 'text-green-600' :
                        opp.scores.overall >= 6 ? 'text-blue-600' : 'text-yellow-600'
                      }`}>
                        {opp.scores.overall.toFixed(1)}
                      </span>
                      <span className="text-xs text-surface-400 ml-1">/10</span>
                    </td>
                  ))}
                </tr>

                {/* Score Breakdown */}
                {([
                  ['Market Demand', 'marketDemand'],
                  ['Revenue Potential', 'revenuePotential'],
                  ['Competition Level', 'competitionLevel'],
                  ['Technical Feasibility', 'technicalFeasibility'],
                  ['AI Advantage', 'aiAdvantage'],
                  ['Speed to MVP', 'speedToMvp'],
                  ['Customer Pain Level', 'customerPainLevel'],
                  ['Scalability', 'scalability'],
                ] as const).map(([label, key]) => (
                  <tr key={key} className="border-b border-surface-100">
                    <td className="p-4 text-xs text-surface-500">{label}</td>
                    {selected.map(opp => {
                      const isBest = opp.scores[key] === getBestScore(key) && selected.length > 1;
                      return (
                        <td key={opp.id} className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${isBest ? 'text-green-600' : 'text-surface-700'}`}>
                              {opp.scores[key]}/10
                            </span>
                            {isBest && <span className="text-xs text-green-600">★</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Key Metrics */}
                <tr className="border-b border-surface-100 bg-surface-50">
                  <td className="p-4 text-sm font-medium text-surface-700">Region</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4 text-sm text-surface-600">{opp.region}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-100">
                  <td className="p-4 text-sm font-medium text-surface-700">Business Type</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4 text-sm text-surface-600">{opp.businessType.join(', ')}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-100 bg-surface-50">
                  <td className="p-4 text-sm font-medium text-surface-700">Complexity</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        opp.complexity === 'Low' ? 'bg-green-50 text-green-700' :
                        opp.complexity === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {opp.complexity}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-surface-100">
                  <td className="p-4 text-sm font-medium text-surface-700">Revenue Potential</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4 text-sm text-surface-600">{opp.revenuePotential}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-100 bg-surface-50">
                  <td className="p-4 text-sm font-medium text-surface-700">Development Time</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4 text-sm text-surface-600">{opp.developmentEffort.estimatedTime}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-100">
                  <td className="p-4 text-sm font-medium text-surface-700">Team Size</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4 text-sm text-surface-600">{opp.developmentEffort.teamSize}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-100 bg-surface-50">
                  <td className="p-4 text-sm font-medium text-surface-700">Infra Cost</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4 text-sm text-surface-600">{opp.developmentEffort.infrastructureCost}</td>
                  ))}
                </tr>

                {/* Strengths */}
                <tr className="border-b border-surface-100">
                  <td className="p-4 text-sm font-medium text-surface-700">Key Strengths</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4">
                      <ul className="space-y-1">
                        {opp.strengths.slice(0, 3).map((s, i) => (
                          <li key={i} className="text-xs text-surface-600 flex items-start gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Risks */}
                <tr className="border-b border-surface-100 bg-surface-50">
                  <td className="p-4 text-sm font-medium text-surface-700">Key Risks</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4">
                      <ul className="space-y-1">
                        {opp.risks.slice(0, 3).map((r, i) => (
                          <li key={i} className="text-xs text-surface-600 flex items-start gap-1">
                            <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Monetization */}
                <tr className="border-b border-surface-100">
                  <td className="p-4 text-sm font-medium text-surface-700">Monetization</td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {opp.monetization.models.map((m, i) => (
                          <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">{m}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* View Detail */}
                <tr className="bg-surface-50">
                  <td className="p-4"></td>
                  {selected.map(opp => (
                    <td key={opp.id} className="p-4">
                      <Link
                        to={`/idea/${opp.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        View Full Analysis →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-surface-200">
          <GitCompare className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Select Opportunities to Compare</h3>
          <p className="text-sm text-surface-500 mb-4">Choose 2-4 opportunities to compare side-by-side.</p>
          <button
            onClick={() => setShowSelector(true)}
            className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100"
          >
            Select Opportunities
          </button>
        </div>
      )}
    </div>
  );
}
