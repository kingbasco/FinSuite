import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, Check, Bot, Clock } from 'lucide-react';
import { AnimatedButton } from '../common/AnimatedButton';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'chat' | 'booking';
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'chat',
}) => {
  const [mode, setMode] = useState<'chat' | 'booking'>(defaultMode);
  const [messages, setMessages] = useState<{ id: string; sender: 'agent' | 'user'; text: string; time: string }[]>([
    {
      id: 'm1',
      sender: 'agent',
      text: 'Hello! I am Alex from the FinSuite team. Looking to streamline your business treasury or international transfers?',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Booking states
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thanks for asking! FinSuite offers sub-second settlement in 100+ countries with 0% hidden exchange markups. Would you like me to book a quick 1-on-1 walkthrough with an engineer?";
      if (text.toLowerCase().includes('card')) {
        reply = "Our physical and virtual cards support instant freeze, dynamic CVV security, and multi-currency auto-conversion. You can issue cards instantly!";
      } else if (text.toLowerCase().includes('fee') || text.toLowerCase().includes('price')) {
        reply = "FinSuite has 0 monthly maintenance fees for standard accounts, and zero markup on interbank exchange rates!";
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'agent',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[580px]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                AR
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-700" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-1.5">
                Alex Rivera
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-normal">FinSuite Advisor</span>
              </h3>
              <p className="text-xs text-purple-200">Typically replies in under 1 minute</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="bg-purple-800/80 p-0.5 rounded-xl flex">
              <button
                onClick={() => setMode('chat')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  mode === 'chat' ? 'bg-white text-purple-900 shadow-sm' : 'text-purple-200 hover:text-white'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setMode('booking')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  mode === 'booking' ? 'bg-white text-purple-900 shadow-sm' : 'text-purple-200 hover:text-white'
                }`}
              >
                Book Call
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 flex flex-col justify-between">
          {mode === 'chat' ? (
            <>
              {/* Message List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        m.sender === 'user'
                          ? 'bg-purple-600 text-white rounded-br-none shadow-sm'
                          : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white border border-slate-200 px-3 py-2 rounded-2xl w-24">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              {/* Quick replies */}
              <div className="pt-2 pb-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {['What are the fees?', 'How do virtual cards work?', 'Book 1-on-1 demo'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        if (q === 'Book 1-on-1 demo') {
                          setMode('booking');
                        } else {
                          handleSendMessage(q);
                        }
                      }}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:border-purple-300 hover:bg-purple-50 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white border border-slate-200 rounded-full px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <AnimatedButton
                  variant="purple"
                  size="icon"
                  onClick={() => handleSendMessage()}
                  className="w-10 h-10 rounded-full"
                >
                  <Send className="w-4 h-4" />
                </AnimatedButton>
              </div>
            </>
          ) : (
            /* Booking Consultation Mode */
            <div className="space-y-4 my-auto">
              {bookingSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Consultation Confirmed!</h4>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Calendar invitation sent for <strong>{selectedDate}</strong> with Alex Rivera.
                  </p>
                </div>
              ) : (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Select Preferred Consultation Slot</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      'Tomorrow, 10:00 AM (EST)',
                      'Tomorrow, 2:00 PM (EST)',
                      'Thursday, 11:30 AM (EST)',
                      'Friday, 3:00 PM (EST)',
                    ].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedDate(slot)}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                          selectedDate === slot
                            ? 'border-purple-600 bg-purple-50 text-purple-900 font-semibold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {slot}
                        </span>
                        {selectedDate === slot && <Check className="w-4 h-4 text-purple-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <AnimatedButton
                      variant="purple"
                      size="md"
                      fullWidth
                      onClick={handleConfirmBooking}
                    >
                      Confirm Video Call Reservation
                    </AnimatedButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
