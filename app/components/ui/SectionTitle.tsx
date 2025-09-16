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
        text-[clamp(50px,7vw,168px)]
        sm:text-[clamp(70px,9vw,168px)]
        md:text-[clamp(90px,11vw,168px)]
        lg:text-[clamp(110px,13vw,168px)]
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