import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import StatsSection from '@/components/sections/stats';
import Restaurants from '@/components/sections/restaurants';
import WorldMap from '@/components/sections/locations';
import CompanyHistory from '@/components/sections/company-history';

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  // Await the params since it's now a Promise in Next.js App Router
  const { locale } = await params;

  return (
    <main className="flex flex-col items-center justify-between">
      <Hero locale={locale} />
      <About locale={locale} />
      <StatsSection locale={locale} />
      <CompanyHistory locale={locale} />
      <WorldMap locale={locale} />
      <Restaurants locale={locale} />
    </main>
  );
}