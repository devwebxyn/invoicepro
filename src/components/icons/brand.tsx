// src/components/icons/brand.tsx
import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

export function GoogleIcon({ size = 16, ...props }: Props) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden {...props}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 31.9 29.3 35 24 35c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.5 3.1 29.6 1 24 1 11.8 1 2 10.8 2 23s9.8 22 22 22c11.3 0 21-8.2 21-22 0-1.7-.2-3.4-.4-5.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 16 19 13 24 13c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.5 3.1 29.6 1 24 1 15 1 7.3 6.2 3.6 14.1z"/>
      <path fill="#4CAF50" d="M24 45c5.1 0 9.7-1.9 13.1-5.1l-6-4.9C29.1 36.7 26.7 37.6 24 37.6c-5.2 0-9.6-3.4-11.1-8.1l-6.6 5.1C9.9 40.9 16.4 45 24 45z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.7 4.1-5.9 7-11.3 7-5.2 0-9.6-3.4-11.1-8.1l-6.6 5.1C9.9 40.9 16.4 45 24 45c11.3 0 21-8.2 21-22 0-1.7-.2-3.4-.4-5.5z"/>
    </svg>
  );
}

export function FacebookIcon({ size = 16, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...props}>
      <path fill="#1877F2" d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.09 10.125 24v-8.41H7.078V12.07h3.047V9.412c0-3.017 1.792-4.687 4.533-4.687 1.312 0 2.686.235 2.686.235v2.98h-1.513c-1.49 0-1.954.93-1.954 1.887v2.243h3.328l-.532 3.518h-2.796V24C19.612 23.09 24 18.1 24 12.073z"/>
      <path fill="#fff" d="M16.671 15.59l.532-3.518h-3.328V9.829c0-.957.464-1.887 1.954-1.887h1.513V4.962s-1.374-.235-2.686-.235c-2.74 0-4.533 1.67-4.533 4.687v2.657H7.078v3.115h3.047V24h3.75v-8.41h2.796z"/>
    </svg>
  );
}

export function XIcon({ size = 16, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...props}>
      <path fill="currentColor" d="M18.244 2H21l-6.52 7.45L22.5 22h-6.91l-4.61-6.02L5.6 22H3l7.12-8.15L1.5 2h6.91l4.2 5.62L18.244 2Zm-2.43 18.1h1.91L7.27 3.86H5.29l10.525 16.24Z"/>
    </svg>
  );
}
