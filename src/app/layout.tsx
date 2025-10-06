import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="no-scrollbar">
      <body className={`bg-linear-to-r from-black to-[#B39065] font-general font-normal text-white`}>
        {children}
      </body>
    </html>
  );
}