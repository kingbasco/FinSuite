/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveScreen, Transaction } from './types';
import { INITIAL_BALANCE, INITIAL_TRANSACTIONS } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { TransfersView } from './components/views/TransfersView';
import { CardsView } from './components/views/CardsView';
import { IntegrationsView } from './components/views/IntegrationsView';
import { PricingView } from './components/views/PricingView';
import { SendMoneyModal } from './components/modals/SendMoneyModal';
import { DemoModal } from './components/modals/DemoModal';
import { LiveChatModal } from './components/modals/LiveChatModal';
import { AuthModal } from './components/modals/AuthModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('home');
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [liveChatMode, setLiveChatMode] = useState<'chat' | 'booking'>('chat');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (screen: ActiveScreen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenLiveChat = (mode: 'chat' | 'booking' = 'chat') => {
    setLiveChatMode(mode);
    setIsLiveChatOpen(true);
  };

  const handleTransferSuccess = (amount: number, recipientName: string) => {
    setBalance((prev) => Math.max(0, prev - amount));
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `Transfer to ${recipientName}`,
      subtitle: 'FinSuite Instant Settlement',
      category: 'Transfer',
      amount: -amount,
      date: 'Just now',
      iconType: 'transfer',
      status: 'completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
    addToast(
      'Payment Dispatched',
      `Sent $${amount.toFixed(2)} to ${recipientName}. Your balance has been updated.`,
      'success'
    );
  };

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    setBalance((prev) => prev + tx.amount);
    addToast('Transaction Recorded', `${tx.title}: +$${tx.amount.toFixed(2)}`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Bar Contract (1 row, 3 zones) */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area with Screen Transitions */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 14, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1], // Smooth settling curve
            }}
            className="w-full"
          >
            {currentScreen === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onOpenSendModal={() => setIsSendModalOpen(true)}
                onOpenDemoModal={() => setIsDemoModalOpen(true)}
                onOpenLiveChatModal={handleOpenLiveChat}
                onOpenAuth={handleOpenAuth}
                currentBalance={balance}
              />
            )}

            {currentScreen === 'dashboard' && (
              <DashboardView
                balance={balance}
                transactions={transactions}
                onOpenSendModal={() => setIsSendModalOpen(true)}
                onNavigate={handleNavigate}
                onAddTransaction={handleAddTransaction}
              />
            )}

            {currentScreen === 'transfers' && (
              <TransfersView
                currentBalance={balance}
                onOpenSendModal={() => setIsSendModalOpen(true)}
                onShowToast={(title, desc) => addToast(title, desc, 'info')}
              />
            )}

            {currentScreen === 'cards' && (
              <CardsView
                onShowToast={(title, desc) => addToast(title, desc, 'info')}
              />
            )}

            {currentScreen === 'integrations' && (
              <IntegrationsView
                onShowToast={(title, desc) => addToast(title, desc, 'info')}
              />
            )}

            {currentScreen === 'pricing' && (
              <PricingView
                onOpenAuth={handleOpenAuth}
                onShowToast={(title, desc) => addToast(title, desc, 'info')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        onOpenChat={() => handleOpenLiveChat('chat')}
      />

      {/* Global Interactive Modals */}
      <SendMoneyModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        currentBalance={balance}
        onTransferSuccess={handleTransferSuccess}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigateToScreen={(screen) => handleNavigate(screen)}
      />

      <LiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        defaultMode={liveChatMode}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(email) => {
          addToast('Welcome back!', `Signed in as ${email}`);
          handleNavigate('dashboard');
        }}
      />

      {/* Notification Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
