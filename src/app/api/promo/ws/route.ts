export const runtime = "edge";

import { getPromo } from "@/server/promoStore";

export async function GET(req: Request) {
  // @ts-ignore: WebSocketPair tersedia di Edge runtime
  const pair = new WebSocketPair();
  // @ts-ignore
  const [client, server] = Object.values(pair);

  // @ts-ignore
  server.accept();

  const send = () => {
    try {
      // @ts-ignore
      server.send(JSON.stringify(getPromo()));
    } catch (_) {}
  };

  const interval = setInterval(send, 10_000);
  send();

  // @ts-ignore
  server.addEventListener("close", () => clearInterval(interval));
  // @ts-ignore
  server.addEventListener("error", () => clearInterval(interval));

  // @ts-ignore
  return new Response(null, { status: 101, webSocket: client });
}
