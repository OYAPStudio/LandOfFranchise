// src/app/join-us/layout.tsx
import '../globals.css';
import { Inter, Cairo } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({ 
  subsets: ['arabic'], 
  weight: ['400', '700'], 
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata = {
  title: 'Join Our Team - Land of Franchise',
  description: 'Build your career with Iraq\'s leading restaurant group. Explore exciting opportunities and grow with us.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Join Our Team - Land of Franchise',
    description: 'Build your career with Iraq\'s leading restaurant group. Explore exciting opportunities and grow with us.',
    url: 'https://landoffranchise.com/join-us',
    siteName: 'Land of Franchise',
    images: [
      {
        url: '/images/logo/LF.png',
        width: 1200,
        height: 630,
        alt: 'Land of Franchise - Join Our Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function JoinUsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${cairo.variable} overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head />
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* NO HEADER - Completely standalone layout */}
          <div className="min-h-screen font-sans antialiased">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}