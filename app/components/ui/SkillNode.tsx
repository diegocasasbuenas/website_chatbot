"use client";

import React from "react";

interface SkillNodeProps {
  title?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  size?: number;
}

export function SkillNode({
  title,
  onClick,
  className = "",
  children,
  style,
  size = 75,
}: SkillNodeProps) {
  const glassStyle = {
    border: "1px solid rgba(255, 255, 255, 0.25)",
    background: "linear-gradient(91deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.05) 100%)",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(12px)",
  } as const;

  const resolvedSize = size;
  const fontSize = Math.max(Math.min(resolvedSize * 0.22, 18), 12);

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-full
        font-medium cursor-pointer
        transition-all duration-200 ease-out
        hover:scale-105 hover:bg-white/15 hover:shadow-lg hover:shadow-white/10 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${className}
      `}
      style={{
        ...glassStyle,
        ...style,
        position: "absolute",
        width: resolvedSize,
        height: resolvedSize,
        flexShrink: 0,
      }}
      onClick={onClick}
    >
      <span
        className="text-white text-center font-general font-medium whitespace-nowrap px-1"
        style={{ fontSize }}
      >
        {title || children}
      </span>
    </div>
  );
}
