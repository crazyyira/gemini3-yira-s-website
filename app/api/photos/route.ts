import { NextResponse } from "next/server";
import { getPhotos } from "@/src/lib/supabase";

export async function GET() {
  try {
    const photos = await getPhotos();
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json({ error: "获取照片失败" }, { status: 500 });
  }
}

