import { NextResponse } from "next/server";
import { getImagesFromBucket } from "@/src/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bucket: string }> }
) {
  try {
    const { bucket } = await params;
    const images = await getImagesFromBucket(bucket);
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "获取图片失败" }, { status: 500 });
  }
}

