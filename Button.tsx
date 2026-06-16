import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<Props> = ({ children, variant = 'primary', size = 'md', isLoading, leftIcon, fullWidth, className = '', ...props }) => {
  const styles = {
    primary: 'bg-primary-400 hover:bg-primary-500 text-white',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 text-primary-600',
    outline: 'border-2 border-primary-400 text-primary-500 hover:bg-primary-400 hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3' };
  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all disabled:opacity-50 ${styles[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : leftIcon}
      {children}
    </button>
  );
};

export default Button;
