# 管理后台系统完整指南

## 已完成的功能

### 1. 认证系统 ✅
- 登录页面：`/admin`
- 用户名和密码存储在环境变量中
- Session 基于 Cookie

### 2. 管理后台主页 ✅
- 路径：`/admin/dashboard`
- 包含所有功能模块的导航

### 3. 个人资料管理 ✅
- 路径：`/admin/profile`
- 编辑名字、头像、标签、个人介绍

### 4. 岛屿碎片管理 ✅
- 路径：`/admin/posts`
- 创建、编辑、删除图文内容

## 需要完成的功能

### 5. 营地集会管理
- 路径：`/admin/events`
- 创建、编辑、删除活动信息

### 6. 预约管理
- 路径：`/admin/bookings`
- 查看预约列表
- 更新预约状态（待确认、已确认、已完成、已取消）

### 7. 瓶中信管理
- 路径：`/admin/stories`
- 查看用户投递的故事
- 删除不当内容

## 环境变量配置

在 `.env` 文件中添加：

```env
# 管理员凭证
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_email@example.com
```

## 数据库更新

需要为 bookings 表添加状态字段：

```sql
-- 添加状态字段到 bookings 表
ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'pending';

-- 更新现有记录
UPDATE bookings SET status = 'pending' WHERE status IS NULL;

-- 添加约束
ALTER TABLE bookings ADD CONSTRAINT booking_status_check 
  CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'));
```

## API 路由

### Events API
- `GET /api/events` - 获取活动列表
- `POST /api/events` - 创建活动
- `PUT /api/events/[id]` - 更新活动
- `DELETE /api/events/[id]` - 删除活动

### Bookings API
- `GET /api/bookings` - 获取预约列表
- `PUT /api/bookings/[id]` - 更新预约状态

### Stories API
- `GET /api/stories` - 获取故事列表
- `DELETE /api/stories/[id]` - 删除故事

## 快速创建剩余页面

由于代码量较大，建议按以下顺序创建：

1. **营地集会管理**：参考 posts 管理页面的结构
2. **预约管理**：只读列表 + 状态更新
3. **瓶中信管理**：只读列表 + 删除功能

每个页面都需要：
- 认证检查
- 返回后台按钮
- 统一的样式（glass 效果）
- 通知组件

## 安全建议

1. **生产环境**：
   - 使用强密码
   - 考虑添加 2FA
   - 限制登录尝试次数
   - 使用 HTTPS

2. **权限控制**：
   - 所有管理 API 都应检查认证
   - 考虑使用 middleware 统一处理

3. **日志记录**：
   - 记录所有管理操作
   - 便于审计和问题排查

## 下一步

1. 在 `.env` 中设置 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD`
2. 运行数据库迁移 SQL
3. 访问 `/admin` 登录
4. 测试已完成的功能
5. 根据需要创建剩余的管理页面

