# Andover Chess Club Website

A modern, responsive website for the Andover Chess Club built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🏠 **Home Page**
- Hero section with call-to-action buttons
- Features highlighting club benefits
- Meeting times and location information
- Responsive design for all devices

### 📖 **About Page**
- Club history and milestones
- Mission and values
- Committee member profiles
- Club achievements and statistics

### 📅 **Fixtures Page**
- Interactive fixtures and results display
- Filtering by status (upcoming, completed) and type (league, tournament, training)
- Regular schedule information
- Add to calendar functionality

### 👥 **Members Page**
- Member directory with search and filtering
- Committee member profiles
- Member achievements and ratings
- Join the club call-to-action

### 📰 **News Page**
- Latest club news and announcements
- Tournament results and updates
- Category filtering and search
- Newsletter signup

### 📞 **Contact Page**
- Contact form with validation
- Club location and directions
- Multiple contact methods
- FAQ section

### 🎨 **Design Features**
- Responsive design for mobile, tablet, and desktop
- Modern emerald color scheme
- Smooth animations and transitions
- Accessible design with proper contrast
- Mobile-first navigation

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd andover-chess
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Building for Production

```bash
npm run build
# or
yarn build
```
### Running Production Build

```bash
npm start
# or
yarn start
```


5. Match Updates

Fixtures are now automatically updated dynamically from LMS when pages are loaded. No manual updates are required.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── fixtures/          # Fixtures page
│   ├── members/           # Members page
│   ├── news/              # News page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Navigation component
│   └── Footer.tsx         # Footer component
```

## Customization

### Colors
The website uses a custom emerald color scheme. You can modify the colors in the Tailwind configuration or by updating the CSS classes throughout the components.

### Content
All content is currently hardcoded in the components. For a production site, you would want to:
- Connect to a CMS (like Contentful, Strapi, or Sanity)
- Use a database for dynamic content
- Implement an admin panel for content management

### Contact Form
The contact form currently simulates submission. For production, you'll need to:
- Connect to an email service (SendGrid, Mailgun, etc.)
- Add proper form validation
- Implement spam protection

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `out` directory to Netlify

### Other Platforms
The project can be deployed to any static hosting platform that supports Next.js.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions about the Andover Chess Club website, please contact the development team or create an issue in the repository.

---

**Andover Chess Club** - Promoting chess in the Andover community since 1889.
