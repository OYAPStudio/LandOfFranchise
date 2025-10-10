// src/app/[locale]/join-us/layout.tsx
import '../../globals.css';
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
  title: 'Join Our Franchise Network - Land of Franchise',
  description: 'Partner with Land of Franchise and become part of Iraq\'s fastest-growing restaurant franchise network.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Join Our Franchise Network - Land of Franchise',
    description: 'Partner with Land of Franchise and become part of Iraq\'s fastest-growing restaurant franchise network.',
    url: 'https://landoffranchise.com/join-us',
    siteName: 'Land of Franchise',
    images: [
      {
        url: '/images/logo/LF.png',
        width: 1200,
        height: 630,
        alt: 'Land of Franchise - Join Our Franchise',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function JoinUsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <html 
      lang={locale} 
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
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
          {/* No Header - Full clean layout */}
          <div className="min-h-screen font-sans antialiased">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}