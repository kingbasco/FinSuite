import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe2,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Check,
  Send,
  Plus,
  Clock,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { COUNTRIES, FRIENDS_CONTACTS } from '../../data/mockData';
import { AnimatedButton } from '../common/AnimatedButton';
import { FriendContact } from '../../types';

interface TransfersViewProps {
  currentBalance: number;
  onOpenSendModal: () => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const TransfersView: React.FC<TransfersViewProps> = ({
  currentBalance,
  onOpenSendModal,
  onShowToast,
}) => {
  const [sourceAmount, setSourceAmount] = useState('1200');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [selectedFriend, setSelectedFriend] = useState<FriendContact>(FRIENDS_CONTACTS[2]); // Elena
  const [deliverySpeed, setDeliverySpeed] = useState<'instant' | 'standard'>('instant');

  // Rates
  const getRate = (code: string) => COUNTRIES.find((c) => c.currency === code)?.rateToUSD || 1.0;
  const usdRate = getRate(sourceCurrency);
  const targetRate = getRate(targetCurrency);
  const effectiveRate = targetRate / usdRate;
  const calculatedTargetAmount = (parseFloat(sourceAmount || '0') * effectiveRate).toFixed(2);

  const handleSwapCurrencies = () => {
    const temp = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(temp);
    onShowToast('Currencies inverted', `Now converting ${targetCurrency} to ${temp}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Globe2 className="w-3.5 h-3.5" />
          <span>FinSuite Global Clearing Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Send Money <span className="text-blue-600">Across</span> the Globe
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Experience seamless global money transfers with our cutting-edge platform. Send money across continents securely in seconds.
        </p>
      </div>

      {/* Main Conversion & Transfer Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-8">
        {/* Step 1: Currency inputs */}
        <div className="space-y-4">
          {/* You Send */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">You Send</span>
              <span className="font-mono">Available: ${currentBalance.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <input
                type="number"
                value={sourceAmount}
                onChange={(e) => setSourceAmount(e.target.value)}
                className="w-full bg-transparent text-3xl font-extrabold text-slate-900 focus:outline-none font-mono"
              />
              <select
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 shadow-xs cursor-pointer focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>
          </div>

          {/* Swap Button Divider */}
          <div className="relative flex items-center justify-center -my-2 z-10">
            <motion.button
              whileTap={{ rotate: 180, scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleSwapCurrencies}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:text-blue-600 flex items-center justify-center cursor-pointer transition-colors"
              title="Swap currencies"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Recipient Gets */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
            <div className="flex items-center justify-between text-xs text-blue-700 mb-2">
              <span className="font-semibold uppercase tracking-wider">Recipient Receives</span>
              <span className="font-mono font-medium">Guaranteed Rate (2 hrs)</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-3xl font-extrabold text-blue-900 font-mono">
                {calculatedTargetAmount}
              </div>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 shadow-xs cursor-pointer focus:outline-none"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rate details banner */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span>Interbank Mid-Market Rate</span>
            <span className="font-mono font-bold text-slate-900">
              1 {sourceCurrency} = {effectiveRate.toFixed(4)} {targetCurrency}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>FinSuite Markup & Fees</span>
            <span className="font-mono font-bold text-emerald-600">$0.00 (Zero Fee Guarantee)</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Estimated Delivery</span>
            <span className="font-semibold text-slate-900 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              {deliverySpeed === 'instant' ? 'Instant (< 3 seconds)' : 'Standard (1-2 business hours)'}
            </span>
          </div>
        </div>

        {/* Quick Friends Selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Transfer to Beneficiary
            </span>
            <button
              onClick={onOpenSendModal}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Recipient
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {FRIENDS_CONTACTS.map((friend) => {
              const isSelected = selectedFriend.id === friend.id;
              return (
                <motion.div
                  key={friend.id}
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedFriend(friend)}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${friend.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-xs relative`}>
                    {friend.initials}
                    <span className="absolute -bottom-1 -right-1 text-xs">{friend.flag}</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900 truncate max-w-[80px]">
                      {friend.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400">{friend.country}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <AnimatedButton
          variant="blue"
          size="lg"
          fullWidth
          onClick={onOpenSendModal}
          rightIcon={<Send className="w-4 h-4" />}
        >
          Send {sourceAmount} {sourceCurrency} to {selectedFriend.name}
        </AnimatedButton>
      </div>

      {/* Global Corridor Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[
          {
            title: 'Sub-3 Second Settlement',
            desc: 'Direct rails via FedNow, SEPA Instant, and Faster Payments Service in the UK.',
            icon: Sparkles,
          },
          {
            title: '100+ Currency Pairs',
            desc: 'No expensive conversion tiers. Transact directly in local currency with local clearing.',
            icon: Globe2,
          },
          {
            title: 'Institutional Grade Custody',
            desc: 'Multi-signature vaults, 256-bit AES encryption, and FDIC pass-through insurance up to $2.5M.',
            icon: ShieldCheck,
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#D4F74C]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
