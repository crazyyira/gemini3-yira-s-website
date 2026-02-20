import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  const events = db.prepare("SELECT * FROM events").all();
  return NextResponse.json(events);
}
