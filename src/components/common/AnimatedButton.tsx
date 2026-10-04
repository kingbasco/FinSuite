import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'blue' | 'lime' | 'purple' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    // Create subtle tactile ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev.slice(-3), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  // Variant styling
  const variantStyles = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm border border-slate-800/80',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200',
    blue: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 border border-blue-500',
    lime: 'bg-[#D4F74C] text-slate-950 font-semibold hover:bg-[#c6ee38] shadow-md shadow-lime-400/20 border border-lime-400/80',
    purple: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/25 border border-purple-500',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 bg-white/60',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70',
    glass: 'bg-white/80 backdrop-blur-md border border-white/60 text-slate-900 shadow-sm hover:bg-white',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2 font-medium',
    lg: 'text-base px-7 py-3.5 rounded-full gap-2.5 font-semibold',
    icon: 'p-2.5 rounded-full flex items-center justify-center',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.02, y: -1 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`relative overflow-hidden inline-flex items-center justify-center select-none whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${
        disabled || isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      {...props}
    >
      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none bg-white/25 animate-ping"
          style={{
            left: ripple.x - 12,
            top: ripple.y - 12,
            width: 24,
            height: 24,
          }}
        />
      ))}

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
