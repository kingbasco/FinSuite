import React from 'react';
import { FinSuiteLogo } from './BrandIcons';
import { ActiveScreen } from '../../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenDemo: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDemo, onOpenChat }) => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <FinSuiteLogo />
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed mt-1">
              Welcome to FinSuite, where financial management meets simplicity and efficiency. Global payments, expense control, and smart cards in one unified suite.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' },
                { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { name: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z' }
              ].map((s) => (
                <button
                  key={s.name}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d={s.icon} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 tracking-tight">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Affiliate Program</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Careers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 tracking-tight">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-slate-900 transition-colors">Overview</button></li>
              <li><button onClick={() => onNavigate('transfers')} className="hover:text-slate-900 transition-colors">Features</button></li>
              <li><button onClick={() => onNavigate('integrations')} className="hover:text-slate-900 transition-colors">Integrations</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-slate-900 transition-colors">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 tracking-tight">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Blog</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Podcast</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Webinars</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Press</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 tracking-tight">Support</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={onOpenDemo} className="hover:text-slate-900 transition-colors text-left">Request a Demo</button></li>
              <li><button onClick={onOpenChat} className="hover:text-slate-900 transition-colors text-left">Contact Us</button></li>
              <li><button onClick={onOpenChat} className="hover:text-slate-900 transition-colors text-left">Report a Bug</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors text-left">Security Hub</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} FinSuite Technologies Inc. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <button className="hover:text-slate-700 transition-colors">Terms & Conditions</button>
            <button className="hover:text-slate-700 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-700 transition-colors">Cookie Preferences</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
