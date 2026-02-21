import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { type, name, contact, message, date, time, bookingType, details } = await request.json();

    if (!name) {
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
    } else if (type === "booking") {
      const bookingTypeMap: { [key: string]: string } = {
        offline: "线下玩耍",
        online: "远程见面",
        talk: "心事时间",
        other: "其他",
      };
      emailSubject = `【预约通知】${name} 预约了 ${date} ${time}`;
      emailContent = `
        <h2>新的预约请求</h2>
        <p><strong>预约人：</strong>${name}</p>
        <p><strong>联系方式：</strong>${contact}</p>
        <p><strong>预约时间：</strong>${date} ${time}</p>
        <p><strong>预约事项：</strong>${bookingTypeMap[bookingType] || bookingType}</p>
        ${details ? `<p><strong>具体事项：</strong></p><p>${details}</p>` : ""}
      `;
    } else {
      return NextResponse.json({ error: "无效的类型" }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.error("ADMIN_EMAIL not configured");
      return NextResponse.json({ error: "服务器配置错误" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "Xiaohei Island <onboarding@resend.dev>",
      to: [adminEmail],
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

