import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wifi, Copy, Check, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { CardDetails } from '../../types';

interface InteractiveCard3DProps {
  card: CardDetails;
  isInteractive?: boolean;
  onCopySuccess?: (msg: string) => void;
}

export const InteractiveCard3D: React.FC<InteractiveCard3DProps> = ({
  card,
  isInteractive = true,
  onCopySuccess,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 12);
    setRotateY(-(x - centerX) / 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(card.cardNumber);
    setCopied(true);
    if (onCopySuccess) onCopySuccess('Card number copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="perspective-1000 w-full max-w-[380px] h-[230px] select-none cursor-pointer">
      <motion.div
        animate={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => isInteractive && setIsFlipped(!isFlipped)}
        className="w-full h-full relative rounded-3xl shadow-2xl transition-shadow duration-300 transform-style-3d group"
      >
        {/* FRONT OF CARD */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between overflow-hidden backface-hidden bg-gradient-to-br ${card.gradientClass} text-white border border-white/20 shadow-xl`}
        >
          {/* Card background waves / overlay */}
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-black/20 blur-xl pointer-events-none" />
          
          {/* Subtle curved line pattern matching screenshot */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-50,180 Q150,50 350,180 T750,180" fill="none" stroke="white" strokeWidth="2" />
            <path d="M-50,210 Q150,80 350,210 T750,210" fill="none" stroke="white" strokeWidth="1.5" />
            <path d="M-50,150 Q150,20 350,150 T750,150" fill="none" stroke="white" strokeWidth="1" />
          </svg>

          {/* Top Bar: FinSuite brand & Contactless icon */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-sm text-white/90">FinSuite</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">Platinum</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-white/80 rotate-90" />
            </div>
          </div>

          {/* Middle: EMV Chip & Hologram */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Chip */}
            <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-300 via-amber-200 to-yellow-400 border border-amber-400/80 shadow-inner flex flex-col justify-around p-1">
              <div className="w-full h-[1px] bg-amber-600/40" />
              <div className="w-full h-[1px] bg-amber-600/40" />
            </div>
            {card.isFrozen && (
              <span className="bg-red-500/80 backdrop-blur-sm text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Frozen
              </span>
            )}
          </div>

          {/* Bottom: Card Number & Details */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-mono text-lg tracking-[0.2em] font-medium text-white/95 drop-shadow">
                {showFullNumber ? card.cardNumber : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullNumber(!showFullNumber);
                  }}
                  className="p-1 rounded-full hover:bg-white/20 text-white/90 transition-colors"
                  title="Toggle card number visibility"
                >
                  {showFullNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded-full hover:bg-white/20 text-white/90 transition-colors"
                  title="Copy card number"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between text-xs text-white/80">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-white/60">Card Holder</div>
                <div className="font-semibold tracking-wide text-white">{card.holderName}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-wider text-white/60">Expires</div>
                <div className="font-mono font-medium text-white">{card.expiryDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between overflow-hidden backface-hidden rotate-y-180 bg-gradient-to-br ${card.gradientClass} text-white border border-white/20 shadow-xl`}
        >
          {/* Magnetic Stripe */}
          <div className="-mx-6 -mt-1 h-11 bg-slate-950 w-[calc(100%+3rem)]" />

          {/* Signature and CVV */}
          <div className="my-auto space-y-2">
            <div className="flex items-center justify-between text-[10px] text-white/70">
              <span>Authorized Signature</span>
              <span>Security Code (CVV)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-8 bg-white/90 rounded font-serif italic text-slate-800 flex items-center px-3 text-xs select-none">
                {card.holderName}
              </div>
              <div className="w-14 h-8 bg-white rounded font-mono text-slate-900 font-bold flex items-center justify-center text-sm shadow-inner">
                {card.cvv}
              </div>
            </div>
          </div>

          <div className="text-[9px] text-white/60 leading-tight">
            Issued by FinSuite International Bank. For 24/7 client support contact +1 (800) 555-0199 or support@finsuite.com.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
