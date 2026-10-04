import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { AnimatedButton } from '../common/AnimatedButton';

interface PricingViewProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onOpenAuth, onShowToast }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Starter',
      price: 0,
      annualPrice: 0,
      desc: 'Essential financial management for individuals and freelancers.',
      popular: false,
      features: [
        '1 Multi-currency account (USD/EUR)',
        'Up to 10 zero-fee transfers/month',
        '1 FinSuite physical debit card',
        'Standard expense tracking',
        'Community support',
      ],
      buttonVariant: 'outline' as const,
      buttonText: 'Get Started Free',
    },
    {
      name: 'Pro',
      price: 19,
      annualPrice: 15,
      desc: 'Advanced treasury automation for high-growth modern businesses.',
      popular: true,
      features: [
        'Unlimited global transfers in 100+ currencies',
        'Up to 5 virtual debit cards with instant freeze',
        'Real-time Notion, Slack & Gmail integration',
        'Automated receipt parsing & categorization',
        'Sub-3 second instant settlement rails',
        'Priority 24/7 dedicated chat support',
      ],
      buttonVariant: 'lime' as const,
      buttonText: 'Start 30-Day Pro Trial',
    },
    {
      name: 'Enterprise',
      price: 59,
      annualPrice: 47,
      desc: 'Bespoke liquidity infrastructure with custom API rails and compliance.',
      popular: false,
      features: [
        'Everything in Pro, with unlimited virtual & physical cards',
        'Dedicated treasury account manager',
        'Custom Webhooks & REST API access',
        'Multi-entity & multi-admin role controls',
        'FDIC pass-through custody up to $2.5M',
        '99.99% guaranteed SLA uptime',
      ],
      buttonVariant: 'primary' as const,
      buttonText: 'Contact Sales',
    },
  ];

  const handleSelectPlan = (tierName: string) => {
    onShowToast(`Plan Selected: ${tierName}`, `Redirecting to account setup.`);
    onOpenAuth('signup');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Transparent, <span className="text-blue-600">Predictable</span> Pricing
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          No hidden fees, no foreign transaction markups. Upgrade, downgrade, or cancel anytime.
        </p>

        {/* Billing Cycle Switch */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-slate-900 p-1 flex items-center cursor-pointer transition-colors"
          >
            <motion.div
              layout
              className={`w-5 h-5 rounded-full bg-[#D4F74C] ${isAnnual ? 'ml-auto' : ''}`}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual Billing
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#D4F74C] text-slate-950">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => {
          const currentPrice = isAnnual ? tier.annualPrice : tier.price;
          return (
            <motion.div
              key={tier.name}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-slate-900 text-white shadow-2xl border-2 border-lime-400'
                  : 'bg-white text-slate-900 border border-slate-200/80 shadow-md'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4F74C] text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                </div>
                <p className={`text-xs ${tier.popular ? 'text-slate-300' : 'text-slate-500'} min-h-[36px]`}>
                  {tier.desc}
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold font-mono">${currentPrice}</span>
                    <span className={`text-xs ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>/ month</span>
                  </div>
                  {isAnnual && currentPrice > 0 && (
                    <div className="text-[11px] text-emerald-500 font-medium mt-1">Billed annually (${currentPrice * 12}/yr)</div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/20">
                  <div className={`text-xs font-bold uppercase tracking-wider ${tier.popular ? 'text-slate-300' : 'text-slate-700'}`}>
                    What is included:
                  </div>
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.popular ? 'bg-[#D4F74C] text-slate-950' : 'bg-slate-900 text-white'}`}>
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className={tier.popular ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <AnimatedButton
                  variant={tier.buttonVariant}
                  size="lg"
                  fullWidth
                  onClick={() => handleSelectPlan(tier.name)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {tier.buttonText}
                </AnimatedButton>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Guarantee Banner */}
      <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center gap-3 text-xs text-slate-600 text-center">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>All plans include a 30-day money-back guarantee with zero cancellation fees.</span>
      </div>
    </div>
  );
};
