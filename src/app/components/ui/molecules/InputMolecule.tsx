"use client";

import { useRef } from "react";
import GlassContainerAtom from "../atoms/containers/GlassContainerAtom";

export default function InputMolecule() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <GlassContainerAtom
      variant="input"
      className="w-full max-w-[500px] p-4 rounded-l-4xl rounded-r-none"
      onClick={handleDivClick}
    >
      <input
        id="message-input"
        ref={inputRef}
        type="text"
        placeholder="What would Diego do as your AI copilot?"
        className="w-full outline-none bg-transparent font-general font-normal"
      />
    </GlassContainerAtom>
  );
}
