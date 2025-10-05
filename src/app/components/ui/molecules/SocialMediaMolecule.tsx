import { SiGithub, SiLinkedin } from "react-icons/si";
import GlassContainerAtom from "../atoms/containers/GlassContainerAtom";
import { EnvelopeIcon } from "@heroicons/react/16/solid";

export default function SocialMediaMolecule() {
  return (
    <div className="hidden md:flex md:flex-col gap-4 justify-center items-center">
      <a href="#">
        <GlassContainerAtom variant="icon">
          <SiLinkedin className="text-xl" />
        </GlassContainerAtom>
      </a>
      <a href="#">
        <GlassContainerAtom variant="icon">
          <SiGithub className="text-xl" />
        </GlassContainerAtom>
      </a>
      <a href="#">
        <GlassContainerAtom variant="icon">
          <EnvelopeIcon className="size-5" />
        </GlassContainerAtom>
      </a>
    </div>
  );
}
