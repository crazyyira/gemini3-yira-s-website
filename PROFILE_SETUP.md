# 灵魂拼切（About）数据库设计

## 数据库表结构

### 表名：profile

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | integer | 主键，固定为 1（只有一条记录）|
| name | text | 名字 |
| avatar_url | text | 头像图片 URL |
| tags | text[] | 身份标签数组 |
| bio_paragraph_1 | text | 个人介绍第一段 |
| bio_paragraph_2 | text | 个人介绍第二段 |
| bio_quote | text | 引用语句 |
| updated_at | timestamp | 更新时间 |

## 建表 SQL

在 Supabase SQL Editor 中运行：

```sql
-- 创建 profile 表
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

-- 插入初始数据
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

-- 启用行级安全策略
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- 允许公开读取
CREATE POLICY "Allow public read access" ON profile
  FOR SELECT
  USING (true);

-- 允许公开更新（生产环境建议改为需要认证）
CREATE POLICY "Allow public update access" ON profile
  FOR UPDATE
  USING (id = 1)
  WITH CHECK (id = 1);

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

## 注意事项

1. **单条记录限制**：使用 `CONSTRAINT single_profile CHECK (id = 1)` 确保只有一条记录
2. **标签数组**：使用 PostgreSQL 的数组类型存储多个标签
3. **图片上传**：可以使用 Supabase Storage 或第三方图床（如 Cloudinary）
4. **安全性**：生产环境建议添加认证，只允许管理员更新

## 后续步骤

1. 运行上面的 SQL 创建表
2. 创建 API 路由 `/api/profile`
3. 更新 About 组件从数据库读取数据
4. （可选）创建管理后台页面用于编辑



