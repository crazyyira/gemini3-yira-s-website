import { NextResponse } from "next/server";
import { deleteImageFromBucket } from "@/src/lib/supabase";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ bucket: string }> }
) {
  try {
    const { bucket } = await params;
    const { fileName } = await request.json();

    if (!fileName) {
      return NextResponse.json({ error: "缺少文件名" }, { status: 400 });
    }

    await deleteImageFromBucket(bucket, fileName);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}

