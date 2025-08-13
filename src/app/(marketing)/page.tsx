import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/marketing/Hero";
import Logos from "@/components/marketing/Logos";
import Features from "@/components/marketing/Features";
import ShowcaseInvoice from "@/components/marketing/ShowcaseInvoice";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import CTA from "@/components/marketing/CTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black">
      <Header />
      <Hero />
      <Logos />
      <Features />
      <ShowcaseInvoice />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
