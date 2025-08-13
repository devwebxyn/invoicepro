export const runtime = "edge";

import { getPromo } from "@/server/promoStore";

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const push = () => controller.enqueue(encoder.encode(`data: ${JSON.stringify(getPromo())}\n\n`));
      const id = setInterval(push, 10_000);
      push();
      return () => clearInterval(id);
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
