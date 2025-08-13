import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import InfraHero from "@/components/infrastructure/InfraHero";
import ProviderGrid from "@/components/infrastructure/ProviderGrid";
import RegionLatency from "@/components/infrastructure/RegionLatency";
import SLAStats from "@/components/infrastructure/SLAStats";
import StackTabs from "@/components/infrastructure/StackTabs";
import BackupMatrix from "@/components/infrastructure/BackupMatrix";
import MonitoringGrid from "@/components/infrastructure/MonitoringGrid";
import PipelineSteps from "@/components/infrastructure/PipelineSteps";
import PDFandPayment from "@/components/infrastructure/PDFandPayment";
import ArchitectureDiagram from "@/components/infrastructure/ArchitectureDiagram";
import StatusPanel from "@/components/infrastructure/StatusPanel";
import EdgeRules from "@/components/infrastructure/EdgeRules";
import CostEstimator from "@/components/infrastructure/CostEstimator";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Infrastruktur • Invoice & Receipt Pro",
  description: "Stack, region, SLA, keamanan, backup, monitoring, dan pipeline.",
};

export default function InfrastrukturPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
        <InfraHero />

        {/* NEW: Diagram */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Diagram Arsitektur</h2>
          <ArchitectureDiagram />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Provider & Peran</h2>
          <ProviderGrid />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Region & Latensi</h2>
          <RegionLatency />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">SLA & Target Pemulihan</h2>
          <SLAStats />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Stack Teknis</h2>
          <StackTabs />
        </section>

        {/* NEW: Status realtime */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Status & Kesehatan</h2>
          <StatusPanel />
        </section>

        {/* NEW: Aturan edge */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Aturan Edge/CDN</h2>
          <EdgeRules />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Backup & Retensi</h2>
          <BackupMatrix />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Monitoring</h2>
          <MonitoringGrid />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Pipeline CI/CD</h2>
          <PipelineSteps />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">PDF & Pembayaran</h2>
          <PDFandPayment />
        </section>

        {/* NEW: Estimator biaya */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Estimasi Biaya</h2>
          <CostEstimator />
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="inline-flex items-center gap-3 card-2d px-6 py-4">
            <span className="text-sm text-zinc-500">Siap mencoba infrastruktur ini?</span>
            <Button size="lg"><Link href="/signup?plan=pro">Mulai Pro</Link></Button>
            <Button size="lg" variant="outline"><Link href="/contact">Diskusi Teknis</Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
