import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  const stories = db.prepare("SELECT * FROM guestbook ORDER BY created_at DESC").all();
  return NextResponse.json(stories);
}

export async function POST(request: Request) {
  const { name, message } = await request.json();
  if (!name || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  db.prepare("INSERT INTO guestbook (name, message) VALUES (?, ?)").run(name, message);
  return NextResponse.json({ success: true });
}
