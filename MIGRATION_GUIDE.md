# 迁移 Posts 和 Events 到 Supabase

## 步骤 1：在 Supabase SQL Editor 运行以下 SQL

```sql
-- 创建 posts 表（岛屿碎片）
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 events 表（营地集会）
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  join_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 guestbook 表（瓶中信/故事）
CREATE TABLE guestbook (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 profile 表（个人资料）
CREATE TABLE profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL DEFAULT '小黑',
  avatar_url TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT ARRAY['北京', '攀岩者', '潜水员', 'Vibe Coder', '活动主理人'],
  bio_paragraph_1 TEXT NOT NULL,
  bio_paragraph_2 TEXT NOT NULL,
  bio_quote TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_profile CHECK (id = 1)
);

-- 启用行级安全策略
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- 允许公开读取 posts
CREATE POLICY "Allow public read access" ON posts
  FOR SELECT
  USING (true);

-- 允许公开读取 events
CREATE POLICY "Allow public read access" ON events
  FOR SELECT
  USING (true);

-- 允许公开读取 guestbook
CREATE POLICY "Allow public read access" ON guestbook
  FOR SELECT
  USING (true);

-- 允许公开插入 guestbook
CREATE POLICY "Allow public insert access" ON guestbook
  FOR INSERT
  WITH CHECK (true);

-- 允许公开读取 profile
CREATE POLICY "Allow public read access" ON profile
  FOR SELECT
  USING (true);

-- 允许公开更新 profile（生产环境建议改为需要认证）
CREATE POLICY "Allow public update access" ON profile
  FOR UPDATE
  USING (id = 1)
  WITH CHECK (id = 1);

-- 插入示例数据（posts）
INSERT INTO posts (content, image_url) VALUES
  ('在这个梦境般的岛屿上，每一个瞬间都值得被记录。', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'),
  ('夜晚的星空下，思绪随风飘散。', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800'),
  ('清晨的第一缕阳光，照亮了新的可能。', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800');

-- 插入示例数据（events）
INSERT INTO events (title, description, time, location, join_link) VALUES
  ('岛屿漫步', '一起在岛上散步，分享彼此的故事和梦想。', '2026年3月15日 14:00', '小黑的岛屿', 'https://example.com'),
  ('星空夜话', '在星空下围坐，聊聊生活、理想和那些说不完的话题。', '2026年3月22日 19:00', '岛屿观星台', 'https://example.com');

-- 插入初始个人资料
INSERT INTO profile (
  id,
  name,
  avatar_url,
  tags,
  bio_paragraph_1,
  bio_paragraph_2,
  bio_quote
) VALUES (
  1,
  '小黑',
  'https://picsum.photos/seed/xiaohei/800/800',
  ARRAY['北京', '攀岩者', '潜水员', 'Vibe Coder', '活动主理人'],
  '从印尼的浪尖到阳朔的洞穴，从读诗会的温润到搞砸俱乐部的坦诚。',
  '我在这里创造一个让城市紧绷的人放松的场域。对我而言，代码与山海并无二致，它们都是通往自由的路径。',
  'We are all fragments of a larger dream.'
);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profile_updated_at
BEFORE UPDATE ON profile
FOR EACH ROW
EXECUTE FUNCTION update_profile_updated_at();
```

## 步骤 2：配置 Vercel 环境变量

在 Vercel 项目设置中添加以下环境变量：

1. 进入 Vercel Dashboard
2. 选择你的项目
3. 进入 Settings > Environment Variables
4. 添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL=你的supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase_anon_key
RESEND_API_KEY=你的resend_api_key
ADMIN_EMAIL=你的邮箱
```

## 步骤 3：重新部署

环境变量配置完成后，Vercel 会自动重新部署。或者你可以手动触发重新部署。

## 完成！

现在你的网站在 Vercel 上应该能正常显示：
- ✅ 岛屿碎片（Posts）
- ✅ 营地集会（Events）
- ✅ 瓶中信（Guestbook）
- ✅ 预约系统（Bookings）
- ✅ 个人资料（Profile）

所有数据都存储在 Supabase 云数据库中，Vercel 可以正常访问。

## 管理个人资料

访问 `/admin/profile` 页面可以编辑你的个人资料：
- 修改名字
- 更换头像（输入图片 URL）
- 编辑身份标签
- 更新个人介绍
- 修改引用语句

**注意**：目前管理页面没有密码保护，建议在生产环境添加认证。


