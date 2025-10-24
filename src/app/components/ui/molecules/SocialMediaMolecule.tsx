import { SiGithub, SiLinkedin } from "react-icons/si";
import GlassContainerAtom from "../atoms/containers/GlassContainerAtom";
import { EnvelopeIcon } from "@heroicons/react/16/solid";

export default function SocialMediaMolecule() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <a href="https://www.linkedin.com/in/diegocasasbuenas-ai/">
        <GlassContainerAtom variant="icon">
          <SiLinkedin className="text-xl" />
        </GlassContainerAtom>
      </a>
      <a href="https://github.com/diegocasasbuenas/">
        <GlassContainerAtom variant="icon">
          <SiGithub className="text-xl" />
        </GlassContainerAtom>
      </a>
      <a href="mailto:diego.cdeaza23@gmail.com">
        <GlassContainerAtom variant="icon">
          <EnvelopeIcon className="size-5" />
        </GlassContainerAtom>
      </a>
    </div>
  );
}
