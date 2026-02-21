import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "获取失败" }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, time, location, join_link } = await request.json();

    if (!title || !description || !time || !location) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("events")
      .insert([{ title, description, time, location, join_link }])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "创建失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
