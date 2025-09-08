'use client';

import { fixtures } from '@/data/fixtures';
import { clubStats, venueInfo, contactInfo } from '@/data/clubInfo';

export default function SEOStructuredData() {
  // Get upcoming events for structured data
  const upcomingEvents = fixtures
    .filter(fixture => fixture.status === 'upcoming')
    .slice(0, 5); // Limit to next 5 events

  const eventsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Upcoming Chess Events",
    "description": "Upcoming chess matches and tournaments at Andover Chess Club",
    "numberOfItems": upcomingEvents.length,
    "itemListElement": upcomingEvents.map((fixture, index) => ({
      "@type": "Event",
      "position": index + 1,
      "name": `${fixture.homeTeam} vs ${fixture.awayTeam}`,
      "description": `${fixture.competition} - ${fixture.venue === 'home' ? 'Home' : 'Away'} match`,
      "startDate": `${fixture.date}T${fixture.time}:00`,
      "endDate": `${fixture.date}T${parseInt(fixture.time.split(':')[0]) + 2}:${fixture.time.split(':')[1]}:00`,
      "location": {
        "@type": "Place",
        "name": fixture.venue === 'home' ? venueInfo.name : fixture.location || 'Away Venue',
        "address": fixture.venue === 'home' ? {
          "@type": "PostalAddress",
          "streetAddress": venueInfo.address,
          "addressLocality": "Andover",
          "addressRegion": "Hampshire",
          "postalCode": "SP10 1EP",
          "addressCountry": "GB"
        } : undefined
      },
      "organizer": {
        "@type": "Organization",
        "name": "Andover Chess Club",
        "url": "https://andoverchessclub.co.uk"
      },
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    }))
  };

  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "name": "Andover Chess Club",
    "description": "Hampshire's premier chess club since 1895, welcoming players of all levels for league matches, tournaments, and casual play.",
    "url": "https://andoverchessclub.co.uk",
    "logo": "https://andoverchessclub.co.uk/AndoverChessLogo.png",
    "image": "https://andoverchessclub.co.uk/AndoverChessLogo.png",
    "foundingDate": "1895",
    "sport": "Chess",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Clare Ho, East St",
      "addressLocality": "Andover",
      "addressRegion": "Hampshire",
      "postalCode": "SP10 1EP",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.2066594",
      "longitude": "-1.4764265"
    },
    "telephone": contactInfo.phone,
    "email": contactInfo.email,
    "openingHours": "Tu 19:00-22:00",
    "priceRange": "£",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Bank Transfer",
    "memberOf": {
      "@type": "Organization",
      "name": "English Chess Federation"
    },
    "sameAs": [
      "https://www.facebook.com/andoverchessclub",
      "https://twitter.com/andoverchess"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://andoverchessclub.co.uk"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventsStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}
