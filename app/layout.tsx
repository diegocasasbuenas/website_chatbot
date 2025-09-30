import type { Metadata, Viewport } from "next";
import ClientRoot from "./ClientRoot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diego - AI Engineer Portfolio",
  description:
    "Portfolio showcasing AI, Machine Learning, and MLOps projects by Diego.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
