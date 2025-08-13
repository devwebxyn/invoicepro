// Update the import path if the Accordion components are located elsewhere, for example:
import Accordion, { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function PricingFAQ() {
  return (
  <Accordion className="w-full">
      <AccordionItem value="1" trigger="Bagaimana sistem penagihannya?">
        Tagihan otomatis tiap periode. Bisa upgrade/downgrade kapan saja; prorata dihitung otomatis.
      </AccordionItem>
      <AccordionItem value="2" trigger="Apakah ada biaya transaksi pembayaran?">
        Biaya gateway mengikuti penyedia (mis. QRIS/VA/eWallet/kartu). Kami tidak menambahkan markup tersembunyi.
      </AccordionItem>
      <AccordionItem value="3" trigger="Bisa custom domain & template PDF?">
        Bisa di paket Business atau lewat add-on. Tim kami bantu setup.
      </AccordionItem>
      <AccordionItem value="4" trigger="Apakah bisa dibatalkan kapan saja?">
        Bisa. Layanan berjalan sampai akhir periode aktif, lalu tidak diperpanjang.
      </AccordionItem>
    </Accordion>
  );
}
