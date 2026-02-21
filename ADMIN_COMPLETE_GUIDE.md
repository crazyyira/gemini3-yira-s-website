# 🎉 管理后台系统 - 完整设置指南

## ✅ 已完成的所有功能

### 1. 认证系统
- ✅ 登录页面：`/admin`
- ✅ 基于用户名和密码的认证
- ✅ Cookie-based session
- ✅ 自动登出功能

### 2. 管理后台主页
- ✅ 路径：`/admin/dashboard`
- ✅ 6 个功能模块导航
- ✅ 快速统计面板

### 3. 个人资料管理
- ✅ 路径：`/admin/profile`
- ✅ 编辑名字、头像、标签
- ✅ 编辑个人介绍和引用语句
- ✅ 实时预览

### 4. 岛屿碎片管理
- ✅ 路径：`/admin/posts`
- ✅ 创建、编辑、删除图文内容
- ✅ 图片预览功能

### 5. 营地集会管理
- ✅ 路径：`/admin/events`
- ✅ 创建、编辑、删除活动
- ✅ 管理活动详情
- ✅ 快速进入报名管理

### 6. 活动报名管理
- ✅ 总览页面：`/admin/event-registrations`
  - 查看所有活动的报名统计
  - 快速跳转到具体活动的报名管理
- ✅ 详情页面：`/admin/events/[eventId]/registrations`
  - 查看某个活动的所有报名
  - 手动添加报名信息
  - 编辑报名人信息
  - 更新报名状态（待确认、已确认、已参加、未参加）
  - 删除报名记录
  - 按状态筛选

### 7. 预约管理
- ✅ 路径：`/admin/bookings`
- ✅ 查看所有预约
- ✅ 状态筛选（待确认、已确认、已完成、已取消）
- ✅ 更新预约状态

### 8. 瓶中信管理
- ✅ 路径：`/admin/stories`
- ✅ 查看用户故事
- ✅ 删除不当内容
- ✅ 统计信息

## 📋 设置步骤

### 步骤 1：配置环境变量

在 `.env` 文件中添加以下内容：

```env
# 管理员凭证
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的强密码（建议至少12位，包含大小写字母、数字和特殊字符）

# Supabase
NEXT_PUBLIC_SUPABASE_URL=你的supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase_anon_key

# Resend
RESEND_API_KEY=你的resend_api_key
ADMIN_EMAIL=你的邮箱@example.com
```

### 步骤 2：更新数据库

在 Supabase SQL Editor 中运行以下 SQL：

```sql
-- 为 bookings 表添加状态字段
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- 更新现有记录
UPDATE bookings SET status = 'pending' WHERE status IS NULL;

-- 添加约束
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS booking_status_check;
ALTER TABLE bookings ADD CONSTRAINT booking_status_check 
  CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'));

-- 创建活动报名表
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 添加状态约束
ALTER TABLE event_registrations DROP CONSTRAINT IF EXISTS registration_status_check;
ALTER TABLE event_registrations ADD CONSTRAINT registration_status_check 
  CHECK (status IN ('pending', 'confirmed', 'attended', 'absent'));

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_status ON event_registrations(status);

-- 启用行级安全策略
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- 允许公开读取
DROP POLICY IF EXISTS "Allow public read access" ON event_registrations;
CREATE POLICY "Allow public read access" ON event_registrations
  FOR SELECT
  USING (true);

-- 允许公开插入（用户报名）
DROP POLICY IF EXISTS "Allow public insert access" ON event_registrations;
CREATE POLICY "Allow public insert access" ON event_registrations
  FOR INSERT
  WITH CHECK (true);

-- 允许公开更新（管理员修改）
DROP POLICY IF EXISTS "Allow public update access" ON event_registrations;
CREATE POLICY "Allow public update access" ON event_registrations
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 允许公开删除（管理员删除）
DROP POLICY IF EXISTS "Allow public delete access" ON event_registrations;
CREATE POLICY "Allow public delete access" ON event_registrations
  FOR DELETE
  USING (true);

-- 为 posts 表添加更新和删除策略
DROP POLICY IF EXISTS "Allow public insert access" ON posts;
CREATE POLICY "Allow public insert access" ON posts
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access" ON posts;
CREATE POLICY "Allow public update access" ON posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access" ON posts;
CREATE POLICY "Allow public delete access" ON posts
  FOR DELETE
  USING (true);

-- 为 events 表添加更新和删除策略
DROP POLICY IF EXISTS "Allow public insert access" ON events;
CREATE POLICY "Allow public insert access" ON events
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access" ON events;
CREATE POLICY "Allow public update access" ON events
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access" ON events;
CREATE POLICY "Allow public delete access" ON events
  FOR DELETE
  USING (true);

-- 为 guestbook 表添加删除策略
DROP POLICY IF EXISTS "Allow public delete access" ON guestbook;
CREATE POLICY "Allow public delete access" ON guestbook
  FOR DELETE
  USING (true);

-- 为 bookings 表添加更新策略
DROP POLICY IF EXISTS "Allow public update access" ON bookings;
CREATE POLICY "Allow public update access" ON bookings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

### 步骤 3：重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
```

