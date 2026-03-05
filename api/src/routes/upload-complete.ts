import { Hono } from "hono";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { db } from "../db/database";

const uploadCompleteRoute = new Hono();

uploadCompleteRoute.post("/", async (c) => {
  const body = await c.req.json();

  const { fileId, url, name, size, mime } = body;

  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO files (id, filename, size, mime_type, status, url, uploaded_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  ).run(id, name, size, mime, "UPLOADING", url, new Date().toISOString());

  return c.json({ success: true });

  return c.json({
    message: "File uploaded successfully",
    filename: name,
  });
});

export default uploadCompleteRoute;
