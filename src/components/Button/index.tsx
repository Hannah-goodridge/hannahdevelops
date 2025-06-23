import React from 'react';
import Link from 'next/link';
import { ChevronRight } from '@components/icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight';

  const variantClasses = {
    primary: 'bg-highlight text-white shadow-lg btn-primary-3d',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-6 py-3 text-base rounded-full',
    lg: 'px-8 py-4 text-lg rounded-full'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} role="button">
        {children}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} type="button" {...props}>
      {children}
    </button>
  );
};

export default Button;