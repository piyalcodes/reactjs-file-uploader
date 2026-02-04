import { Hono } from "hono";
import Database from "better-sqlite3";

const db = new Database("database.db"); // your SQLite file

const eventsRoute = new Hono();

eventsRoute.get("/", (c) => {
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Send initial DB state immediately
      const files = db.prepare("SELECT * FROM files ORDER BY id DESC").all();
      send({ files });

      // Optional: send updates every 5s (polling)
      const interval = setInterval(() => {
        const latestFiles = db
          .prepare("SELECT * FROM files ORDER BY id DESC")
          .all();
        send({ files: latestFiles });
      }, 5000);

      // Cleanup on client disconnect
      c.req.raw.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
});

export default eventsRoute;
