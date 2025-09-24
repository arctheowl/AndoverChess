import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Andover Chess Club - Hampshire\'s Premier Chess Club',
    short_name: 'Andover Chess',
    description: 'Join Andover Chess Club, Hampshire\'s premier chess club since 1889. We welcome players of all levels for league matches, tournaments, and casual play.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['sports', 'games', 'education'],
    lang: 'en-GB',
    orientation: 'portrait-primary',
  }
}
