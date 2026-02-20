import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { type, name, contact, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    let emailSubject = "";
    let emailContent = "";

    if (type === "contact") {
      emailSubject = `【联系表单】来自 ${name} 的消息`;
      emailContent = `
        <h2>新的联系表单提交</h2>
        <p><strong>姓名：</strong>${name}</p>
        <p><strong>联系方式：</strong>${contact || "未提供"}</p>
        <p><strong>留言内容：</strong></p>
        <p>${message}</p>
      `;
    } else if (type === "story") {
      emailSubject = `【瓶中信】${name} 投递了新故事`;
      emailContent = `
        <h2>新的故事投递</h2>
        <p><strong>昵称：</strong>${name}</p>
        <p><strong>故事内容：</strong></p>
        <p>${message}</p>
      `;
    } else {
      return NextResponse.json({ error: "无效的类型" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Xiaohei Island <onboarding@resend.dev>",
      to: ["yirawong@outlook.com"], // 替换为你的邮箱
      subject: emailSubject,
      html: emailContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "发送失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

