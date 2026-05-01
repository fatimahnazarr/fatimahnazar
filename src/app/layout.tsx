import type { Metadata } from "next";
import "./globals.css";
import Cursor       from "@/components/layout/Cursor";
import Navbar       from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider }     from '@/context/AuthContext';

export const metadata: Metadata = {
  title:       "Fatimah Nazar — UI/UX Designer & Front-End Developer",
  description: "Portfolio of Fatimah Nazar — UI/UX Designer, Front-End Developer, and Author based in Baghdad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
  <LanguageProvider>
    <Cursor />
    <Navbar />
    <SmoothScroll>
      {children}
    </SmoothScroll>
  </LanguageProvider>
</AuthProvider>
      </body>
    </html>
  );
}