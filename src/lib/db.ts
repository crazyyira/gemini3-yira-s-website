import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "island.db");
const db = new Database(dbPath);

// 启用 WAL 模式以提高性能
db.pragma("journal_mode = WAL");

export default db;



