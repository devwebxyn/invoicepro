import ClientLogo from "./LogoWithFallback";

const logos = ["qris","bca","bni","bri","mandiri","ovo","dana","shopeepay","linkaja","gopay","visa","mastercard"];

export default function IntegrationsGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {logos.map((n) => (
        <div key={n} className="gborder p-3 flex items-center justify-center">
          <ClientLogo name={n} />
        </div>
      ))}
    </div>
  );
}
