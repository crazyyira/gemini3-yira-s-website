# 预约系统 Supabase 集成说明

## 环境变量配置

请在你的 `.env` 文件中添加以下环境变量（注意：Supabase 变量需要 `NEXT_PUBLIC_` 前缀）：

```env
# Resend API Key
RESEND_API_KEY=your_resend_api_key_here

# Admin Email
ADMIN_EMAIL=your_email@example.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**重要提示：** 你需要将 `.env` 文件中的 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 改为：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

这是因为这些变量需要在客户端（浏览器）中使用，Next.js 要求客户端环境变量必须以 `NEXT_PUBLIC_` 开头。

## 数据库设置

### 1. 在 Supabase SQL Editor 中运行以下 SQL：

```sql
-- 创建预约表
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  booking_type TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建唯一索引，确保同一时间段只能有一个预约
CREATE UNIQUE INDEX unique_booking_slot ON bookings(booking_date, booking_time);

-- 创建索引以提高查询性能
CREATE INDEX idx_booking_date ON bookings(booking_date);

-- 启用行级安全策略（RLS）
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取预约数据（用于检查时间段是否可用）
CREATE POLICY "Allow public read access" ON bookings
  FOR SELECT
  USING (true);

-- 创建策略：允许所有人插入预约数据
CREATE POLICY "Allow public insert access" ON bookings
  FOR INSERT
  WITH CHECK (true);
```

### 2. 重启开发服务器

修改环境变量后，需要重启开发服务器：

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
```

## 功能说明

### 已实现的功能：

1. **数据库存储**：预约数据保存到 Supabase
2. **时间段冲突检测**：同一时间段只能有一个预约
3. **已预约时间灰显**：已被预约的时间段显示"已约"并不可选
4. **已约满日期标记**：日历上显示"已满"标记且不可选
5. **实时检查**：选择日期后实时加载该日期的预约情况
6. **友好提示**：预约成功/失败都有清晰的提示信息

### 测试步骤：

1. 打开预约页面，选择日期和时间
2. 填写预约信息并提交
3. 检查 Supabase 数据库中的 `bookings` 表，应该能看到新记录
4. 再次尝试预约同一时间段，应该提示"该时间段已被预约"
5. 已预约的时间段应该显示为灰色且不可点击

## 表结构

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | uuid | 主键，自动生成 |
| name | text | 预约人姓名 |
| contact | text | 联系方式 |
| booking_date | date | 预约日期 (YYYY-MM-DD) |
| booking_time | text | 预约时间段 (如 "09:00") |
| booking_type | text | 预约事项类型 (offline/online/talk/other) |
| details | text | 具体事项（可选） |
| created_at | timestamp | 创建时间 |



