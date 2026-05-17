// Gradient button component with hover effects
import { motion } from 'motion/react';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled,
  type = 'button',
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4',
  };

  const baseClasses = 'rounded-lg font-medium transition-all duration-300 relative overflow-hidden';

  if (variant === 'primary') {
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={`${baseClasses} ${sizeClasses[size]} bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseClasses} ${sizeClasses[size]} bg-secondary border border-purple-500/30 text-foreground hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Made with Bob
