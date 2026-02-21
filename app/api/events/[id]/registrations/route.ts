import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

// 获取指定活动的所有报名
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("event_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "获取失败" }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Get registrations error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

// 创建新报名
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, contact, notes } = await request.json();

    if (!name || !contact) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id: parseInt(id),
          name,
          contact,
          notes: notes || null,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "报名失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Create registration error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

