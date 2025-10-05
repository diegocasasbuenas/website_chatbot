import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import GlassContainerAtom from "../ui/atoms/containers/GlassContainerAtom";
import Typography from "../ui/atoms/text/TypographyAtom";
import HeaderMolecule from "../ui/molecules/HeaderMolecule";
import InputMolecule from "../ui/molecules/InputMolecule";
import SocialMediaMolecule from "../ui/molecules/SocialMediaMolecule";

export function HeroSection() {
  return (
    <div className="min-h-screen h-screen p-8 md:p-15 flex flex-col justify-between">
      <HeaderMolecule />
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <Typography variant="title" className="relative">
          Diego Casasbuenas
          <span className="absolute top-[30%] right-[5%] block font-general text-[clamp(16px,4vw,80px)] tracking-[clamp(-1px,-0.5vw,-6px)] italic font-light capitalize">
            AI Developer
          </span>
        </Typography>
        <div className="flex gap-2 justify-center items-center w-full">
          <InputMolecule />
          <GlassContainerAtom variant="button" className="rounded-l-lg">
            <PaperAirplaneIcon className="size-6 rotate-[-90deg] text-white" />
          </GlassContainerAtom>
        </div>
      </div>
      <div className="flex justify-center md:justify-between items-end">
        <Typography variant="body" className="">
          Meet the human behind the AI
        </Typography>
        <SocialMediaMolecule />
      </div>
    </div>
  );
}
