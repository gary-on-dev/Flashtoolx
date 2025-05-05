import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button',
  icon,
  className = '',
  size = 'medium',
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };
  
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
  };
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed hover:bg-none pointer-events-none' 
    : '';
  
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${widthStyles} ${className}`}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;