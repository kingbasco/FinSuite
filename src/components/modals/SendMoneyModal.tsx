import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FRIENDS_CONTACTS, COUNTRIES } from '../../data/mockData';
import { AnimatedButton } from '../common/AnimatedButton';
import { FriendContact } from '../../types';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onTransferSuccess: (amount: number, recipientName: string) => void;
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onTransferSuccess,
}) => {
  const [selectedFriend, setSelectedFriend] = useState<FriendContact>(FRIENDS_CONTACTS[0]);
  const [amount, setAmount] = useState('250');
  const [note, setNote] = useState('Dinner split & cloud server bill');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#D4F74C', '#8B5CF6', '#10B981'],
      });
      onTransferSuccess(parseFloat(amount) || 0, selectedFriend.name);
    }, 1200);
  };

  const handleReset = () => {
    setStep('input');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleReset}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Instant Global Transfer</h3>
              <p className="text-xs text-slate-500">Zero fees between FinSuite accounts</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
              >
                {/* Select Recipient */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Select Recipient
                  </label>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {FRIENDS_CONTACTS.map((friend) => {
                      const isSelected = selectedFriend.id === friend.id;
                      return (
                        <motion.button
                          key={friend.id}
                          whileTap={{ scale: 0.92 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setSelectedFriend(friend)}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border min-w-[76px] transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${friend.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-sm relative`}>
                            {friend.initials}
                            <span className="absolute -bottom-1 -right-1 text-xs">{friend.flag}</span>
                          </div>
                          <span className="text-[11px] font-medium text-slate-800 truncate max-w-[65px]">
                            {friend.name.split(' ')[0]}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Transfer Amount
                    </label>
                    <span className="text-xs text-slate-500 font-mono">
                      Available: ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-2xl font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-9 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-mono"
                    />
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      aria-label="Currency"
                      className="absolute right-3 bg-white border border-slate-200 text-xs font-semibold text-slate-700 py-1.5 px-2.5 rounded-xl cursor-pointer"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Payment Note
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's this for?"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Protected by FinSuite 256-bit instant clearing & biometric authorization.</span>
                </div>

                <AnimatedButton
                  variant="blue"
                  size="lg"
                  fullWidth
                  onClick={() => setStep('confirm')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Review
                </AnimatedButton>
              </motion.div>
            )}

            {step === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
              >
                <div className="text-center py-4 bg-slate-50 rounded-3xl border border-slate-200/80">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Total Transfer</span>
                  <div className="text-4xl font-extrabold text-slate-900 mt-1 font-mono">
                    ${parseFloat(amount || '0').toFixed(2)}
                  </div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">Zero Network Fee Applied</div>
                </div>

                <div className="space-y-2 text-sm bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Recipient</span>
                    <span className="font-semibold text-slate-900">{selectedFriend.name} ({selectedFriend.handle})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Destination</span>
                    <span className="text-slate-900">{selectedFriend.flag} {selectedFriend.country}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Speed</span>
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Instant (Under 3 seconds)
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Memo</span>
                    <span className="text-slate-800 italic font-mono text-xs">{note}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <AnimatedButton
                    variant="outline"
                    size="md"
                    onClick={() => setStep('input')}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    Back
                  </AnimatedButton>
                  <AnimatedButton
                    variant="blue"
                    size="md"
                    onClick={handleSend}
                    isLoading={isProcessing}
                    className="flex-[2]"
                  >
                    Confirm & Send ${parseFloat(amount || '0').toFixed(2)}
                  </AnimatedButton>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Transfer Completed!</h4>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Successfully dispatched <strong>${amount}</strong> to{' '}
                  <strong>{selectedFriend.name}</strong>. Funds are available instantly.
                </p>
                <div className="p-3 bg-slate-50 rounded-2xl text-xs font-mono text-slate-600">
                  Transaction Reference: FIN-{Date.now().toString().slice(-8)}
                </div>
                <AnimatedButton
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleReset}
                >
                  Done
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
