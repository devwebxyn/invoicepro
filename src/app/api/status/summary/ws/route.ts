export const runtime = "edge";

import { getStatus } from "@/server/statusSource";

export async function GET() {
  // @ts-ignore
  const pair = new WebSocketPair();
  // @ts-ignore
  const [client, server] = Object.values(pair);
  // @ts-ignore
  server.accept();

  const tick = () => {
    try {
      // @ts-ignore
      server.send(JSON.stringify(getStatus()));
    } catch {}
  };
  const id = setInterval(tick, 1000);
  tick();

  // @ts-ignore
  server.addEventListener("close", () => clearInterval(id));
  // @ts-ignore
  server.addEventListener("error", () => clearInterval(id));

  // @ts-ignore
  return new Response(null, { status: 101, webSocket: client });
}
