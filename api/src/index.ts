import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import uploadRoute from "./routes/upload";
import fileList from "./routes/file-list";
import eventsRoute from "./routes/events";
import { startStatusUpdater } from "./routes/status-updator";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);
startStatusUpdater();

app.get("/", (c) => c.text("Hono API is running"));

app.route("/upload", uploadRoute);
app.route("/upload", fileList);
app.route("/events", eventsRoute);

serve({
  fetch: app.fetch,
  port: 3010,
});
