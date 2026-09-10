import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import { mockOpportunities, industries, regions, businessTypes, complexities } from '../data/opportunities';
import { Opportunity } from '../types';
import IdeaCard from '../components/IdeaCard';
import { loadGeneratedOpportunities } from '../lib/generated-storage';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  // Load both mock and generated opportunities
  useEffect(() => {
    const generated = loadGeneratedOpportunities();
    setOpportunities([...generated, ...mockOpportunities]);
  }, []);

  const toggleSave = (id: string) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = searchQuery === '' || 
        opp.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesIndustry = selectedIndustry === 'All Industries' || opp.industry === selectedIndustry;
      const matchesRegion = selectedRegion === 'All Regions' || opp.region === selectedRegion;
      const matchesBusinessType = !selectedBusinessType || opp.businessType.includes(selectedBusinessType);
      const matchesComplexity = !selectedComplexity || opp.complexity === selectedComplexity;
      const matchesScore = opp.scores.overall >= minScore;

      return matchesSearch && matchesIndustry && matchesRegion && matchesBusinessType && matchesComplexity && matchesScore;
    });
  }, [opportunities, searchQuery, selectedIndustry, selectedRegion, selectedBusinessType, selectedComplexity, minScore]);

  const activeFilters = [
    selectedIndustry !== 'All Industries' && selectedIndustry,
    selectedRegion !== 'All Regions' && selectedRegion,
    selectedBusinessType,
    selectedComplexity,
    minScore > 0 && `Score ≥ ${minScore}`,
  ].filter(Boolean);

  const clearFilters = () => {
    setSelectedIndustry('All Industries');
    setSelectedRegion('All Regions');
    setSelectedBusinessType('');
    setSelectedComplexity('');
    setMinScore(0);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Discover Opportunities</h1>
        <p className="text-surface-600">Browse AI project opportunities with detailed analysis and scoring.</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-surface-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search opportunities, industries, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-surface-50 border-surface-200 text-surface-600 hover:bg-surface-100'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-primary-600 text-white text-xs rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <div className="flex border border-surface-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-700' : 'text-surface-400 hover:text-surface-600'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-700' : 'text-surface-400 hover:text-surface-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-surface-200">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-medium text-surface-500 mb-1">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-surface-500 mb-1">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-surface-500 mb-1">Business Type</label>
                <select
                  value={selectedBusinessType}
                  onChange={(e) => setSelectedBusinessType(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">All Types</option>
                  {businessTypes.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-surface-500 mb-1">Complexity</label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">All Levels</option>
                  {complexities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-surface-500 mb-1">Min Score: {minScore}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minScore}
                  onChange={(e) => setMinScore(parseFloat(e.target.value))}
                  className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-surface-500">Active:</span>
            {activeFilters.map((filter, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md">
                {filter}
              </span>
            ))}
            <button onClick={clearFilters} className="text-xs text-surface-500 hover:text-red-500 flex items-center gap-1">
              <X className="w-3 h-3" /> Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-surface-500">
          Showing <span className="font-semibold text-surface-900">{filteredOpportunities.length}</span> opportunities
        </p>
      </div>

      {/* Results Grid */}
      {filteredOpportunities.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredOpportunities.map(opp => (
            <IdeaCard key={opp.id} opportunity={opp} onToggleSave={toggleSave} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-surface-200">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-surface-900 mb-2">No opportunities found</h3>
          <p className="text-sm text-surface-500 mb-4">Try adjusting your filters or search terms.</p>
          <button onClick={clearFilters} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
