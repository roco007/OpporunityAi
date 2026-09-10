import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, LayoutDashboard, Lightbulb, GitCompare, 
  Menu, X, Zap, Bookmark, Settings
} from 'lucide-react';
import SettingsModal from './SettingsModal';
import { loadTheme, setTheme, Theme } from '../lib/theme';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setCurrentTheme] = useState<Theme>(() => loadTheme());
  const location = useLocation();

  const handleThemeChange = (nextTheme: Theme) => {
    setCurrentTheme(nextTheme);
    setTheme(nextTheme);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Sparkles },
    { path: '/dashboard', label: 'Discover', icon: LayoutDashboard },
    { path: '/generate', label: 'Generate', icon: Lightbulb },
    { path: '/compare', label: 'Compare', icon: GitCompare },
    { path: '/saved', label: 'Saved', icon: Bookmark },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-900">
                Opportunity<span className="text-primary-600">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg text-surface-500 hover:text-surface-900 hover:bg-surface-100 transition-all"
                title="AI Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <Link
                to="/generate"
                className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25"
              >
                Generate Ideas
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-surface-600 hover:bg-surface-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Footer */}
      <footer className="bg-surface-900 text-surface-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">OpportunityAI</span>
              </div>
              <p className="text-sm text-surface-400 max-w-md">
                AI-powered platform for discovering profitable project opportunities. 
                Find real problems, validate markets, and build successful products in US and European markets.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Discover Opportunities</Link></li>
                <li><Link to="/generate" className="hover:text-white transition-colors">Generate Ideas</Link></li>
                <li><Link to="/compare" className="hover:text-white transition-colors">Compare Ideas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Markets</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-surface-400">United States</span></li>
                <li><span className="text-surface-400">Europe</span></li>
                <li><span className="text-surface-400">United Kingdom</span></li>
                <li><span className="text-surface-400">Germany</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-800 mt-8 pt-8 text-center text-sm text-surface-500">
            © 2024 OpportunityAI. All rights reserved. Built for entrepreneurs, developers, and indie hackers.
          </div>
        </div>
      </footer>
    </div>
  );
}
