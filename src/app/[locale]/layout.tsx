// app/[locale]/layout.tsx
import '../globals.css';
import { Inter, Cairo } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/sections/footer';

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
  title: {
    default: 'Land of Franchise',
    template: '%s | Land of Franchise',
  },
  description: 'Global franchise network expanding worldwide.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Land of Franchise',
    description: 'Join the global franchise movement with us.',
    url: 'https://landoffranchise.com',
    siteName: 'Land of Franchise',
    images: [
      {
        url: '/images/logo/LF.png',
        width: 1200,
        height: 630,
        alt: 'Land of Franchise logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
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
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen font-sans antialiased">
            <Header locale={locale} />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}