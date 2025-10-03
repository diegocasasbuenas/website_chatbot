import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h1 
      className={`
        text-white 
        text-[clamp(26px,3.8vw,80px)]
        sm:text-[clamp(36px,5vw,98px)]
        md:text-[clamp(46px,6.2vw,116px)]
        lg:text-[clamp(58px,7.4vw,134px)]
        xl:text-[clamp(68px,8.4vw,150px)]
        2xl:text-[clamp(80px,8.8vw,165px)]
        font-[900] 
        leading-[95%] 
        tracking-[-1px]
        sm:tracking-[-2px]
        md:tracking-[-3px]
        lg:tracking-[-5px]
        xl:tracking-[-8.4px]
        overflow-visible
        ${className}
      `}
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontWeight: 900,
        lineHeight: '95%'
      }}
    >
      {children}
    </h1>
  );
}
