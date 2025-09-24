import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Andover Chess Club - Hampshire's Premier Chess Club Since 1889",
    template: "%s | Andover Chess Club"
  },
  description: "Join Andover Chess Club, Hampshire's premier chess club since 1889. We welcome players of all levels for league matches, tournaments, and casual play. Located in Andover, Hampshire.",
  keywords: [
    "Andover Chess Club",
    "Hampshire chess",
    "chess club Andover",
    "chess tournaments Hampshire",
    "chess league Hampshire",
    "chess lessons Andover",
    "chess community Hampshire",
    "English Chess Federation",
    "chess beginners",
    "chess coaching"
  ],
  authors: [{ name: "Andover Chess Club" }],
  creator: "Andover Chess Club",
  publisher: "Andover Chess Club",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://andoverchessclub.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Andover Chess Club - Hampshire's Premier Chess Club",
    description: "Join Andover Chess Club, Hampshire's premier chess club since 1889. We welcome players of all levels for league matches, tournaments, and casual play.",
    url: 'https://andoverchessclub.co.uk',
    siteName: 'Andover Chess Club',
    images: [
      {
        url: '/AndoverChessLogo.png',
        width: 1200,
        height: 630,
        alt: 'Andover Chess Club Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Andover Chess Club - Hampshire's Premier Chess Club",
    description: "Join Andover Chess Club, Hampshire's premier chess club since 1889. We welcome players of all levels for league matches, tournaments, and casual play.",
    images: ['/AndoverChessLogo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Andover Chess Club",
    "alternateName": "Andover Chess Club",
    "url": "https://andoverchessclub.co.uk",
    "logo": "https://andoverchessclub.co.uk/AndoverChessLogo.png",
    "description": "Hampshire's premier chess club since 1889, welcoming players of all levels for league matches, tournaments, and casual play.",
    "foundingDate": "1889",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Clare Ho, East St",
      "addressLocality": "Andover",
      "addressRegion": "Hampshire",
      "postalCode": "SP10 1EP",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-1234-567890",
      "contactType": "General Inquiry",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/andoverchessclub",
      "https://twitter.com/andoverchess"
    ],
    "sport": "Chess",
    "memberOf": {
      "@type": "Organization",
      "name": "English Chess Federation"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
