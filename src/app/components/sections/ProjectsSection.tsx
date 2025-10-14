import Image from "next/image";

export default function ProjectsSection() {
  const imageSrc = [
    "/images/projects/1.png",
    "/images/projects/2.png",
    "/images/projects/3.png",
    "/images/projects/4.png",
    "/images/projects/5.png",
    "/images/projects/6.png",
    "/images/projects/7.png",
  ];

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-15 overflow-y-auto">
      {imageSrc.map((src, index) => (
        <div
          key={index}
          className={`relative w-full 4xl:w-3/4 h-[475px] md:aspect-[4/3] lg:aspect-[5/3] xl:h-[900px] 2xl:aspect-auto 2xl:h-[1000px] ${
            index % 2 !== 0 ? "justify-self-end" : "justify-self-start"
          }`}
        >
          <Image
            src={src}
            alt={`Project ${index + 1}`}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}
