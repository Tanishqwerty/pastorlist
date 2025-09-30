# Safe Secure Trust - Tampa Landing Page

## Project Overview

This is a landing page for Safe Secure Trust, a Tampa-based pilot program designed for senior and executive pastors. The page provides information about a guided, bank-verified trust setup paired with standard insurance products.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### Development

The development server will start on `http://localhost:8080` with hot reloading enabled.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── TampaLandingPage.tsx    # Main landing page component
│   └── ui/                     # Reusable UI components
├── pages/
│   ├── Index.tsx              # Home page
│   └── NotFound.tsx           # 404 page
├── assets/                    # Static assets
├── hooks/                     # Custom React hooks
└── lib/                       # Utility functions
```

## Features

- Responsive design for mobile and desktop
- Contact form with validation and Google Sheets integration
- FAQ section with accordion
- Privacy and NDA information
- Video thumbnail with play button
- Sticky mobile CTA
- Analytics tracking integration
- Automatic form data storage in Google Sheets

## Deployment

This project can be deployed to any static hosting service such as:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the project for production:

```sh
npm run build
```

The built files will be in the `dist/` directory.

## Google Sheets Integration

This project includes automatic form data storage to Google Sheets. When users submit the contact form, their information is automatically saved to a Google Sheet for easy management and follow-up.

### Setup Instructions

1. Follow the detailed setup guide in `GOOGLE_SHEETS_SETUP.md`
2. Create a Google Cloud Project and enable the Sheets API
3. Set up a service account and download the credentials
4. Create a Google Sheet and share it with the service account
5. Configure environment variables in your `.env` file

### Environment Variables Required

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SHEET_NAME=Form Submissions
```

## Contact

For questions about this project, please contact: contact@safesecuretrust.com
