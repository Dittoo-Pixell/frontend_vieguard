import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-[0_4px_16px_rgba(20,30,60,0.06)] transition-all duration-200 ${
        hoverable ? 'hover:shadow-[0_8px_24px_rgba(20,30,60,0.12)] hover:border-[#CBD5E1]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
