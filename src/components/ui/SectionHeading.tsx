import React from 'react';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  badge?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCentered = align === 'center';
  const tagText = eyebrow || badge;

  return (
    <div
      className={`max-w-3xl ${isCentered ? 'text-center mx-auto' : 'text-left'} ${className}`.trim()}
    >
      {tagText && (
        <div className={`mb-3 ${isCentered ? 'flex justify-center' : ''}`}>
          <Badge dot>{tagText}</Badge>
        </div>
      )}
      <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-ink leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg text-slate max-w-2xl leading-relaxed ${
            isCentered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
