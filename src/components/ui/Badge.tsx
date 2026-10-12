import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  dot?: boolean;
  variant?: 'violet' | 'purple' | 'cyan' | 'emerald' | 'slate';
  className?: string;
}

export function Badge({
  children,
  dot = false,
  variant = 'violet',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    violet: 'bg-violet-50 text-violet-700 border-violet-200/60',
    purple: 'bg-violet-50 text-violet-700 border-violet-200/60',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  }[variant] || 'bg-violet-50 text-violet-700 border-violet-200/60';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-sans border ${variantStyles} ${className}`.trim()}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-violet-600 animate-pulse shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
