import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { Chatbot } from "@/components/chatbot";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingDockDemo from "@/components/floating-dock-demo";
import HomeHeroSection from "@/sections/HomeHeroSection";
import Aurora from "@/components/Aurora";
import { PROFILE } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import { MotionProvider } from "@/components/motion-provider";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} | ${PROFILE.role}`,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.siteDescription,
  openGraph: {
    title: `${PROFILE.name} | ${PROFILE.role}`,
    description: PROFILE.siteDescription,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} ${jetbrainsMono.variable} bg-white antialiased dark:bg-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider>
            <MotionProvider>
              <div className="relative mx-auto h-full min-h-screen w-full">
                <div className="relative h-80 w-full md:h-90">
                  <Aurora
                    colorStops={["#ff6a00", "#ffb347", "#7b2ff7"]}
                    amplitude={3.0}
                    blend={1}
                    height={0.5}
                    speed={1.65}
                    glow={3}
                    scale={0.35}
                    brightness={1}
                    layers={1}
                    direction="top"
                    opacity={1}
                    mouseInteraction
                    intro
                    lightMode={false}
                  />
                </div>
                <div className="relative mx-auto h-full w-full max-w-4xl px-0 pt-0 md:px-8 md:pb-0">
                  <HomeHeroSection />
                  {children}
                  <Footer />
                </div>
              </div>
              <Toaster position="top-center" />
              <Chatbot />
              <FloatingDockDemo />
            </MotionProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
