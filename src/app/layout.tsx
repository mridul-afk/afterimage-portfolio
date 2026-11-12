
import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  "https://afterimage-portfolio-lyart.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    "Mridul Bajpai | AI Research, Graphics & Systems Engineering",

  description:
    "Explore the work and curiosity of Mridul Bajpai: C++, CUDA, machine learning systems, artificial intelligence research, real-time graphics, OpenGL, Vulkan, and creative coding.",

  applicationName: "Mridul Bajpai",

  openGraph: {
    type: "website",
    url: SITE_URL,
    title:
      "Mridul Bajpai | AI Research, Graphics & Systems Engineering",
    description:
      "Curiosity, intelligence, systems, and graphics. A cinematic portfolio by Mridul Bajpai.",
    siteName: "Mridul Bajpai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mridul Bajpai — AI Research and Graphics Engineering",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mridul Bajpai | AI Research & Graphics",
    description:
      "Exploring intelligence, computation, graphics, and engineering from first principles.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