### 步骤 4：登录管理后台

1. 访问 `http://localhost:3000/admin`
2. 输入你在 `.env` 中设置的用户名和密码
3. 登录成功后会跳转到管理后台主页

## 🎯 功能使用指南

### 个人资料管理
1. 点击"个人资料"卡片
2. 编辑名字、头像 URL、标签
3. 修改个人介绍和引用语句
4. 点击"保存更改"

### 岛屿碎片管理
1. 点击"岛屿碎片"卡片
2. 点击"新建碎片"创建内容
3. 输入图片 URL 和文字内容
4. 点击"保存"
5. 可以编辑或删除现有碎片

### 营地集会管理
1. 点击"营地集会"卡片
2. 点击"新建活动"
3. 填写活动标题、描述、时间、地点
4. 可选填报名链接
5. 点击"保存"
6. **点击"报名"按钮查看和管理报名人员**

### 活动报名管理
1. **总览页面**：
   - 点击主页的"活动报名"卡片
   - 查看所有活动的报名统计
   - 点击任意活动进入详情管理

2. **详情管理**：
   - 在营地集会列表中点击某个活动的"报名"按钮
   - 或从总览页面点击活动卡片
   - 查看该活动的所有报名人员
   - 可以：
     - 添加报名：手动添加报名信息
     - 编辑报名：修改报名人信息
     - 更新状态：待确认 → 已确认 → 已参加/未参加
     - 删除报名：删除不需要的报名记录
   - 使用顶部筛选器按状态查看

### 预约管理
1. 点击"预约管理"卡片
2. 查看所有预约列表
3. 使用顶部筛选器按状态筛选
4. 点击状态按钮更新预约状态：
   - 待确认 → 确认/取消
   - 已确认 → 完成
   - 已完成/已取消 → 重置

### 瓶中信管理
1. 点击"瓶中信"卡片
2. 查看用户投递的所有故事
3. 如有不当内容，点击"删除"按钮

## 🔒 安全建议

### 生产环境部署

1. **强密码**：
   - 至少 12 位字符
   - 包含大小写字母、数字和特殊字符
   - 定期更换密码

2. **Vercel 环境变量**：
   - 在 Vercel Dashboard 中设置所有环境变量
   - 不要将 `.env` 文件提交到 Git

3. **数据库安全**：
   - 生产环境建议修改 RLS 策略
   - 只允许认证用户进行管理操作

4. **HTTPS**：
   - Vercel 自动提供 HTTPS
   - 确保所有请求都通过 HTTPS

## 📊 管理后台功能对照表

| 功能 | 路径 | 操作 | 状态 |
|------|------|------|------|
| 登录 | `/admin` | 认证 | ✅ |
| 主页 | `/admin/dashboard` | 导航 | ✅ |
| 个人资料 | `/admin/profile` | 增删改查 | ✅ |
| 岛屿碎片 | `/admin/posts` | 增删改查 | ✅ |
| 营地集会 | `/admin/events` | 增删改查 | ✅ |
| 活动报名总览 | `/admin/event-registrations` | 查看统计 | ✅ |
| 活动报名详情 | `/admin/events/[id]/registrations` | 增删改查 | ✅ |
| 预约管理 | `/admin/bookings` | 查看、更新状态 | ✅ |
| 瓶中信 | `/admin/stories` | 查看、删除 | ✅ |

## 🚀 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（所有 `.env` 中的变量）
4. 部署完成后访问 `https://你的域名.vercel.app/admin`

## 💡 提示

- 所有管理页面都有认证保护
- 未登录会自动跳转到登录页
- Session 有效期为 24 小时
- 可以随时点击"退出登录"

## 🎊 完成！

你的管理后台系统已经完全搭建完成！现在可以：
1. 登录管理后台
2. 管理网站的所有内容
3. 查看用户预约和故事
4. 随时更新个人信息

祝使用愉快！🎉

