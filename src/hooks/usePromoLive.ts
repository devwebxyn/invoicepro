"use client";

import { useEffect, useState } from "react";
import type { PromoData } from "@/server/promoStore";

export function usePromoLive() {
  const [data, setData] = useState<PromoData | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let es: EventSource | null = null;
    let stopped = false;

    const connectSSE = () => {
      es = new EventSource("/api/promo/sse");
      es.onmessage = (e) => setData(JSON.parse(e.data));
      es.onerror = () => { es?.close(); if (!stopped) setTimeout(connectSSE, 5000); };
    };

    const connectWS = () => {
      try {
        const proto = location.protocol === "https:" ? "wss" : "ws";
        ws = new WebSocket(`${proto}://${location.host}/api/promo/ws`);
        ws.onmessage = (e) => setData(JSON.parse(e.data));
        ws.onclose = () => !stopped && connectSSE();
        ws.onerror = () => { ws?.close(); !stopped && connectSSE(); };
      } catch {
        connectSSE();
      }
    };

    connectWS();
    return () => { stopped = true; ws?.close(); es?.close(); };
  }, []);

  return data;
}
