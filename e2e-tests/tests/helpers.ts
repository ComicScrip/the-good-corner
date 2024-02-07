import db from "../../backend/src/db";

export async function initDB() {
  await db.initialize();
}

export async function closeDB() {
  await db.destroy();
}
