import { ReactNode } from "react";

export default function GlassConatainer({ children }: { children: ReactNode }) {
  return (
    <div
      className="bg-linear-glass-bg border"
    >
      {children}
    </div>
  );
}
