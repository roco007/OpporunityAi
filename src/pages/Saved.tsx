import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { mockOpportunities } from '../data/opportunities';
import { Opportunity } from '../types';
import IdeaCard from '../components/IdeaCard';

export default function Saved() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(
    mockOpportunities.filter(o => o.saved)
  );

  const toggleSave = (id: string) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
  };

  const savedOpps = mockOpportunities.filter(o => o.saved);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2 flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-primary-600" />
          Saved Opportunities
        </h1>
        <p className="text-surface-600">Your bookmarked AI project opportunities for later review.</p>
      </div>

      {savedOpps.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedOpps.map(opp => (
            <IdeaCard key={opp.id} opportunity={opp} onToggleSave={toggleSave} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-surface-200">
          <Bookmark className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 mb-2">No Saved Opportunities</h3>
          <p className="text-sm text-surface-500 mb-4">
            Browse opportunities and click the bookmark icon to save them here.
          </p>
          <a href="/dashboard" className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 inline-block">
            Browse Opportunities
          </a>
        </div>
      )}
    </div>
  );
}
