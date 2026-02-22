# 营地集会报名系统

## 数据库表结构

### 表名：event_registrations

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | uuid | 主键 |
| event_id | integer | 关联的活动 ID |
| name | text | 报名人姓名 |
| contact | text | 联系方式 |
| status | text | 状态（pending/confirmed/attended/absent） |
| notes | text | 备注（可选） |
| created_at | timestamp | 创建时间 |

## 建表 SQL

在 Supabase SQL Editor 中运行：

```sql
-- 创建活动报名表
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 添加状态约束
ALTER TABLE event_registrations ADD CONSTRAINT registration_status_check 
  CHECK (status IN ('pending', 'confirmed', 'attended', 'absent'));

-- 创建索引
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_status ON event_registrations(status);

-- 启用行级安全策略
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- 允许公开读取
CREATE POLICY "Allow public read access" ON event_registrations
  FOR SELECT
  USING (true);

-- 允许公开插入（用户报名）
CREATE POLICY "Allow public insert access" ON event_registrations
  FOR INSERT
  WITH CHECK (true);

-- 允许公开更新（管理员修改）
CREATE POLICY "Allow public update access" ON event_registrations
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 允许公开删除（管理员删除）
CREATE POLICY "Allow public delete access" ON event_registrations
  FOR DELETE
  USING (true);
```

## 状态说明

- `pending` - 待确认
- `confirmed` - 已确认
- `attended` - 已参加
- `absent` - 未参加



