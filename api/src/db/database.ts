import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "database.db");

export const db = new Database(dbPath);

// Create table if not exists
db.prepare(
  `CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    size INTEGER,
    mime_type TEXT,
    status TEXT,
    url TEXT,
    uploaded_at TEXT
  )
`,
).run();
