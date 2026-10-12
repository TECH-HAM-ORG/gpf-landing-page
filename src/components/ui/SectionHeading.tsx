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
      <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-bold font-display tracking-[-0.03em] text-ink leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-[19px] text-[#475569] max-w-2xl leading-[1.6] font-sans font-normal ${
            isCentered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
