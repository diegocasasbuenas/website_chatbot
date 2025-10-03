import Image from "next/image";
import Typography from "../ui/text/Typography";
import { Bars3Icon } from "@heroicons/react/16/solid";
import GlassConatainer from "../ui/containers/GlassContainer";

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
        <Bars3Icon className="size-12 cursor-pointer" />
      </header>
      <Typography variant="title" className="relative">
        Diego Casasbuenas
        <Typography
          variant="subtitle"
          className="!text-[80px] italic font-general font-light capitalize !tracking-[-4px]"
        >
          {/* <Typography variant="subtitle" className="!text-[80px] italic font-general font-light capitalize !tracking-[-4px] absolute top-20 right-15"> */}
          AI Developer
        </Typography>
      </Typography>
      <div className="flex justify-between items-end">
        <Typography variant="body" className="">
          Meet the human behind the AI
        </Typography>
        <GlassConatainer>
            <p>Hola</p>
        </GlassConatainer>
      </div>
    </div>
  );
}
