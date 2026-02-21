import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

// 更新报名信息
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; registrationId: string }> }
) {
  try {
    const { registrationId } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("event_registrations")
      .update(body)
      .eq("id", registrationId)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "更新失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Update registration error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

// 删除报名
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; registrationId: string }> }
) {
  try {
    const { registrationId } = await params;

    const { error } = await supabase
      .from("event_registrations")
      .delete()
      .eq("id", registrationId);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: "删除失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete registration error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

