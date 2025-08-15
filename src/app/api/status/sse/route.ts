export const runtime = "edge";

import { getStatus } from "@/server/statusSource";

export async function GET() {
  const enc = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const push = () => controller.enqueue(enc.encode(`data: ${JSON.stringify(getStatus())}\n\n`));
      const id = setInterval(push, 1000);
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
