import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
  return NextResponse.json(posts);
}
