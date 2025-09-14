import type { Metadata } from "next";
import "./globals.css";
import BackgroundCanvas from "./components/animations/BackgroundCanvas";
import NoiseOverlay from "./components/animations/NoiseOverlay";

export const metadata: Metadata = {
  title: "Diego - AI Engineer Portfolio",
  description:
    "Portfolio showcasing AI, Machine Learning, and MLOps projects by Diego.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <BackgroundCanvas />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
