import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Plus,
  Filter,
  Download,
  Calendar,
  CreditCard,
  CheckCircle2,
  DollarSign,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Transaction, ActiveScreen } from '../../types';
import { AnimatedButton } from '../common/AnimatedButton';
import { NetflixIcon, SpotifyIcon, ICloudIcon } from '../common/BrandIcons';
import { EXPENSE_CATEGORIES, CHART_DATA_POINTS } from '../../data/mockData';

interface DashboardViewProps {
  balance: number;
  transactions: Transaction[];
  onOpenSendModal: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  onAddTransaction: (tx: Transaction) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  balance,
  transactions,
  onOpenSendModal,
  onNavigate,
  onAddTransaction,
}) => {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(4);

  const filteredTransactions = transactions.filter((tx) => {
    if (filterCategory === 'all') return true;
    return tx.category.toLowerCase() === filterCategory.toLowerCase();
  });

  const handleSimulateBonus = () => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: 'Dividend Payout',
      subtitle: 'FinSuite High-Yield Vault (5.2% APY)',
      category: 'Income',
      amount: 450.00,
      date: 'Just now',
      iconType: 'salary',
      status: 'completed',
    };
    onAddTransaction(newTx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>FinSuite Treasury Console</span>
            <span>·</span>
            <span className="text-slate-500 font-normal">Live Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Financial Analytics Dashboard
          </h1>
        </div>

        {/* Time-Range Selector Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
          {(['1D', '1W', '1M', '1Y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                timeRange === range ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {timeRange === range && (
                <motion.div
                  layoutId="timeRangePill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{range}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Balance (Lime Highlight) */}
        <div className="p-6 rounded-3xl bg-[#D4F74C] text-slate-950 shadow-md border border-lime-300/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Total Balance</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/10 font-bold">Live</span>
            </div>
            <div className="text-3xl font-extrabold font-mono tracking-tight mt-2">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="text-xs text-slate-800 font-medium mt-4 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 stroke-[3]" />
            <span>+28.4% from last period</span>
          </div>
        </div>

        {/* Card 2: Monthly Inflow */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Inflow</span>
              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-2">
              +$7,071.31
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-4 flex items-center gap-1">
            <span className="font-semibold">+3 deposits</span> cleared this week
          </div>
        </div>

        {/* Card 3: Monthly Expenses */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Outflow</span>
              <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-2">
              -$1,928.92
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-4">
            Under monthly target ($2,500.00)
          </div>
        </div>

        {/* Card 4: Active Subscriptions */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Subscriptions</span>
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-2">
              $87.00<span className="text-xs text-slate-400 font-normal">/mo</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>3 subscriptions tracked</span>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AnimatedButton
            variant="blue"
            size="sm"
            onClick={onOpenSendModal}
            leftIcon={<ArrowUp className="w-3.5 h-3.5" />}
          >
            Send Money
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={onOpenSendModal}
            leftIcon={<ArrowDown className="w-3.5 h-3.5" />}
          >
            Request Funds
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={() => onNavigate('transfers')}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Convert FX
          </AnimatedButton>
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={handleSimulateBonus}
            leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-600" />}
          >
            Deposit Yield (+$450)
          </AnimatedButton>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Last refreshed: Just now · SOC2 Secured
        </div>
      </div>

      {/* Charts & Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Historical Chart */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Cash Flow & Liquidity History</h3>
              <p className="text-xs text-slate-500">Monthly aggregate balances and revenue spikes</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                Active Balance
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                Baseline
              </span>
            </div>
          </div>

          {/* Dynamic Interactive SVG Chart */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 pb-2">
            {CHART_DATA_POINTS.map((pt, idx) => {
              const isSelected = hoveredChartPoint === idx;
              return (
                <div
                  key={pt.label}
                  onClick={() => setHoveredChartPoint(idx)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  {/* Tooltip */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-2 px-2.5 py-1 rounded-lg bg-slate-950 text-white text-xs font-mono shadow-xl border border-slate-800"
                    >
                      ${pt.val.toLocaleString()}
                    </motion.div>
                  )}

                  {/* Gradient Bar */}
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: pt.height }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                      className={`w-full rounded-t-xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md ring-2 ring-blue-300'
                          : 'bg-slate-200 group-hover:bg-blue-200'
                      }`}
                    />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isSelected ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                    {pt.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Min: $3,200 (Jan)</span>
            <span className="font-semibold text-slate-800">Average: $5,126 / mo</span>
            <span>Peak: $6,800 (Apr)</span>
          </div>
        </div>

        {/* Expense Category Breakdown */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Spending by Category</h3>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-4">
              {EXPENSE_CATEGORIES.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{cat.name}</span>
                    <span className="font-mono font-bold text-slate-900">${cat.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <div className="text-xs text-slate-500">Total Monthly Spend</div>
            <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">$1,928.92</div>
            <div className="text-[11px] text-emerald-600 mt-1">12% lower than your $2,200 budget ceiling</div>
          </div>
        </div>
      </div>

      {/* Transactions Feed */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <p className="text-xs text-slate-500">Live feed of subscriptions, international wires, and merchant charges</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
            {['all', 'subscription', 'transfer', 'income'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-full capitalize transition-colors cursor-pointer ${
                  filterCategory === cat ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-100">
          <AnimatePresence>
            {filteredTransactions.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-2xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon */}
                    {tx.iconType === 'netflix' && <NetflixIcon className="w-10 h-10" />}
                    {tx.iconType === 'spotify' && <SpotifyIcon className="w-10 h-10" />}
                    {tx.iconType === 'icloud' && <ICloudIcon className="w-10 h-10" />}
                    {tx.iconType === 'salary' && (
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <DollarSign className="w-5 h-5" />
                      </div>
                    )}
                    {tx.iconType === 'transfer' && (
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    )}
                    {tx.iconType === 'dining' && (
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <CreditCard className="w-5 h-5" />
                      </div>
                    )}

                    <div>
                      <div className="text-sm font-semibold text-slate-900">{tx.title}</div>
                      <div className="text-xs text-slate-500">{tx.subtitle}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-sm font-mono font-bold ${isPositive ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {isPositive ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400">{tx.date}</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
