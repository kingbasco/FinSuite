import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CreditCard,
  Plus,
  Shield,
  Lock,
  Unlock,
  Sliders,
  Eye,
  Globe2,
  Zap,
  CheckCircle2,
  Copy,
  AlertTriangle
} from 'lucide-react';
import { CardDetails } from '../../types';
import { MOCK_CARDS } from '../../data/mockData';
import { InteractiveCard3D } from '../common/InteractiveCard3D';
import { AnimatedButton } from '../common/AnimatedButton';

interface CardsViewProps {
  onShowToast: (title: string, desc?: string) => void;
}

export const CardsView: React.FC<CardsViewProps> = ({ onShowToast }) => {
  const [cards, setCards] = useState<CardDetails[]>(MOCK_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string>(MOCK_CARDS[0].id);

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const handleToggleFreeze = () => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === selectedCard.id ? { ...c, isFrozen: !c.isFrozen } : c
      )
    );
    const newStatus = !selectedCard.isFrozen;
    onShowToast(
      newStatus ? 'Card Frozen' : 'Card Unfrozen',
      newStatus
        ? 'Transactions are now temporarily blocked for security.'
        : 'Your card is active and ready for purchases.'
    );
  };

  const handleLimitChange = (newLimit: number) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === selectedCard.id ? { ...c, dailyLimit: newLimit } : c
      )
    );
  };

  const handleIssueVirtualCard = () => {
    const newCard: CardDetails = {
      id: `c-${Date.now()}`,
      cardNumber: `4111 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      holderName: 'John Carter',
      expiryDate: '10/29',
      cvv: String(Math.floor(100 + Math.random() * 900)),
      cardType: 'FinSuite Cyber Blue',
      gradientClass: 'from-blue-600 via-sky-600 to-indigo-800',
      balance: 1500.00,
      isFrozen: false,
      dailyLimit: 1500,
      spentToday: 0
    };
    setCards((prev) => [newCard, ...prev]);
    setSelectedCardId(newCard.id);
    onShowToast('New Virtual Card Created', `Virtual card ending in ${newCard.cardNumber.slice(-4)} is ready.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>FinSuite Card Vault</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Smart Cards & Security Controls
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Click any card to flip and inspect CVV. Customize spending limits and freeze controls in real-time.
          </p>
        </div>

        <AnimatedButton
          variant="primary"
          size="md"
          onClick={handleIssueVirtualCard}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Issue Virtual Card
        </AnimatedButton>
      </div>

      {/* Main Grid: Card Showcase & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: 3D Card Stage */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-6">
          {/* Card Selector Pills */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-full border border-slate-200">
            {cards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setSelectedCardId(c.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  c.id === selectedCard.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Card {i + 1} (···{c.cardNumber.slice(-4)})
              </button>
            ))}
          </div>

          {/* 3D Interactive Card */}
          <div className="py-4">
            <InteractiveCard3D
              card={selectedCard}
              onCopySuccess={(msg) => onShowToast('Card Copied', msg)}
            />
          </div>

          <p className="text-xs text-slate-400 text-center flex items-center gap-1.5">
            <span>💡 Tip: Click card to flip and reveal security details</span>
          </p>

          {/* Quick Stats for this card */}
          <div className="w-full max-w-sm grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Card Balance</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                ${selectedCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Spent Today</div>
              <div className="text-lg font-bold font-mono text-blue-600 mt-0.5">
                ${selectedCard.spentToday.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security Controls & Preferences */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{selectedCard.cardType}</h3>
              <p className="text-xs text-slate-500">Card ending in ···{selectedCard.cardNumber.slice(-4)}</p>
            </div>
            <div className="flex items-center gap-2">
              <AnimatedButton
                variant={selectedCard.isFrozen ? 'blue' : 'outline'}
                size="sm"
                onClick={handleToggleFreeze}
                leftIcon={selectedCard.isFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                className={selectedCard.isFrozen ? '' : 'text-rose-600 border-rose-200 hover:bg-rose-50'}
              >
                {selectedCard.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
              </AnimatedButton>
            </div>
          </div>

          {/* Daily Spending Limit Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 uppercase tracking-wider">
                Daily Spending Limit
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                ${selectedCard.dailyLimit.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={selectedCard.dailyLimit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$500 min</span>
              <span>Spent today: ${selectedCard.spentToday.toFixed(2)}</span>
              <span>$10,000 max</span>
            </div>
          </div>

          {/* Feature toggles */}
          <div className="space-y-3 pt-2">
            {[
              {
                title: 'Online Purchases',
                desc: 'Allow virtual transactions and e-commerce checkouts',
                enabled: true,
              },
              {
                title: 'International Roaming',
                desc: 'Zero-fee card usage across overseas POS terminals',
                enabled: true,
              },
              {
                title: 'ATM Cash Withdrawals',
                desc: 'Allow PIN withdrawals at all global ATM networks',
                enabled: false,
              },
              {
                title: 'Dynamic CVV Refresh',
                desc: 'Auto-regenerate 3-digit CVV code every 24 hours',
                enabled: true,
              },
            ].map((setting, idx) => (
              <div
                key={setting.title}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="pr-4">
                  <div className="text-xs font-bold text-slate-900">{setting.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{setting.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={setting.enabled}
                    onChange={() => onShowToast('Security Setting Updated', `${setting.title} preference saved.`)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
