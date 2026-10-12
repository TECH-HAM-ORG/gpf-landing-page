import React from 'react';
import { SmartImage } from './SmartImage';

export interface BrowserFrameProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  url?: string;
  children?: React.ReactNode;
  className?: string;
  toolbarRight?: React.ReactNode;
}

export function BrowserFrame({
  src,
  alt = 'Browser preview',
  width,
  height,
  priority,
  url = 'backoffice.globpayflow.com',
  children,
  className = '',
  toolbarRight,
}: BrowserFrameProps) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white shadow-[0_20px_50px_-20px_rgba(124,58,237,0.18)] overflow-hidden ${className}`.trim()}
    >
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between border-b border-line bg-soft px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Traffic light window dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
          </div>

          {/* Fake URL pill */}
          <div className="ml-3 flex items-center gap-1.5 rounded-full bg-white border border-line px-3.5 py-1 text-xs font-mono text-slate shadow-2xs">
            <span className="text-muted">https://</span>
            <span className="text-ink font-medium">{url}</span>
          </div>
        </div>

        {toolbarRight && <div className="flex items-center gap-2">{toolbarRight}</div>}
      </div>

      {/* Frame Content */}
      <div className="relative">
        {src ? (
          <SmartImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-auto block"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
