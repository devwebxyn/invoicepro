import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import AboutSubnav from "@/components/about/AboutSubnav";
import DevHero from "@/components/about/DevHero";
import DevStats from "@/components/about/DevStats";
import DevSkills from "@/components/about/DevSkills";
import DevTimeline from "@/components/about/DevTimeline";
import DevProjects from "@/components/about/DevProjects";
import TechToolbox from "@/components/about/TechToolbox";
import DevSocial from "@/components/about/DevSocial";

export const metadata = {
  title: "Developers • Invoice & Receipt Pro",
  description:
    "Profil developer: Samuel Indra Bastian — Full-stack developer (mandiri), XI EIA Semester 2, Teknik Elektronika Industri.",
};

export default function DevelopersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samuel Indra Bastian",
    jobTitle: "Full-stack Developer (Mandiri)",
    description: "Kelas XI EIA (Semester 2), Teknik Elektronika Industri.",
    url: "https://example.com/about/developers",
    worksFor: { "@type": "Organization", name: "Invoice & Receipt Pro" },
    knowsAbout: ["Next.js","React","Tailwind","Appwrite","Payments","PDF Generation"],
  };

  return (
    <>
      <Header />
      <AboutSubnav />
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
        <section id="overview" className="scroll-mt-24">
          <DevHero />
          <DevStats />
        </section>

        <section id="skills" className="scroll-mt-24">
          <DevSkills />
        </section>

        <section id="timeline" className="scroll-mt-24">
          <DevTimeline />
        </section>

        <section id="projects" className="scroll-mt-24">
          <DevProjects />
        </section>

        <section id="toolbox" className="scroll-mt-24">
          <TechToolbox />
        </section>

        <section id="contact" className="scroll-mt-24">
          <DevSocial />
        </section>
      </main>
      <Footer />

      {/* SEO JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
