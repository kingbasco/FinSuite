import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ActiveScreen } from '../../types';
import { FinSuiteLogo } from './BrandIcons';
import { AnimatedButton } from './AnimatedButton';

interface NavbarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveScreen; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Analytics' },
    { id: 'transfers', label: 'Transfers' },
    { id: 'cards', label: 'Cards' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div onClick={() => onNavigate('home')} className="shrink-0 cursor-pointer">
          <FinSuiteLogo />
        </div>

        {/* Zone 2: Navigation Links (Single-Line, 4-6 items) with active indicator */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/70 rounded-full border border-slate-200/50">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {item.label}
                  {item.id === 'dashboard' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={() => onOpenAuth('login')}
            className="text-slate-700 hover:text-slate-950 font-medium"
          >
            Log In
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            size="md"
            onClick={() => onOpenAuth('signup')}
            rightIcon={<ArrowUpRight className="w-4 h-4 opacity-70" />}
          >
            Get Started
          </AnimatedButton>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <AnimatedButton
            variant="primary"
            size="sm"
            onClick={() => onOpenAuth('signup')}
          >
            Get Started
          </AnimatedButton>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-1.5 py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                    currentScreen === item.id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentScreen === item.id && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Active</span>}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <AnimatedButton
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                >
                  Log In
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
