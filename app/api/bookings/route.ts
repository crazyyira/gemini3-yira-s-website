import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

// 获取已预约的时间段
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "缺少日期参数" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", date);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "查询失败" }, { status: 500 });
    }

    const bookedTimes = data.map((booking) => booking.booking_time);
    return NextResponse.json({ bookedTimes });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

// 创建新预约
export async function POST(request: Request) {
  try {
    const { name, contact, date, time, bookingType, details } = await request.json();

    if (!name || !contact || !date || !time || !bookingType) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    // 检查时间段是否已被预约
    const { data: existingBooking } = await supabase
      .from("bookings")
      .select("id")
      .eq("booking_date", date)
      .eq("booking_time", time)
      .single();

    if (existingBooking) {
      return NextResponse.json({ error: "该时间段已被预约" }, { status: 409 });
    }

    // 创建新预约
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name,
          contact,
          booking_date: date,
          booking_time: time,
          booking_type: bookingType,
          details: details || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "预约失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

