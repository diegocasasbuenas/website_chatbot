import { ReactNode } from "react";

// type SectionLayoutProps = {
//   children: ReactNode;
// };

export default function SectionLayout() {
  return (
    <section className="w-full min-h-screen max-h-screen grid grid-cols-[1fr] grid-rows-[60px_1fr] md:grid-cols-[60px_1fr] md:grid-rows-[60px_1fr] border-1">
      <div className="bg-red-500 hidden md:block">Col 1 / Row 1</div>
      <div className="bg-blue-500">Col 2 / Row 1</div>
      <div className="bg-green-500 hidden md:block">Col 1 / Row 2</div>
      <div className="bg-yellow-500">Col 2 / Row 2</div>
    </section>
  );
}
