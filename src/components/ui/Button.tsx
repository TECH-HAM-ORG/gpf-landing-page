import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  isExternal,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isExt = Boolean(external || isExternal);

  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-4 py-1.5 gap-1.5 min-h-[34px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[42px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
  }[size];

  const variantStyles = {
    primary:
      'bg-brand-gradient text-white shadow-card hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0',
    secondary:
      'bg-white border border-line text-violet-700 hover:bg-violet-50 hover:border-violet-200 active:bg-violet-100 shadow-2xs',
    outline:
      'bg-transparent border border-line text-slate hover:text-ink hover:bg-soft active:bg-slate-100',
    ghost:
      'bg-transparent text-slate hover:text-ink hover:bg-soft active:bg-slate-100',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    if (isExt) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
