import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

// 获取首页内容
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      // 如果没有数据，返回默认值
      return NextResponse.json({
        main_title: "小黑的奇幻岛屿",
        main_subtitle: "在岩壁上寻找自由，在代码中构建万物",
        left_card_title: "山海之息",
        left_card_description: "在崎岖的岩壁上寻找自由的支点，在深邃的海底听见心跳的回响。",
        right_card_title: "灯火之境",
        right_card_description: "一盏复古台灯，一行跳动的代码，在寂静的深夜构建属于未来的碎片。",
        bottom_text: "连接有趣的人，一起 Vibe Coding，一起坠入山海。",
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get hero content error:", error);
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}

// 更新首页内容
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      main_title,
      main_subtitle,
      left_card_title,
      left_card_description,
      right_card_title,
      right_card_description,
      bottom_text,
    } = body;

    // 先检查是否有记录
    const { data: existing } = await supabase
      .from("hero_content")
      .select("id")
      .single();

    let result;
    if (existing) {
      // 更新现有记录
      const { data, error } = await supabase
        .from("hero_content")
        .update({
          main_title,
          main_subtitle,
          left_card_title,
          left_card_description,
          right_card_title,
          right_card_description,
          bottom_text,
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // 插入新记录
      const { data, error } = await supabase
        .from("hero_content")
        .insert([
          {
            main_title,
            main_subtitle,
            left_card_title,
            left_card_description,
            right_card_title,
            right_card_description,
            bottom_text,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Update hero content error:", error);
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

