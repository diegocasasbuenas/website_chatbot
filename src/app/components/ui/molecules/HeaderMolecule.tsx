import Image from "next/image";
import SocialMediaMolecule from "./SocialMediaMolecule";
import Link from "next/link";

export default function HeaderMolecule() {
  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <Image
          src="/images/Logo.svg"
          alt="Diego Casasbuenas Logo"
          width={69}
          height={36}
        />
      </Link>
      <SocialMediaMolecule />
      {/* <Bars3Icon className="size-10 cursor-pointer" /> */}
    </header>
  );
}
