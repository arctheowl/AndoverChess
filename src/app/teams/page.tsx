import type { Metadata } from "next";
import TeamsClient from './TeamsClient';

export const metadata: Metadata = {
  title: "Chess Teams - Andover Chess Club League Teams",
  description: "Meet Andover Chess Club's competitive teams competing in Hampshire chess leagues. View team standings, upcoming matches, and recent results for our A, B, and C teams.",
  keywords: [
    "Andover chess teams",
    "chess league teams Hampshire",
    "chess team standings",
    "chess team matches",
    "Hampshire chess league",
    "chess team results"
  ],
  openGraph: {
    title: "Chess Teams - Andover Chess Club League Teams",
    description: "Meet Andover Chess Club's competitive teams competing in Hampshire chess leagues. View team standings, upcoming matches, and recent results for our A, B, and C teams.",
    url: "https://andoverchessclub.co.uk/teams",
    images: [
      {
        url: "/AndoverChessLogo.png",
        width: 1200,
        height: 630,
        alt: "Andover Chess Club Teams",
      },
    ],
  },
  twitter: {
    title: "Chess Teams - Andover Chess Club League Teams",
    description: "Meet Andover Chess Club's competitive teams competing in Hampshire chess leagues. View team standings, upcoming matches, and recent results for our A, B, and C teams.",
    images: ["/AndoverChessLogo.png"],
  },
  alternates: {
    canonical: "/teams",
  },
};

export default function TeamsPage() {
  return <TeamsClient />;
}