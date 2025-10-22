import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import Typography from "../atoms/text/TypographyAtom";

type MobileSectionNavigationProps = {
  label: string;
  onNavigateUp: () => void;
  onNavigateDown: () => void;
  disableNavigateUp?: boolean;
  disableNavigateDown?: boolean;
};

export default function MobileSectionNavigation({
  label,
  onNavigateUp,
  onNavigateDown,
  disableNavigateUp = false,
  disableNavigateDown = false,
}: MobileSectionNavigationProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 md:hidden">
      <button
        type="button"
        onClick={onNavigateUp}
        aria-label="Scroll to previous section"
        className="flex items-center justify-center rounded-full border border-white/40 p-2 text-white/80 transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/40 disabled:hover:text-white/80"
        disabled={disableNavigateUp}
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>
      <Typography as="h3" className="text-center text-white" aria-live="polite">
        {label}
      </Typography>
      <button
        type="button"
        onClick={onNavigateDown}
        aria-label="Scroll to next section"
        className="flex items-center justify-center rounded-full border border-white/40 p-2 text-white/80 transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/40 disabled:hover:text-white/80"
        disabled={disableNavigateDown}
      >
        <ChevronDownIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
