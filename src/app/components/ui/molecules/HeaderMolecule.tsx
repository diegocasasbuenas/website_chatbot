import { Bars3Icon } from "@heroicons/react/16/solid";
import Image from "next/image";

export default function HeaderMolecule() {
  return (
    <header className="flex justify-between items-center">
      <a href="/">
        <Image
          src="/images/Logo.svg"
          alt="Diego Casasbuenas Logo"
          width={69}
          height={36}
        />
      </a>
      {/* <Bars3Icon className="size-10 cursor-pointer" /> */}
    </header>
  );
}