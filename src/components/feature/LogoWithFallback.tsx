"use client";

import React from "react";

export default function LogoWithFallback({ name }: { name: string }) {
  const [error, setError] = React.useState(false);
  const [src, setSrc] = React.useState(`/logos/${name}.svg`);
  if (error) {
    return <span className="text-sm text-zinc-500">{name.toUpperCase()}</span>;
  }
  return (
    <img
      src={src}
      alt={name}
      className="h-6 w-auto"
      onError={() => {
        if (src.endsWith('.svg')) {
          setSrc(`/logos/${name}.png`);
        } else {
          setError(true);
        }
      }}
    />
  );
}
