import { Hono } from "hono";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { db } from "../db/database";

const uploadRoute = new Hono();

uploadRoute.post("/", async (c) => {
  const body = await c.req.parseBody();
  const file = body.file as File;

  if (!file) {
    return c.json({ error: "No file uploaded" }, 400);
  }

  const uploadPath = path.join(process.cwd(), "uploads", file.name);

  const id = crypto.randomUUID();
  db.prepare(
    `
    INSERT INTO files (id, filename, size, mime_type, status, uploaded_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  ).run(
    id,
    file.name,
    file.size,
    file.type,
    "UPLOADING",
    new Date().toISOString(),
  );

  // Create write stream
  const writeStream = fs.createWriteStream(uploadPath);

  // Stream file slowly
  const reader = file.stream().getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    writeStream.write(Buffer.from(value));

    // ⏳ artificial slowdown (tune this)
    await new Promise((r) => setTimeout(r, 2000));
  }

  writeStream.end();

  // Update status when finished
  db.prepare(`UPDATE files SET status = ? WHERE id = ?`).run("COMPLETED", id);

  return c.json({
    message: "File uploaded successfully",
    filename: file.name,
  });
});

export default uploadRoute;
