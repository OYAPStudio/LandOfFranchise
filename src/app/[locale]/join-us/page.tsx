import JoinUsHero from '@/components/sections/join-us/hero';
import WhyJoinUs from '@/components/sections/join-us/why-join-us';
// import InvestmentPackages from '@/components/sections/join-us/investment-packages';
// import SupportServices from '@/components/sections/join-us/support-services';
// import ProcessSteps from '@/components/sections/join-us/process-steps';
// import ContactForm from '@/components/sections/join-us/contact-form';

export const metadata = {
  title: 'Join Our Franchise Network',
  description: 'Partner with Land of Franchise and become part of Iraq\'s fastest-growing restaurant franchise network.',
};

export default async function JoinUsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;

  return (
    <main className="flex flex-col items-center justify-between">
      <JoinUsHero locale={locale} />
      <WhyJoinUs locale={locale} />
      {/* <InvestmentPackages locale={locale} />
      <SupportServices locale={locale} />
      <ProcessSteps locale={locale} />
      <ContactForm locale={locale} /> */}
    </main>
  );
}