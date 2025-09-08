import type { Metadata } from "next";
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: "Chess Resources & Links - Andover Chess Club",
  description: "Discover valuable chess resources, learning materials, and useful links for chess players. Find ECF resources, online platforms, training tools, and educational content.",
  keywords: [
    "chess resources",
    "chess learning materials",
    "chess training tools",
    "ECF resources",
    "chess online platforms",
    "chess education",
    "chess software"
  ],
  openGraph: {
    title: "Chess Resources & Links - Andover Chess Club",
    description: "Discover valuable chess resources, learning materials, and useful links for chess players. Find ECF resources, online platforms, training tools, and educational content.",
    url: "https://andoverchessclub.co.uk/resources",
    images: [
      {
        url: "/AndoverChessLogo.png",
        width: 1200,
        height: 630,
        alt: "Chess Resources - Andover Chess Club",
      },
    ],
  },
  twitter: {
    title: "Chess Resources & Links - Andover Chess Club",
    description: "Discover valuable chess resources, learning materials, and useful links for chess players. Find ECF resources, online platforms, training tools, and educational content.",
    images: ["/AndoverChessLogo.png"],
  },
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}