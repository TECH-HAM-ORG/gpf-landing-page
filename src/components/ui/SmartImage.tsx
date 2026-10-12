'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface SmartImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  fallbackMonogram?: string;
}

export function SmartImage({
  src,
  alt,
  width,
  height,
  priority,
  className = '',
  fill,
  sizes,
  fallbackMonogram,
  ...props
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  const aspectRatioStyle =
    width && height && !fill ? { aspectRatio: `${width} / ${height}` } : undefined;

  if (hasError || !src) {
    if (fallbackMonogram) {
      return (
        <div
          role="img"
          aria-label={alt}
          className={`flex items-center justify-center rounded-full bg-slate-100 border border-line text-xs font-bold font-display text-slate select-none shrink-0 ${className}`.trim()}
        >
          {fallbackMonogram}
        </div>
      );
    }
    return (
      <div
        role="img"
        aria-label={alt}
        style={aspectRatioStyle}
        className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 via-violet-50 to-indigo-100 border border-violet-200/60 p-6 text-center text-xs font-sans text-violet-700 shadow-inner ${className}`.trim()}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-violet-600/10 text-violet-700 flex items-center justify-center font-bold">
            GPF
          </div>
          <span className="font-sans font-medium text-slate">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
