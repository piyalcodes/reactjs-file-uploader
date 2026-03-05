import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import uploadRoute from "./routes/upload";
import fileList from "./routes/file-list";
import eventsRoute from "./routes/events";
import { startStatusUpdater } from "./routes/status-updator";
import { imagekit } from "./routes/imagekit";
import uploadCompleteRoute from "./routes/upload-complete";

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

//app.route("/upload", uploadRoute);
app.route("/upload", fileList);
app.route("/events", eventsRoute);

app.get("/imagekit/auth", (c) => {
  const authParams = imagekit.getAuthenticationParameters();
  return c.json(authParams);
});

app.route("/complete", uploadCompleteRoute);
/*
app.post("/upload/complete", async (c) => {
  const body = await c.req.json();

  const { fileId, url, name, size, mime } = body;

  // store in DB, attach to user, etc.
  console.log("Upload finished:", body);

  return c.json({ success: true });
}); */

serve({
  fetch: app.fetch,
  port: 3010,
});
