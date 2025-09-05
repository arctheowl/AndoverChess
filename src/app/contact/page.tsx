'use client';

import { contactInfo, venueInfo } from '@/data/clubInfo';

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Get in touch with the Andover Chess Club. We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Interactive Map */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold theme-text-primary mb-6">Find Us</h2>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                <div className="h-96 aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.1234567890!2d-1.4764265!3d51.2066594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487407a42719d03d%3A0x2270f2cfe31533b6!2sClare%20Ho%2C%20East%20St%2C%20Andover%20SP10%201EP!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Andover Chess Club Location"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold theme-text-primary mb-1">Andover Chess Club</h3>
                      <p className="theme-text-secondary text-sm">
                        {venueInfo.address}, {contactInfo.address.street}
                      </p>
                      <p className="text-sm theme-text-muted">
                        {contactInfo.address.city}, {contactInfo.address.postcode}
                      </p>
                    </div>
                    <a 
                      href={`https://www.google.com/maps/place/Clare+Ho,+East+St,+Andover+SP10+1EP/@51.2058623,-1.4758018,15.54z/data=!4m6!3m5!1s0x487407a42719d03d:0x2270f2cfe31533b6!8m2!3d51.2066594!4d-1.4764265!16s%2Fg%2F11bw3hsmzk?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Directions
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Directions */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold theme-text-primary">Getting Here</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 100 4 2 2 0 000-4zM16 17a2 2 0 100 4 2 2 0 000-4zM3 12h18l-1.5-6H4.5L3 12zM3 12v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 12h18" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium theme-text-primary mb-1">By Car</h4>
                      <p className="theme-text-secondary text-sm">
                        Free parking available next to the club. Easy access from A303 and A343.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 8l2 2-2 2M11 8l-2 2 2 2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium theme-text-primary mb-1">From Town</h4>
                      <p className="theme-text-secondary text-sm">
                        Andover town centre is a 5-minute walk away.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col mx-auto">
              <h2 className="text-3xl font-bold theme-text-primary mb-6">Get in Touch</h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-800 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold theme-text-primary mb-2">Visit Us</h3>
                    <p className="theme-text-secondary">
                      {contactInfo.address.venue}<br />
                      {contactInfo.address.street}<br />
                      {contactInfo.address.city}, {contactInfo.address.postcode}<br />
                      Hampshire, UK
                    </p>
                    <p className="text-sm theme-text-muted mt-1">
                      Available during club hours 
                      <br />
                      Tuesday 7:00 PM - 10:00 PM
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-800 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold theme-text-primary mb-2">Call Us</h3>
                    <p className="theme-text-secondary">
                      <a href={`tel:${contactInfo.phone}`} className="hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors">
                        {contactInfo.phone}
                      </a>
                    </p>
                    <p className="text-sm theme-text-muted mt-1">
                      Available during club hours
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-800 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold theme-text-primary mb-2">Email Us</h3>
                    <p className="theme-text-secondary">
                      <a href={`mailto:${contactInfo.email}`} className="hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors">
                        {contactInfo.email}
                      </a>
                    </p>
                    {/* <p className="text-sm text-gray-500 mt-1">
                      We'll respond within 24 hours
                    </p> */}
                  </div>
                </div>

                {/* Social Media */}
                {/* <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                    </svg>
                  </div> */}
                  {/* <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                      {contactInfo.socialMedia.facebook && (
                        <a href={contactInfo.socialMedia.facebook} className="text-gray-600 hover:text-emerald-800 transition-colors">
                          <span className="sr-only">Facebook</span>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                      )}
                      {contactInfo.socialMedia.twitter && (
                        <a href={contactInfo.socialMedia.twitter} className="text-gray-600 hover:text-emerald-800 transition-colors">
                          <span className="sr-only">Twitter</span>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      )}
                      {contactInfo.socialMedia.instagram && (
                        <a href={contactInfo.socialMedia.instagram} className="text-gray-600 hover:text-emerald-800 transition-colors">
                          <span className="sr-only">Instagram</span>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721c-.49 0-.875.385-.875.875v7.83c0 .49.385.875.875.875h8.558c.49 0 .875-.385.875-.875v-7.83c0-.49-.385-.875-.875-.875z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-800 pt-5 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
              Quick answers to common questions about joining and participating in our club.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold theme-text-primary mb-2">How do I join the club?</h3>
              <p className="theme-text-secondary">
                Simply come along to any of our sessions! We welcome visitors and new members. 
                You can join on your first visit or contact us beforehand.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold theme-text-primary mb-2">What are the membership fees?</h3>
              <p className="theme-text-secondary">
                Annual membership is £6 for adults, free for juniors (under 18). You are also required to be a member of the Central club.
                Visitors can attend for a few sessions before committing to a membership.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold theme-text-primary mb-2">Do I need to bring my own chess set?</h3>
              <p className="theme-text-secondary">
                No, we provide all equipment including chess sets, clocks, and boards. 
                However, you&apos;re welcome to bring your own if you prefer.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold theme-text-primary mb-2">Are beginners welcome?</h3>
              <p className="theme-text-secondary">
                Absolutely! We have players of all skill levels and offer learning opportunities for beginners. 
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
