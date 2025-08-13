export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="blob absolute -top-10 -left-10 w-72 h-72 rounded-full bg-indigo-400/40" />
      <div className="blob absolute top-40 -right-10 w-80 h-80 rounded-full bg-violet-400/40" />
    </div>
  );
}
