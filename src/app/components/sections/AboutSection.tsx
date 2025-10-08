import Image from "next/image";
import AccordionMolecule from "../ui/molecules/AccordionMolecule";

export default function AboutSection() {
  return (
    <div className="w-full h-full border-1 border-white">
      <Image
        src="/images/Portrait.png"
        alt="Profile Picture"
        width={200}
        height={200}
      />
      <AccordionMolecule />
    </div>
  );
}
