import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

// 获取个人资料
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "获取失败" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

// 更新个人资料
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, avatar_url, tags, bio_paragraph_1, bio_paragraph_2, bio_quote } = body;

    const { data, error } = await supabase
      .from("profile")
      .update({
        name,
        avatar_url,
        tags,
        bio_paragraph_1,
        bio_paragraph_2,
        bio_quote,
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "更新失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}



