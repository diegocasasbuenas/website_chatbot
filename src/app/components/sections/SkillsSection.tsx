import Typography from "../ui/atoms/text/TypographyAtom";

export default function SkillsSection() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-8">
      <div className="text-center md:text-left">
        <Typography variant="accordion-title">
          Explore Diego&apos;s Skills
        </Typography>
        <Typography variant="body" className="pt-4">
          Click on each node to discover detailed explanations, related
          projects, and the tools behind them.
        </Typography>
      </div>
      <div className="border-1 border-white w-full h-full min-h-96 flex justify-center items-center">
        <Typography variant="body">
          [Interactive Skill Graph Placeholder]
        </Typography>
      </div>
    </div>
  );
}