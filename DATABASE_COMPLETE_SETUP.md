# 完整数据库表结构创建

## 🔧 在 Supabase SQL Editor 中按顺序执行以下 SQL

### 1. 创建 profile 表

```sql
-- 创建 profile 表
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '小黑',
  avatar_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  bio_paragraph_1 TEXT,
  bio_paragraph_2 TEXT,
  bio_quote TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 添加注释
COMMENT ON TABLE profile IS '个人资料信息';
COMMENT ON COLUMN profile.name IS '名字';
COMMENT ON COLUMN profile.avatar_url IS '头像图片 URL';
COMMENT ON COLUMN profile.tags IS '身份标签数组';
COMMENT ON COLUMN profile.bio_paragraph_1 IS '个人介绍第一段';
COMMENT ON COLUMN profile.bio_paragraph_2 IS '个人介绍第二段';
COMMENT ON COLUMN profile.bio_quote IS '引用语句';

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

### 2. 插入默认数据

```sql
-- 插入个人资料默认数据
INSERT INTO profile (
  id,
  name,
  avatar_url,
  tags,
  bio_paragraph_1,
  bio_paragraph_2,
  bio_quote
)
VALUES (
  1,
  '小黑',
  'https://picsum.photos/seed/xiaohei/800/800',
  ARRAY['北京', '攀岩者', '潜水员', 'Vibe Coder', '活动主理人'],
  '从印尼的浪尖到阳朔的洞穴，从读诗会的温润到搞砸俱乐部的坦诚。',
  '我在这里创造一个让城市紧绷的人放松的场域。对我而言，代码与山海并无二致，它们都是通往自由的路径。',
  'We are all fragments of a larger dream.'
)
ON CONFLICT (id) 
DO UPDATE SET
  name = EXCLUDED.name,
  avatar_url = EXCLUDED.avatar_url,
  tags = EXCLUDED.tags,
  bio_paragraph_1 = EXCLUDED.bio_paragraph_1,
  bio_paragraph_2 = EXCLUDED.bio_paragraph_2,
  bio_quote = EXCLUDED.bio_quote;
```

### 3. 创建 hero_content 表（如果还没创建）

```sql
-- 创建 hero_content 表
CREATE TABLE IF NOT EXISTS hero_content (
  id SERIAL PRIMARY KEY,
  main_title TEXT NOT NULL DEFAULT '小黑的奇幻岛屿',
  main_subtitle TEXT NOT NULL DEFAULT '在岩壁上寻找自由，在代码中构建万物',
  left_card_title TEXT NOT NULL DEFAULT '山海之息',
  left_card_description TEXT NOT NULL DEFAULT '在崎岖的岩壁上寻找自由的支点，在深邃的海底听见心跳的回响。',
  right_card_title TEXT NOT NULL DEFAULT '灯火之境',
  right_card_description TEXT NOT NULL DEFAULT '一盏复古台灯，一行跳动的代码，在寂静的深夜构建属于未来的碎片。',
  bottom_text TEXT NOT NULL DEFAULT '连接有趣的人，一起 Vibe Coding，一起坠入山海。',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 插入默认数据
INSERT INTO hero_content (
  main_title, 
  main_subtitle, 
  left_card_title, 
  left_card_description, 
  right_card_title, 
  right_card_description, 
  bottom_text
)
SELECT 
  '小黑的奇幻岛屿',
  '在岩壁上寻找自由，在代码中构建万物',
  '山海之息',
  '在崎岖的岩壁上寻找自由的支点，在深邃的海底听见心跳的回响。',
  '灯火之境',
  '一盏复古台灯，一行跳动的代码，在寂静的深夜构建属于未来的碎片。',
  '连接有趣的人，一起 Vibe Coding，一起坠入山海。'
WHERE NOT EXISTS (SELECT 1 FROM hero_content);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_hero_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hero_content_updated_at
BEFORE UPDATE ON hero_content
FOR EACH ROW
EXECUTE FUNCTION update_hero_content_updated_at();
```

### 4. 检查其他必需的表

```sql
-- 检查 posts 表是否存在
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 检查 events 表是否存在
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  join_link TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 检查 bookings 表是否存在
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  booking_date TEXT NOT NULL,
  booking_time TEXT NOT NULL,
  booking_type TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 检查 stories 表是否存在
CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  story TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 检查 event_registrations 表是否存在
CREATE TABLE IF NOT EXISTS event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ✅ 验证所有表

执行后，运行以下查询验证所有表都已创建：

```sql
-- 查看所有表
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

应该看到以下表：
- ✅ profile
- ✅ hero_content
- ✅ posts
- ✅ events
- ✅ bookings
- ✅ stories
- ✅ event_registrations

---

## 🔍 验证数据

```sql
-- 验证 profile 表
SELECT * FROM profile;

-- 验证 hero_content 表
SELECT * FROM hero_content;

-- 查看其他表（可能为空）
SELECT COUNT(*) as posts_count FROM posts;
SELECT COUNT(*) as events_count FROM events;
SELECT COUNT(*) as bookings_count FROM bookings;
SELECT COUNT(*) as stories_count FROM stories;
SELECT COUNT(*) as registrations_count FROM event_registrations;
```

---

## 📝 说明

- 使用 `CREATE TABLE IF NOT EXISTS` 确保不会重复创建
- 所有表都有 `created_at` 时间戳
- profile 和 hero_content 有 `updated_at` 自动更新
- event_registrations 使用外键关联 events 表
- 所有必需的表都会被创建

执行完成后，刷新后台管理页面，应该可以看到完整的内容了！

