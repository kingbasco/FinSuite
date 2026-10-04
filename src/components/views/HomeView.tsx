import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Check,
  CheckCircle2,
  Plus,
  Star,
  Globe2,
  ArrowRight,
  Sparkles,
  Layers,
  Shield,
  CreditCard,
  MessageSquare,
  Play
} from 'lucide-react';
import { ActiveScreen, CardDetails } from '../../types';
import { NetflixIcon, SpotifyIcon, ICloudIcon, ToolIcon } from '../common/BrandIcons';
import { AnimatedButton } from '../common/AnimatedButton';
import { InteractiveCard3D } from '../common/InteractiveCard3D';
import { IntegrationNetwork } from '../common/IntegrationNetwork';
import {
  INITIAL_BALANCE,
  EXTRA_EARNED_MONTH,
  CHART_DATA_POINTS,
  EXPENSE_CATEGORIES,
  TOTAL_MONTHLY_EXPENSE,
  COUNTRIES,
  FRIENDS_CONTACTS,
  MOCK_CARDS
} from '../../data/mockData';

interface HomeViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenSendModal: () => void;
  onOpenDemoModal: () => void;
  onOpenLiveChatModal: (mode?: 'chat' | 'booking') => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  currentBalance: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSendModal,
  onOpenDemoModal,
  onOpenLiveChatModal,
  onOpenAuth,
  currentBalance,
}) => {
  const [selectedBar, setSelectedBar] = useState<number | null>(4); // Default to highlighted May bar ($4,239.12)
  const [activeDonutHover, setActiveDonutHover] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [currencyAmount, setCurrencyAmount] = useState('1000');
  const [targetCurrency, setTargetCurrency] = useState('EUR');

  // Country rate helper
  const currentTargetRate = COUNTRIES.find((c) => c.currency === targetCurrency)?.rateToUSD || 0.92;
  const convertedValue = (parseFloat(currencyAmount || '0') * currentTargetRate).toFixed(2);

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Ambient subtle glow backgrounds */}
        <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 left-10 w-80 h-80 rounded-full bg-lime-100/40 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-5 space-y-6">
              {/* Badge: Finance Solutions For You */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Finance Solutions For You</span>
              </div>

              {/* Title with decorative circular icon */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Maximize <br />
                Your <span className="text-blue-600 inline-flex items-center gap-2">
                  Financial
                  {/* Circular neon green pill badge matching screenshot */}
                  <span className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900 text-[#D4F74C] shadow-md -translate-y-1">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                </span> <br />
                Potential
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-md leading-relaxed">
                Welcome to FinSuite, where financial management meets simplicity and efficiency.
              </p>

              {/* CTA Button */}
              <div className="pt-2 flex items-center gap-4">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={() => onOpenAuth('signup')}
                  className="px-8 shadow-lg shadow-slate-900/10"
                >
                  Get Started
                </AnimatedButton>
                <AnimatedButton
                  variant="ghost"
                  size="lg"
                  onClick={() => onNavigate('dashboard')}
                  rightIcon={<ArrowRight className="w-4 h-4 text-blue-600" />}
                >
                  Live Analytics
                </AnimatedButton>
              </div>
            </div>

            {/* Right Column: Hero Floating Cards Graphic */}
            <div className="lg:col-span-7 relative">
              <div className="relative mx-auto max-w-xl">
                {/* Floating Subscription 1: Netflix */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="absolute -top-6 left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 w-48 select-none"
                >
                  <NetflixIcon className="w-8 h-8" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800">Netflix</div>
                    <div className="text-sm font-extrabold text-slate-900 font-mono">$24<span className="text-[10px] text-slate-400 font-normal">/month</span></div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    ×
                  </div>
                </motion.div>

                {/* Floating Subscription 2: Spotify (Vibrant Blue Card) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="absolute -top-10 right-4 z-20 bg-blue-600 text-white rounded-3xl p-5 shadow-2xl shadow-blue-500/30 w-56 select-none"
                >
                  <div className="flex items-center justify-between mb-3">
                    <SpotifyIcon className="w-8 h-8" />
                    <span className="text-xs font-semibold tracking-wide">Spotify</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-black font-mono">$13</div>
                      <div className="text-[11px] text-blue-200">/month</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </motion.div>

                {/* Main Hero Card: My Balance & Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 pt-14"
                >
                  {/* Top row: Balance and Quick Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <div className="text-xs font-medium text-slate-500">My Balance</div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono mt-0.5">
                        ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <span>You made an extra</span>
                        <span className="font-semibold text-emerald-600 font-mono">+${EXTRA_EARNED_MONTH.toFixed(2)}</span>
                        <span>in this month.</span>
                      </div>
                    </div>

                    {/* Quick action buttons with circles */}
                    <div className="flex items-center gap-3">
                      {[
                        { label: 'Send', icon: ArrowUp, action: onOpenSendModal },
                        { label: 'Receive', icon: ArrowDown, action: onOpenSendModal },
                        { label: 'Convert', icon: RefreshCw, action: () => onNavigate('transfers') },
                      ].map((btn) => {
                        const Icon = btn.icon;
                        return (
                          <motion.button
                            key={btn.label}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={btn.action}
                            className="flex flex-col items-center gap-1 cursor-pointer group"
                          >
                            <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex items-center justify-center text-slate-700">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900">
                              {btn.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Bar Chart */}
                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                      <span>Liquidity History</span>
                      <span className="font-mono text-slate-600">Peak: $4,239.12</span>
                    </div>

                    <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2">
                      {CHART_DATA_POINTS.map((bar, idx) => {
                        const isSelected = selectedBar === idx;
                        return (
                          <div
                            key={bar.label}
                            onClick={() => setSelectedBar(idx)}
                            className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                          >
                            {/* Hover / Selected Tooltip */}
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-2 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-mono whitespace-nowrap shadow-md"
                              >
                                ${bar.val.toLocaleString()}
                              </motion.div>
                            )}

                            {/* Bar pillar */}
                            <div className="w-full max-w-[32px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: bar.height }}
                                transition={{ duration: 0.8, delay: idx * 0.05 }}
                                className={`w-full rounded-t-xl transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md'
                                    : 'bg-slate-200 group-hover:bg-blue-300'
                                }`}
                              />
                            </div>
                            <span className={`text-[11px] mt-2 font-medium ${isSelected ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                              {bar.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SOCIAL PROOF METRICS
          ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-slate-500 tracking-wide">
            Trusted by users across the platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              score: '4.8',
              label: 'Chrome store',
              icon: (
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                  <ToolIcon name="chrome" className="w-5 h-5" />
                </div>
              ),
              color: 'text-amber-500',
            },
            {
              score: '4.9',
              label: 'Producthunt',
              icon: (
                <div className="w-5 h-5 rounded-full bg-[#DA552F] text-white flex items-center justify-center text-xs font-bold font-mono">
                  P
                </div>
              ),
              color: 'text-red-500',
            },
            {
              score: '4.8',
              label: 'Trustpilot',
              icon: (
                <div className="w-5 h-5 flex items-center justify-center text-emerald-500">
                  <Star className="w-5 h-5 fill-current" />
                </div>
              ),
              color: 'text-emerald-500',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm"
            >
              <span className="text-2xl font-extrabold text-slate-900 font-mono">{item.score}</span>
              <div className="flex items-center gap-1.5">
                {item.icon}
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. FEATURE SECTION 1: ANALYTICS DASHBOARD
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            <span className="text-blue-600">Empower</span> Your Financial <br />
            Future with us
          </h2>
        </div>

        {/* Bento Card 1: Dashboard with green header pill */}
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Financial Dashboard Visual */}
            <div className="lg:col-span-6 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              {/* Lime green top section */}
              <div className="bg-[#D4F74C] p-6 text-slate-950">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">My Balance</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-950/10">Active Account</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight">
                  ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-800 font-medium mt-1">
                  Your made an extra <span className="font-bold font-mono">+${EXTRA_EARNED_MONTH.toFixed(2)}</span> in this month.
                </div>

                {/* 3 action buttons on lime header */}
                <div className="flex items-center gap-3 mt-5">
                  {[
                    { label: 'Send', icon: ArrowUp, onClick: onOpenSendModal },
                    { label: 'Receive', icon: ArrowDown, onClick: onOpenSendModal },
                    { label: 'Convert', icon: RefreshCw, onClick: () => onNavigate('transfers') },
                  ].map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <AnimatedButton
                        key={btn.label}
                        variant="glass"
                        size="sm"
                        onClick={btn.onClick}
                        leftIcon={<Icon className="w-3.5 h-3.5" />}
                        className="bg-white/90 text-slate-950 font-semibold shadow-sm"
                      >
                        {btn.label}
                      </AnimatedButton>
                    );
                  })}
                </div>
              </div>

              {/* Chart body with gradient vertical bar */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="font-medium text-slate-600">Performance Index</span>
                  <span className="font-mono">Real-time</span>
                </div>
                <div className="h-40 flex items-end justify-between gap-3">
                  {[40, 65, 85, 55, 75, 90, 60].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="w-full bg-slate-100 rounded-t-xl h-full flex flex-col justify-end overflow-hidden">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.08 }}
                          className={`w-full rounded-t-xl ${
                            i === 2
                              ? 'bg-gradient-to-t from-emerald-400 via-teal-500 to-indigo-600 shadow-lg'
                              : 'bg-slate-200 group-hover:bg-slate-300'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Description & Checkmarks */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Comprehensive <br />
                <span className="text-blue-600">Financial Analytics</span> <br />
                Dashboard
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Gain real-time visibility into your financial performance with intuitive dashboards.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  'Keep tracking balance',
                  'Send money easily',
                  'Receive money easily',
                  'Convert currency',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <AnimatedButton
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('dashboard')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Dashboard
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Card 2: Track Your Expenses with Donut Breakdown */}
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                <span className="text-blue-600">Track</span> Your all the <br />
                Expense Easily
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Effortlessly monitor and manage all your expenses with our intuitive tracking system. Stay on top of your finances by easily recording and categorizing expenses, ensuring you have a clear overview of your spending habits.
              </p>
              <AnimatedButton
                variant="primary"
                size="md"
                onClick={() => onOpenAuth('signup')}
              >
                Get Started
              </AnimatedButton>
            </div>

            {/* Right: Floating iCloud card & Interactive Donut chart */}
            <div className="lg:col-span-7 relative">
              <div className="relative mx-auto max-w-lg">
                {/* Floating iCloud card (Purple) matching screenshot */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="absolute -top-6 left-2 z-20 bg-purple-600 text-white rounded-3xl p-4 shadow-2xl shadow-purple-500/25 w-52 select-none"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ICloudIcon className="w-7 h-7" />
                    <span className="text-xs font-semibold">Icloud</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-black font-mono">$50</div>
                      <div className="text-[10px] text-purple-200">/month</div>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white text-purple-600 flex items-center justify-center shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                </motion.div>

                {/* Expense Donut Breakdown Container */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 pt-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    {/* SVG Donut Chart */}
                    <div className="relative flex items-center justify-center">
                      <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                        {/* Donut rings */}
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                        {/* Blue: Rent & Living (55%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="12"
                          strokeDasharray="238.76"
                          strokeDashoffset="107.4"
                          strokeLinecap="round"
                          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                        />
                        {/* Purple: Transportation (20%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#8B5CF6"
                          strokeWidth="12"
                          strokeDasharray="238.76"
                          strokeDashoffset="191"
                          strokeLinecap="round"
                          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                        />
                        {/* Lime Green: Saving (15%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#D4F74C"
                          strokeWidth="12"
                          strokeDasharray="238.76"
                          strokeDashoffset="202.9"
                          strokeLinecap="round"
                          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                        />
                      </svg>

                      {/* Center Total in Donut */}
                      <div className="absolute text-center">
                        <div className="text-xl font-black text-slate-900 font-mono tracking-tight">
                          ${TOTAL_MONTHLY_EXPENSE.toFixed(2)}
                        </div>
                        <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                          Total Expense
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Items List */}
                    <div className="space-y-3">
                      {EXPENSE_CATEGORIES.map((cat) => (
                        <div
                          key={cat.name}
                          onMouseEnter={() => setActiveDonutHover(cat.name)}
                          onMouseLeave={() => setActiveDonutHover(null)}
                          className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: cat.color }}
                              />
                              <span className="font-semibold text-slate-800">{cat.name}</span>
                            </div>
                            <span className="font-bold text-slate-900 font-mono">
                              ${cat.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECTION: SEND MONEY ACROSS THE GLOBE (3 MOCKUPS)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Send Money <span className="text-blue-600">Across</span> <br />
            the Globe
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Experience seamless global money transfers with our cutting-edge platform. Send money across continents securely.
          </p>
        </div>

        {/* 3 Column Phone / Feature Mockups matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Send 100+ Country */}
          <motion.div
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* Mockup Frame (Soft Sky Blue) */}
            <div className="w-full max-w-[280px] bg-gradient-to-b from-sky-100/70 to-blue-50/50 rounded-3xl p-5 shadow-lg border border-sky-100 flex flex-col justify-between min-h-[340px]">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-800">Country</span>
                  <span className="text-[10px] text-slate-400">100+ available</span>
                </div>

                <div className="space-y-3">
                  {COUNTRIES.slice(0, 3).map((country) => (
                    <button
                      key={country.code}
                      onClick={() => setSelectedCountryCode(country.code)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        selectedCountryCode === country.code
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="text-xs font-semibold text-slate-800">{country.name}</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                        +
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <AnimatedButton
                  variant="blue"
                  size="sm"
                  fullWidth
                  onClick={onOpenSendModal}
                >
                  Send to {COUNTRIES.find((c) => c.code === selectedCountryCode)?.name}
                </AnimatedButton>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">Send 100+ Country</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                Send fiat and digital assets to over 100 countries in seconds with bank-grade security.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Convert 100+ Currency */}
          <motion.div
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* Mockup Frame (Soft Mint Green) */}
            <div className="w-full max-w-[280px] bg-gradient-to-b from-emerald-100/70 to-teal-50/50 rounded-3xl p-5 shadow-lg border border-emerald-100 flex flex-col justify-between min-h-[340px]">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-800">Currency</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Interbank Rate</span>
                </div>

                {/* Symbols Grid $, +, €, £ */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { sym: '$', name: 'USD', active: targetCurrency === 'USD' },
                    { sym: '€', name: 'EUR', active: targetCurrency === 'EUR' },
                    { sym: '£', name: 'GBP', active: targetCurrency === 'GBP' },
                    { sym: '¥', name: 'JPY', active: targetCurrency === 'JPY' },
                  ].map((curr) => (
                    <button
                      key={curr.name}
                      onClick={() => setTargetCurrency(curr.name)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        curr.active
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-sm'
                          : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xl font-bold font-mono">{curr.sym}</span>
                      <span className="text-[10px] text-slate-500">{curr.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-3 p-2 bg-slate-50 rounded-xl text-center">
                  <div className="text-[10px] text-slate-400">1,000 USD =</div>
                  <div className="text-sm font-bold text-slate-900 font-mono">
                    {convertedValue} {targetCurrency}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <AnimatedButton
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => onNavigate('transfers')}
                >
                  Exchange Currency
                </AnimatedButton>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">Convert 100+ Currency</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                Zero markup currency exchange on multi-currency accounts with auto-balancing.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Unlimited Transactions (Add Friends) */}
          <motion.div
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* Mockup Frame (Soft Violet Purple) */}
            <div className="w-full max-w-[280px] bg-gradient-to-b from-purple-100/70 to-indigo-50/50 rounded-3xl p-5 shadow-lg border border-purple-100 flex flex-col justify-between min-h-[340px]">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-800">Add Friends</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Friend profile list */}
                <div className="space-y-2.5">
                  {FRIENDS_CONTACTS.slice(0, 3).map((friend) => (
                    <div
                      key={friend.id}
                      onClick={onOpenSendModal}
                      className="p-2 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${friend.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                          {friend.initials}
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-semibold text-slate-800">{friend.name}</div>
                          <div className="text-[10px] text-slate-400">{friend.handle}</div>
                        </div>
                      </div>
                      <span className="text-xs">{friend.flag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <AnimatedButton
                  variant="purple"
                  size="sm"
                  fullWidth
                  onClick={onOpenSendModal}
                >
                  Quick Send to Friends
                </AnimatedButton>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">Unlimited Transactions</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                Connect your social circle and split bills, rent, or business invoices with 1 tap.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          5. SECTION: ACHIEVE FINANCIAL EXCELLENCE (DUAL CARDS)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Dual 3D Floating Credit Cards */}
            <div className="lg:col-span-6 relative flex justify-center py-6">
              {/* Layered secondary card behind */}
              <div className="absolute top-1 left-8 sm:left-14 w-full max-w-[340px] h-[210px] rounded-3xl bg-gradient-to-br from-indigo-800 to-purple-950 opacity-40 -rotate-6 shadow-xl pointer-events-none" />

              {/* Main Interactive 3D Card */}
              <div className="relative z-10 rotate-3 hover:rotate-0 transition-transform duration-300">
                <InteractiveCard3D card={MOCK_CARDS[0]} />
              </div>
            </div>

            {/* Right: Copy & Feature Points */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Achieve Financial <br />
                <span className="text-blue-600">Excellence</span>
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Effortlessly add your credit or debit card with convenience and simplicity. Our streamlined process makes it easy.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'Receive Money from Card',
                    desc: 'Direct card deposits clear instantly into your high-yield checking balance.',
                  },
                  {
                    title: 'Send Money from Card',
                    desc: 'Spend anywhere Visa and Mastercard are accepted with zero foreign transaction fees.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#D4F74C] text-slate-950 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <AnimatedButton
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('cards')}
                >
                  Manage My Cards
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SECTION: INTEGRATE WITH YOUR FAVORITE TOOLS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text & Explore Button */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                <span className="text-blue-600">Integrate</span> With Your <br />
                Favorite Tools
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Connect your business workflow in seconds. Sync expenses to Notion, get instant Slack payment alerts, and automate receipts with Gmail and Figma.
              </p>
              <AnimatedButton
                variant="primary"
                size="md"
                onClick={() => onNavigate('integrations')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Integration
              </AnimatedButton>
            </div>

            {/* Right: Interactive Node Graph */}
            <div className="lg:col-span-7">
              <IntegrationNetwork onSelectIntegration={() => {}} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. SECTION: CTA BANNER & ACTION CARDS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dark Navy CTA Banner matching screenshot */}
        <div className="relative rounded-3xl bg-[#0F172A] text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-slate-800">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Stack of floating micro-cards matching screenshot */}
            <div className="lg:col-span-5 flex flex-wrap gap-3 items-center justify-center lg:justify-start">
              {/* Mini Spotify */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 w-40 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <SpotifyIcon className="w-5 h-5" />
                  <span className="font-semibold text-white">Spotify</span>
                </div>
                <div className="font-mono font-bold">$13/month</div>
              </div>

              {/* Mini iCloud */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 w-40 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <ICloudIcon className="w-5 h-5" />
                  <span className="font-semibold text-white">iCloud</span>
                </div>
                <div className="font-mono font-bold">$50/month</div>
              </div>

              {/* Mini Balance summary */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 w-full max-w-[280px]">
                <div className="text-[10px] uppercase tracking-wider text-slate-300">Total Monthly Savings</div>
                <div className="text-xl font-bold font-mono text-[#D4F74C] mt-0.5">+$2,832.19</div>
              </div>
            </div>

            {/* Right: Headlines & Bright Blue Button */}
            <div className="lg:col-span-7 space-y-5 lg:pl-6 text-center lg:text-left">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Run your <br />
                Business <span className="text-[#D4F74C]">Better</span> with us
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                Welcome to FinSuite, where financial management meets simplicity and efficiency. Open your account in under 3 minutes.
              </p>
              <div className="pt-2">
                <AnimatedButton
                  variant="blue"
                  size="lg"
                  onClick={() => onOpenAuth('signup')}
                  className="px-8"
                >
                  Get Started
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Big Action Cards: Live Chat (Purple) & Watch Demo (Lime Green) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Electric Purple (Live Chat) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-[#8B5CF6] text-white p-8 sm:p-10 shadow-xl flex flex-col justify-between min-h-[260px] select-none"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Live Chat</h4>
              <p className="text-sm text-purple-100 mt-2 max-w-sm leading-relaxed">
                Connect with a treasury engineer or book a customized corporate consultation.
              </p>
            </div>
            <div className="pt-6">
              <AnimatedButton
                variant="glass"
                size="md"
                onClick={() => onOpenLiveChatModal('booking')}
                className="bg-white/20 hover:bg-white text-purple-900 border-white/30"
              >
                Book a Call
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Card 2: Vibrant Lime Green (Watch a Demo) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-[#D4F74C] text-slate-950 p-8 sm:p-10 shadow-xl flex flex-col justify-between min-h-[260px] select-none"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-950 text-[#D4F74C] flex items-center justify-center mb-6 shadow-sm">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Watch a Demo</h4>
              <p className="text-sm text-slate-800 mt-2 max-w-sm leading-relaxed">
                Take an interactive 60-second interactive tour of the FinSuite treasury platform.
              </p>
            </div>
            <div className="pt-6">
              <AnimatedButton
                variant="primary"
                size="md"
                onClick={onOpenDemoModal}
                leftIcon={<Play className="w-4 h-4 fill-current" />}
                className="bg-slate-950 hover:bg-slate-800 text-white"
              >
                Watch Now
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
