import { NextResponse } from "next/server";
import { deletePhoto } from "@/src/lib/supabase";

export async function DELETE(request: Request) {
  try {
    const { fileName } = await request.json();

    if (!fileName) {
      return NextResponse.json({ error: "缺少文件名" }, { status: 400 });
    }

    await deletePhoto(fileName);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}

