import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestige Properties Dubai",
  description: "Luxury real estate platform with admin CMS and block builder."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <a
          href="https://wa.me/971568236024"
          target="_blank"
          aria-label="Chat on WhatsApp"
          className="fixed right-4 bottom-4 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg"
        >
          WA
        </a>
      </body>
    </html>
  );
}
