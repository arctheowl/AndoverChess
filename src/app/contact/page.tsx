import ContactClient from './ContactClient';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Andover Chess Club - Join Us Today",
  description: "Get in touch with Andover Chess Club. Find our location, contact details, and visit us at Clare Ho, East St, Andover. Join Hampshire's premier chess club.",
  keywords: [
    "contact Andover Chess Club",
    "chess club Andover location",
    "join chess club Hampshire",
    "chess club contact details",
    "Andover chess club address",
    "chess club membership"
  ],
  openGraph: {
    title: "Contact Andover Chess Club - Join Us Today",
    description: "Get in touch with Andover Chess Club. Find our location, contact details, and visit us at Clare Ho, East St, Andover. Join Hampshire's premier chess club.",
    url: "https://andoverchessclub.co.uk/contact",
    images: [
      {
        url: "/AndoverChessLogo.png",
        width: 1200,
        height: 630,
        alt: "Contact Andover Chess Club",
      },
    ],
  },
  twitter: {
    title: "Contact Andover Chess Club - Join Us Today",
    description: "Get in touch with Andover Chess Club. Find our location, contact details, and visit us at Clare Ho, East St, Andover. Join Hampshire's premier chess club.",
    images: ["/AndoverChessLogo.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}