
"use client";


export default function Marquee() {
  const logos = [
    { src: "/logos/qris.svg", alt: "QRIS" },
    { src: "/logos/bca.svg", alt: "BCA" },
    { src: "/logos/bni.svg", alt: "BNI" },
    { src: "/logos/bri.svg", alt: "BRI" },
    { src: "/logos/mandiri.svg", alt: "Mandiri" },
    { src: "/logos/ovo.png", alt: "OVO" },
    { src: "/logos/dana.svg", alt: "DANA" },
    { src: "/logos/shopeepay.svg", alt: "ShopeePay" },
    { src: "/logos/linkaja.svg", alt: "LinkAja" },
    { src: "/logos/gopay.svg", alt: "GoPay" },
    { src: "/logos/visa.svg", alt: "Visa" },
    { src: "/logos/mastercard.svg", alt: "Mastercard" },
  ];
  const loop = [...logos, ...logos];
  return (
    <div className="print:hidden bg-zinc-50 dark:bg-zinc-900/50 py-6">
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {loop.map((l, i) => (
            <div key={i} className="logo-pill flex items-center gap-3">
              <img
                src={l.src}
                alt={l.alt}
                style={{ maxWidth: '80px', maxHeight: '32px', minWidth: '40px', minHeight: '20px' }}
                onError={e => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                  if (el.parentElement) {
                    el.parentElement.innerHTML = `<span style="color: #6b7280; font-size: 14px;">${l.alt}</span>`;
                  }
                }}
                onLoad={e => {
                  console.log(`Logo loaded: ${l.alt}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
