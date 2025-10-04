import Image from "next/image";
import Typography from "../ui/text/Typography";
import GlassConatainer from "../ui/containers/GlassContainer";
import { Bars3Icon, EnvelopeIcon } from "@heroicons/react/16/solid";
import { SiGithub, SiLinkedin } from "react-icons/si";

export function HeroSection() {
  return (
    <div className="min-h-screen h-screen p-8 md:p-15 flex flex-col justify-between">
      <header className="flex justify-between items-center">
        <a href="/">
          <Image
            src="/images/Logo.svg"
            alt="Diego Casasbuenas Logo"
            width={69}
            height={36}
          />
        </a>
        <Bars3Icon className="size-10 cursor-pointer" />
      </header>
      <Typography variant="title" className="relative">
        Diego Casasbuenas
        <span className="block font-general text-[80px] italic font-light capitalize tracking-[-4px]">
          AI Developer
        </span>
      </Typography>
      <div className="flex justify-between items-end">
        <Typography variant="body" className="">
          Meet the human behind the AI
        </Typography>
        <div className="flex flex-col gap-4 justify-center items-center">
          <a href="#">
            <GlassConatainer variant="icon">
              <SiLinkedin className="text-xl" />
            </GlassConatainer>
          </a>
          <a href="#">
            <GlassConatainer variant="icon">
              <SiGithub className="text-xl" />
            </GlassConatainer>
          </a>
          <a href="#">
            <GlassConatainer variant="icon">
              <EnvelopeIcon className="size-5" />
            </GlassConatainer>
          </a>
        </div>
      </div>
    </div>
  );
}
