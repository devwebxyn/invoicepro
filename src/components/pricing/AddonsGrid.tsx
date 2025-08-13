import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const addons = [
  { t: "Custom Domain", d: "Gunakan domainmu untuk halaman invoice publik.", p: "Rp 49.000/bln" },
  { t: "Template PDF Kustom", d: "Desain khusus sesuai brand perusahaan.", p: "Mulai Rp 299.000" },
  { t: "WhatsApp Reminder", d: "Notifikasi WA otomatis saat jatuh tempo.", p: "Rp 99.000/bln" },
  { t: "Export Otomatis ke Drive", d: "Arsip PDF terupload otomatis ke Google Drive.", p: "Rp 39.000/bln" },
];

export default function AddonsGrid() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {addons.map((x) => (
        <Card key={x.t} className="card-2d">
          <CardContent className="p-6">
            <div className="font-medium">{x.t}</div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{x.d}</p>
            <div className="mt-3 text-sm text-zinc-500">{x.p}</div>
            <Button variant="outline" className="mt-4 w-full">Tambah</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
