'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { contactInfo, clubValues } from '@/data/clubInfo';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/AndoverChessLogo.png"
                  alt="Andover Chess Club Logo"
                  width={32}
                  height={32}
                  className={`logo-transition ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
                />
                <Image
                  src="/AndoverChessLogoDark.png"
                  alt="Andover Chess Club Logo"
                  width={32}
                  height={32}
                  className={`logo-transition absolute inset-0 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
              <span className="font-bold text-xl">Andover Chess Club</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              {clubValues[0].description}
            </p>
            {/* <div className="flex space-x-4">
              {contactInfo.socialMedia.facebook && (
                <a href={contactInfo.socialMedia.facebook} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.twitter && (
                <a href={contactInfo.socialMedia.twitter} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.instagram && (
                <a href={contactInfo.socialMedia.instagram} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721c-.49 0-.875.385-.875.875v7.83c0 .49.385.875.875.875h8.558c.49 0 .875-.385.875-.875v-7.83c0-.49-.385-.875-.875-.875z"/>
                  </svg>
                </a>
              )}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/fixtures" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-400">
              <p>{contactInfo.address.venue}</p>
              <p>{contactInfo.address.street}</p>
              <p>{contactInfo.address.city}, {contactInfo.address.postcode}</p>
              <p className="mt-4">
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                  {contactInfo.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} Andover Chess Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
