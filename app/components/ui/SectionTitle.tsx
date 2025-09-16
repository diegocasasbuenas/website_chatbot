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
        text-[clamp(60px,8vw,168px)]
        sm:text-[clamp(80px,10vw,168px)]
        md:text-[clamp(100px,12vw,168px)]
        lg:text-[clamp(120px,14vw,168px)]
        xl:text-[168px]
        font-[900] 
        leading-[100%] 
        tracking-[-2px]
        sm:tracking-[-3px]
        md:tracking-[-4px]
        lg:tracking-[-6px]
        xl:tracking-[-8.4px]
        ${className}
      `}
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontWeight: 900,
        lineHeight: '100%'
      }}
    >
      {children}
    </h1>
  );
}