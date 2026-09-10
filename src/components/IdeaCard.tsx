import { Link } from 'react-router-dom';
import { Opportunity } from '../types';
import { TrendingUp, MapPin, Building2, Clock, DollarSign, Bookmark, BookmarkCheck } from 'lucide-react';
import ScoreCard from './ScoreCard';

interface IdeaCardProps {
  opportunity: Opportunity;
  onToggleSave?: (id: string) => void;
}

export default function IdeaCard({ opportunity, onToggleSave }: IdeaCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 4) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
              {opportunity.industry}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-surface-100 text-surface-600 rounded-full">
              {opportunity.businessType.join(', ')}
            </span>
          </div>
          <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-700 transition-colors">
            {opportunity.projectName}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-xl border text-sm font-bold ${getScoreColor(opportunity.scores.overall)}`}>
            {opportunity.scores.overall.toFixed(1)}
          </div>
          {onToggleSave && (
            <button
              onClick={(e) => { e.preventDefault(); onToggleSave(opportunity.id); }}
              className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
            >
              {opportunity.saved ? (
                <BookmarkCheck className="w-5 h-5 text-primary-600" />
              ) : (
                <Bookmark className="w-5 h-5 text-surface-400" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-surface-600 mb-4 line-clamp-2">
        {opportunity.shortDescription}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <MapPin className="w-3.5 h-3.5" />
          {opportunity.region}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <Building2 className="w-3.5 h-3.5" />
          {opportunity.targetMarket}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <Clock className="w-3.5 h-3.5" />
          {opportunity.complexity}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <DollarSign className="w-3.5 h-3.5" />
          {opportunity.revenuePotential}
        </div>
      </div>

      {/* Score Bars */}
      <div className="space-y-2 mb-4">
        <ScoreCard label="Market Demand" score={opportunity.scores.marketDemand} />
        <ScoreCard label="Revenue Potential" score={opportunity.scores.revenuePotential} />
        <ScoreCard label="Technical Feasibility" score={opportunity.scores.technicalFeasibility} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {opportunity.tags.slice(0, 4).map(tag => (
          <span key={tag} className="px-2 py-0.5 text-xs bg-surface-100 text-surface-500 rounded-md">
            #{tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to={`/idea/${opportunity.id}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-surface-50 hover:bg-primary-50 text-surface-700 hover:text-primary-700 rounded-xl text-sm font-medium transition-all border border-surface-200 hover:border-primary-200"
      >
        <TrendingUp className="w-4 h-4" />
        View Full Analysis
      </Link>
    </div>
  );
}
