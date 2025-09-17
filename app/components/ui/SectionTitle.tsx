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
        text-[clamp(45px,7vw,168px)]
        sm:text-[clamp(60px,9vw,168px)]
        md:text-[clamp(80px,11vw,168px)]
        lg:text-[clamp(100px,13vw,168px)]
        xl:text-[168px]
        font-[900] 
        leading-[95%] 
        tracking-[-1px]
        sm:tracking-[-2px]
        md:tracking-[-3px]
        lg:tracking-[-5px]
        xl:tracking-[-8.4px]
        break-words
        hyphens-auto
        overflow-wrap-break-word
        ${className}
      `}
      style={{
        fontFamily: 'var(--font-satoshi)',
        fontWeight: 900,
        lineHeight: '95%',
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      }}
    >
      {children}
    </h1>
  );
}