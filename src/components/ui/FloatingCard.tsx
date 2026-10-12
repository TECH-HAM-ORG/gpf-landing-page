import React from 'react';

export interface FloatingCardProps {
  icon?: React.ReactNode;
  title?: string;
  value?: string;
  statusPill?: React.ReactNode;
  statusVariant?: 'emerald' | 'amber' | 'violet';
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function FloatingCard({
  icon,
  title,
  value,
  statusPill,
  statusVariant = 'emerald',
  children,
  className = '',
  hoverEffect = true,
}: FloatingCardProps) {
  const hoverClasses = hoverEffect
    ? 'transition-all duration-300 hover:shadow-xl hover:shadow-violet-900/10 hover:-translate-y-0.5 hover:border-violet-200'
    : '';

  const pillStyles = {
    emerald: 'bg-emerald-50 border border-emerald-200/60 text-emerald-700',
    amber: 'bg-amber-50 border border-amber-200/60 text-amber-700',
    violet: 'bg-violet-50 border border-violet-200/60 text-violet-700',
  }[statusVariant];

  return (
    <div
      className={`rounded-2xl border border-line bg-white p-4 sm:p-5 shadow-card ${hoverClasses} ${className}`.trim()}
    >
      {title || value || icon ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {icon && (
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700 shrink-0">
                  {icon}
                </div>
              )}
              {title && (
                <span className="text-xs font-medium text-slate">{title}</span>
              )}
            </div>
            {statusPill && (
              typeof statusPill === 'string' ? (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold ${pillStyles}`}
                >
                  {statusPill}
                </span>
              ) : (
                statusPill
              )
            )}
          </div>
          {value && (
            <p className="text-base sm:text-lg font-bold font-mono text-ink mt-0.5">{value}</p>
          )}
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
