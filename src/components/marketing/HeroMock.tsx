import Image from "next/image";

export default function HeroMock() {
  return (
    <Image
      src="/hero-invoice-poster.webp"
      alt="Preview kartu invoice UNPAID dengan total Rp 6.650.000"
      width={1920}
      height={1080}
      priority
      className="rounded-2xl shadow-2xl"
    />
  );
}
