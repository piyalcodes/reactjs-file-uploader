import Database from "better-sqlite3";

const db = new Database("database.db");

// Define possible statuses

const statuses = ["PROCESSING", "COMPLETED", "FAILED"] as const;
type Status = (typeof statuses)[number];

// Function to randomly pick a status
function getRandomStatus(): Status {
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Background updater function
export function startStatusUpdater(intervalMs = 3000) {
  setInterval(() => {
    try {
      // Get all files
      const files = db.prepare("SELECT id FROM files").all();

      // Update each file randomly
      const updateStmt = db.prepare("UPDATE files SET status = ? WHERE id = ?");
      const updateTransaction = db.transaction((fileIds: { id: string }[]) => {
        for (const file of fileIds) {
          const newStatus = getRandomStatus();
          updateStmt.run(newStatus, file.id);
        }
      });

      updateTransaction(files);
      console.log(
        `Updated ${files.length} files at ${new Date().toISOString()}`,
      );
    } catch (err) {
      console.error("Error updating file statuses:", err);
    }
  }, intervalMs);
}

// Start the background updater
startStatusUpdater();
