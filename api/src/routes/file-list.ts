import { Hono } from "hono";
import { db } from "../db/database";

const fileList = new Hono();

fileList.get("/", async (c) => {
  const files = db
    .prepare(
      `
    SELECT * FROM files
    ORDER BY uploaded_at DESC
  `,
    )
    .all();

  return c.json(files);
});

export default fileList;
