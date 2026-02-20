import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "island.db");

declare global {
  var db: Database.Database | undefined;
}

const db = global.db || new Database(dbPath);

if (process.env.NODE_ENV !== "production") global.db = db;

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    time TEXT,
    location TEXT,
    join_link TEXT
  );

  CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty
const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (postCount.count === 0) {
  db.prepare("INSERT INTO posts (content, image_url) VALUES (?, ?)").run(
    "在阳朔的岩壁上，感受指尖与石灰岩的博弈。自由不是无所顾忌，而是有能力选择自己的边界。",
    "https://picsum.photos/seed/climb/800/600"
  );
  db.prepare("INSERT INTO posts (content, image_url) VALUES (?, ?)").run(
    "深夜的 Vibe Coding。代码是逻辑的诗，而 Debug 是与自我的和解。",
    "https://picsum.photos/seed/code/800/600"
  );
}

const eventCount = db.prepare("SELECT COUNT(*) as count FROM events").get() as { count: number };
if (eventCount.count === 0) {
  db.prepare("INSERT INTO events (title, description, time, location, join_link) VALUES (?, ?, ?, ?, ?)").run(
    "深夜读诗会：在雾气中寻找共鸣",
    "带上一首让你心碎或心醉的诗，我们一起在烛光下分享。",
    "2026-03-15 21:00",
    "北京 · 某处隐秘天台",
    "#"
  );
  db.prepare("INSERT INTO events (title, description, time, location, join_link) VALUES (?, ?, ?, ?, ?)").run(
    "Vibe Coding 营地：从 0 到 1 的奇幻构建",
    "不只是写代码，更是在构建属于自己的数字岛屿。",
    "2026-04-10 14:00",
    "线上 · Discord 频道",
    "#"
  );
}

export default db;
