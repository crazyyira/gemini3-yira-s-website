# Supabase Storage 集成指南

## 📦 需要创建的 Buckets

在 Supabase Storage 中创建以下三个公开 bucket：

### 1. PHOTO
- **用途**：灵魂拼切个人照片
- **权限**：公开读取
- **管理位置**：后台 > 个人资料管理

### 2. POSTS
- **用途**：岛屿碎片图片
- **权限**：公开读取
- **管理位置**：后台 > 岛屿碎片管理

### 3. EVENTS
- **用途**：营地集会活动图片
- **权限**：公开读取
- **管理位置**：后台 > 营地集会管理

## 🗄️ 数据库迁移

### 为 events 表添加 image_url 字段

在 Supabase SQL Editor 中执行：

```sql
-- 添加 image_url 字段到 events 表
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 添加注释
COMMENT ON COLUMN events.image_url IS '活动封面图片 URL';
```

## 🔧 创建 Storage Buckets

### 方法 1：通过 Supabase Dashboard

1. 登录 Supabase Dashboard
2. 进入你的项目
3. 点击左侧菜单 "Storage"
4. 点击 "New bucket"
5. 创建以下 buckets：
   - 名称：`PHOTO`，公开：✅
   - 名称：`POSTS`，公开：✅
   - 名称：`EVENTS`，公开：✅

### 方法 2：通过 SQL

```sql
-- 创建 PHOTO bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('PHOTO', 'PHOTO', true)
ON CONFLICT (id) DO NOTHING;

-- 创建 POSTS bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('POSTS', 'POSTS', true)
ON CONFLICT (id) DO NOTHING;

-- 创建 EVENTS bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('EVENTS', 'EVENTS', true)
ON CONFLICT (id) DO NOTHING;
```

### 设置 Storage 策略（允许所有人读取）

```sql
-- PHOTO bucket 读取策略
CREATE POLICY "Public Access for PHOTO"
ON storage.objects FOR SELECT
USING (bucket_id = 'PHOTO');

-- POSTS bucket 读取策略
CREATE POLICY "Public Access for POSTS"
ON storage.objects FOR SELECT
USING (bucket_id = 'POSTS');

-- EVENTS bucket 读取策略
CREATE POLICY "Public Access for EVENTS"
ON storage.objects FOR SELECT
USING (bucket_id = 'EVENTS');

-- 允许认证用户上传（可选，如果需要前端上传）
CREATE POLICY "Authenticated users can upload to PHOTO"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'PHOTO' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload to POSTS"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'POSTS' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload to EVENTS"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'EVENTS' AND auth.role() = 'authenticated');

-- 允许认证用户删除（可选）
CREATE POLICY "Authenticated users can delete from PHOTO"
ON storage.objects FOR DELETE
USING (bucket_id = 'PHOTO' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete from POSTS"
ON storage.objects FOR DELETE
USING (bucket_id = 'POSTS' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete from EVENTS"
ON storage.objects FOR DELETE
USING (bucket_id = 'EVENTS' AND auth.role() = 'authenticated');
```

## ✅ 验证配置

### 1. 检查 Buckets 是否创建成功

```sql
SELECT * FROM storage.buckets;
```

应该看到 PHOTO、POSTS、EVENTS 三个 bucket。

### 2. 检查 events 表结构

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events';
```

应该看到 image_url 字段。

## 🚀 使用说明

### 后台管理

1. **个人资料管理** (`/admin/profile`)
   - 上传照片到 PHOTO bucket
   - 前端"关于"页面自动轮播显示

2. **岛屿碎片管理** (`/admin/posts`)
   - 上传图片到 POSTS bucket
   - 可以从图库选择或上传新图片
   - 支持删除图库中的图片

3. **营地集会管理** (`/admin/events`)
   - 上传活动封面到 EVENTS bucket
   - 可以从图库选择或上传新图片
   - 支持删除图库中的图片

### API 端点

- `GET /api/storage/[bucket]` - 获取指定 bucket 的所有图片
- `POST /api/storage/[bucket]/upload` - 上传图片到指定 bucket
- `DELETE /api/storage/[bucket]/delete` - 从指定 bucket 删除图片

## 📝 注意事项

1. 确保 `.env` 文件包含正确的 Supabase 配置：
   ```env
   SUPABASE_URL=你的supabase地址
   SUPABASE_ANON_KEY=你的key
   ```

2. 所有 buckets 必须设置为公开，否则前端无法访问图片

3. 图片文件名会自动添加时间戳，避免重复

4. 支持的图片格式：jpg, jpeg, png, gif, webp

5. 重启开发服务器使配置生效

