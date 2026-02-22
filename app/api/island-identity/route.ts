import { NextResponse } from "next/server";

// 简单的内存限流器
const rateLimiter = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimiter.get(ip) || [];
  
  // 清理超过1分钟的请求记录
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= 2) {
    return false; // 超过限制
  }
  
  recentRequests.push(now);
  rateLimiter.set(ip, recentRequests);
  return true;
}

export async function POST(request: Request) {
  try {
    // 获取客户端 IP（用于限流）
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    
    // 检查限流
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "请求过于频繁，请稍后再试（每分钟最多2次）" },
        { status: 429 }
      );
    }

    const { personality } = await request.json();

    if (!personality || personality.trim().length === 0) {
      return NextResponse.json(
        { error: "请输入你的性格和喜好" },
        { status: 400 }
      );
    }

    // 获取 API Key
    const apiKey = process.env.TUZIAI_API_KEY;
    if (!apiKey) {
      console.error("Missing TUZIAI_API_KEY");
      return NextResponse.json(
        { error: "服务配置错误" },
        { status: 500 }
      );
    }

    // 调用兔子 API
    const response = await fetch("https://api.tu-zi.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `你是一位充满想象力的岛屿向导，专门为访客分配独特的岛屿身份。

你的任务是根据用户描述的性格和喜好，为他们生成一个专属的岛屿角色。

角色类型可以是：
- 陆地动物（如狐狸、鹿、兔子、猫头鹰等）
- 海洋生物（如海豚、水母、海龟、章鱼等）
- 天空生物（如鸟类、蝴蝶、蜻蜓等）
- 植物（如樱花树、仙人掌、蘑菇、藤蔓等）
- 岛屿物品（如灯塔、风铃、贝壳、漂流瓶等）
- 奇幻角色（如女巫、仙女、小精灵、守护者等）

请以 JSON 格式返回，包含以下字段：
{
  "role": "角色名称（中文，简短有诗意）",
  "type": "角色类型（动物/植物/物品/奇幻角色）",
  "description": "角色描述（50-80字，富有诗意和想象力，解释为什么这个角色适合用户）",
  "traits": ["特质1", "特质2", "特质3"],
  "emoji": "代表这个角色的emoji"
}

要求：
1. 角色要独特、有创意、富有诗意
2. 描述要温暖、治愈、充满想象力
3. 要紧密结合用户的性格特点
4. 语言风格要符合"小黑的奇幻岛屿"的氛围：自由、温暖、有趣、充满可能性
5. 只返回 JSON，不要有其他文字`,
          },
          {
            role: "user",
            content: `我的性格和喜好：${personality}`,
          },
        ],
        temperature: 0.9,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API error:", errorData);
      throw new Error("API 调用失败");
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content;
    
    if (!responseText) {
      throw new Error("AI 未返回内容");
    }

    // 清理 markdown 代码块标记
    let cleanedText = responseText.trim();
    
    // 移除 ```json 和 ``` 标记
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "");
    }
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "");
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.replace(/\s*```$/, "");
    }

    // 解析 JSON 响应
    const result = JSON.parse(cleanedText);

    return NextResponse.json({
      success: true,
      identity: result,
    });
  } catch (error: any) {
    console.error("Island identity generation error:", error);
    
    if (error.message?.includes("JSON")) {
      return NextResponse.json(
        { error: "AI 响应格式错误，请重试" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "生成失败，请稍后重试" },
      { status: 500 }
    );
  }
}

