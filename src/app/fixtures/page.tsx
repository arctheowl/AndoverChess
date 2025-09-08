
import type { Metadata } from "next";
import FixturesClient from './FixturesClient';

export const metadata: Metadata = {
  title: "Chess Fixtures & Events - Andover Chess Club",
  description: "View upcoming chess matches, tournaments, and recent results for Andover Chess Club. Stay updated with our league fixtures and competitive events in Hampshire.",
  keywords: [
    "Andover chess fixtures",
    "chess matches Hampshire",
    "chess tournaments Andover",
    "chess league fixtures",
    "chess events Hampshire",
    "chess results Andover",
    "chess calendar"
  ],
  openGraph: {
    title: "Chess Fixtures & Events - Andover Chess Club",
    description: "View upcoming chess matches, tournaments, and recent results for Andover Chess Club. Stay updated with our league fixtures and competitive events in Hampshire.",
    url: "https://andoverchessclub.co.uk/fixtures",
    images: [
      {
        url: "/AndoverChessLogo.png",
        width: 1200,
        height: 630,
        alt: "Andover Chess Club Fixtures",
      },
    ],
  },
  twitter: {
    title: "Chess Fixtures & Events - Andover Chess Club",
    description: "View upcoming chess matches, tournaments, and recent results for Andover Chess Club. Stay updated with our league fixtures and competitive events in Hampshire.",
    images: ["/AndoverChessLogo.png"],
  },
  alternates: {
    canonical: "/fixtures",
  },
};

export default function FixturesPage() {
  return <FixturesClient />;
}