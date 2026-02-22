import { NextResponse } from "next/server";
import { uploadImageToBucket } from "@/src/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ bucket: string }> }
) {
  try {
    const { bucket } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "没有文件" }, { status: 400 });
    }

    const data = await uploadImageToBucket(bucket, file);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "上传失败" }, { status: 500 });
  }
}

