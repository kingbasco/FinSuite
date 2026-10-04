import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Play, Pause, CheckCircle2, ChevronRight, Sparkles, TrendingUp, Globe2, CreditCard } from 'lucide-react';
import { AnimatedButton } from '../common/AnimatedButton';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen?: (screen: any) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onNavigateToScreen }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const demoSteps = [
    {
      title: 'Unified Balance & Instant Analytics',
      subtitle: 'See real-time aggregate liquidity, projected runway, and monthly earnings.',
      icon: TrendingUp,
      previewBadge: 'Real-time Sync',
      mockMetrics: [
        { label: 'Active Balance', value: '$9,823.28', delta: '+28.4%' },
        { label: 'Extra Earned This Month', value: '+$2,832.19', delta: 'High Yield' },
        { label: 'Avg Monthly Burn', value: '$1,928.92', delta: '-12.2%' },
      ],
    },
    {
      title: 'Global Payments in 100+ Currencies',
      subtitle: 'Send money instantly across 100+ countries with interbank zero-markup rates.',
      icon: Globe2,
      previewBadge: 'Sub-3s Settlement',
      mockMetrics: [
        { label: 'Exchange Rate', value: '1.00 USD = 0.92 EUR', delta: 'Real-time' },
        { label: 'Transfer Fee', value: '$0.00', delta: '100% Free' },
        { label: 'Instant Settlement', value: '2.4 seconds', delta: 'SEPA & FedNow' },
      ],
    },
    {
      title: 'Smart Corporate & Personal Cards',
      subtitle: 'Issue physical & virtual debit cards with instant 3D freeze controls and custom limits.',
      icon: CreditCard,
      previewBadge: 'Dynamic Security',
      mockMetrics: [
        { label: 'Active Cards', value: '3 Active Cards', delta: 'Multi-Currency' },
        { label: 'Card Spend Today', value: '$412.50', delta: 'Within $2,500 limit' },
        { label: 'Security State', value: 'Biometric Protected', delta: 'Zero Fraud Guarantee' },
      ],
    },
  ];

  // Auto progression when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % demoSteps.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, demoSteps.length]);

  if (!isOpen) return null;

  const currentStepData = demoSteps[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 25 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative z-10 w-full max-w-3xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4F74C] text-slate-950 flex items-center justify-center font-bold">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">FinSuite Interactive Product Tour</h3>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-lime-400/20 text-[#D4F74C]">
                  Live Walkthrough
                </span>
              </div>
              <p className="text-xs text-slate-400">Experience how modern teams manage cash flow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Interactive Simulation Stage */}
        <div className="p-6">
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-6 md:p-8 min-h-[300px] flex flex-col justify-between overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#D4F74C]/10 blur-3xl pointer-events-none" />

            {/* Stage Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SIMULATED LIVE DEMO · STEP {activeStep + 1} OF {demoSteps.length}
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Tour' : 'Resume Tour'}</span>
              </button>
            </div>

            {/* Stage Main Feature Showcase */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 my-4 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <StepIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{currentStepData.title}</h4>
                  <p className="text-sm text-slate-400 max-w-lg mt-0.5">{currentStepData.subtitle}</p>
                </div>
              </div>

              {/* Metric Cards in Simulation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {currentStepData.mockMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-sm"
                  >
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">{metric.label}</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">{metric.value}</div>
                    <div className="text-xs text-[#D4F74C] font-medium mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {metric.delta}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tour Timeline Progress */}
            <div className="relative z-10 pt-4 space-y-2">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-[#D4F74C] transition-all duration-100 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {demoSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveStep(idx);
                      setProgress(0);
                    }}
                    className={`text-left text-xs p-2 rounded-lg transition-colors cursor-pointer ${
                      activeStep === idx
                        ? 'bg-slate-800 text-white font-semibold border-b-2 border-[#D4F74C]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {idx + 1}. {step.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-[#D4F74C]" />
            <span>Ready to explore the live interface yourself?</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-white border-slate-700 hover:bg-slate-800 flex-1 sm:flex-none"
            >
              Close
            </AnimatedButton>
            <AnimatedButton
              variant="lime"
              size="sm"
              onClick={() => {
                onClose();
                if (onNavigateToScreen) onNavigateToScreen('dashboard');
              }}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="flex-1 sm:flex-none"
            >
              Launch Live App
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
