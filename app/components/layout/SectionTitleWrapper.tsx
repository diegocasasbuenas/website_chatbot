import { ReactNode } from 'react';
import { SectionTitle } from '../ui';

interface SectionTitleWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitleWrapper({ children, className = '' }: SectionTitleWrapperProps) {
  return (
    <div className={`hidden md:block self-start ${className}`}>
      <SectionTitle>{children}</SectionTitle>
    </div>
  );
}
