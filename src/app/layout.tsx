import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biiio — One link for everything",
  description: "Conectá tus redes, tu portfolio y tus links — todo en una página que se ve increíble.",
  openGraph: {
    title: "Biiio — One link for everything",
    description: "Conectá tus redes, tu portfolio y tus links — todo en una página que se ve increíble.",
    url: "https://biiio.io",
    siteName: "Biiio",
    images: [{ url: "/icon-512.png", width: 900, height: 900 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Biiio — One link for everything",
    description: "Conectá tus redes, tu portfolio y tus links — todo en una página que se ve increíble.",
    images: ["/icon-512.png"],
  },
  manifest: "/manifest.json",
  icons: { icon: "/icon-512.png", apple: "/icon-512.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] antialiased" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
