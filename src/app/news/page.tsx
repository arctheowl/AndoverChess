import type { Metadata } from "next";
import NewsClient from './NewsClient';

export const metadata: Metadata = {
  title: "Chess News & Updates - Andover Chess Club",
  description: "Stay updated with the latest news, tournament results, and announcements from Andover Chess Club. Read about our recent matches, upcoming events, and club achievements.",
  keywords: [
    "Andover chess news",
    "chess club updates",
    "chess tournament results",
    "chess announcements",
    "Hampshire chess news",
    "chess club achievements"
  ],
  openGraph: {
    title: "Chess News & Updates - Andover Chess Club",
    description: "Stay updated with the latest news, tournament results, and announcements from Andover Chess Club. Read about our recent matches, upcoming events, and club achievements.",
    url: "https://andoverchessclub.co.uk/news",
    images: [
      {
        url: "/AndoverChessLogo.png",
        width: 1200,
        height: 630,
        alt: "Andover Chess Club News",
      },
    ],
  },
  twitter: {
    title: "Chess News & Updates - Andover Chess Club",
    description: "Stay updated with the latest news, tournament results, and announcements from Andover Chess Club. Read about our recent matches, upcoming events, and club achievements.",
    images: ["/AndoverChessLogo.png"],
  },
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  return <NewsClient />;
}