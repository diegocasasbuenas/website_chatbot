"use client";

import { useState } from "react";
import Typography from "../atoms/text/TypographyAtom";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

export type AccordionItem = {
  title: string;
  content: string;
};

type AccordionMoleculeProps = {
  items: AccordionItem[];
};

export default function AccordionMolecule(props: AccordionMoleculeProps) {
  const { items } = props;
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => setOpenIndex(index);

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index}>
          <div
            className="flex justify-between py-4 border-b-1 border-b-white cursor-pointer"
            onClick={() => toggle(index)}
          >
            <Typography variant="accordion-title">{item.title}</Typography>
            {openIndex === index ? (
              <MinusIcon className="h-6 w-6 text-white" />
            ) : (
              <PlusIcon className="h-6 w-6 text-white" />
            )}
          </div>
          {openIndex === index && (
            <Typography variant="body" className="pt-4">{item.content}</Typography>
          )}
        </div>
      ))}
    </div>
  );
}
