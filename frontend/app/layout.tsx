import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATMU Smart UniLibrary",
  description: "Axborot texnologiyalari va menejment universiteti elektron kutubxona platformasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
