# 前端内容与后台管理对照表

## 📊 当前状态分析

### ✅ 已有后台管理的内容

| 前端位置 | 内容类型 | 后台管理路径 | 状态 |
|---------|---------|-------------|------|
| 关于页面 | 个人信息（名字、标签、介绍、引用） | `/admin/profile` | ✅ 可管理 |
| 关于页面 | 个人照片相册 | `/admin/profile` | ✅ 可管理 |
| 岛屿碎片 | 图文内容 | `/admin/posts` | ✅ 可管理 |
| 营地集会 | 活动信息 | `/admin/events` | ✅ 可管理 |
| 营地集会 | 活动报名 | `/admin/event-registrations` | ✅ 可管理 |
| 预约系统 | 预约信息 | `/admin/bookings` | ✅ 可查看 |
| 瓶中信 | 用户故事 | `/admin/stories` | ✅ 可查看 |

### ❌ 缺少后台管理的内容

| 前端位置 | 内容类型 | 当前状态 | 建议 |
|---------|---------|---------|------|
| Hero 首页 | 主标题："小黑的奇幻岛屿" | 硬编码 | 需要添加管理 |
| Hero 首页 | 副标题："在岩壁上寻找自由，在代码中构建万物" | 硬编码 | 需要添加管理 |
| Hero 首页 | 左侧卡片："山海之息" + 描述 | 硬编码 | 需要添加管理 |
| Hero 首页 | 右侧卡片："灯火之境" + 描述 | 硬编码 | 需要添加管理 |
| Hero 首页 | 底部文字："连接有趣的人..." | 硬编码 | 需要添加管理 |

## 🎯 需要实现的功能

### 1. Hero 首页内容管理

创建一个新的管理模块来管理首页的所有文字内容：

#### 数据库表结构建议：
```sql
CREATE TABLE hero_content (
  id SERIAL PRIMARY KEY,
  main_title TEXT NOT NULL,           -- 主标题
  main_subtitle TEXT NOT NULL,        -- 副标题
  left_card_title TEXT NOT NULL,      -- 左侧卡片标题
  left_card_description TEXT NOT NULL, -- 左侧卡片描述
  right_card_title TEXT NOT NULL,     -- 右侧卡片标题
  right_card_description TEXT NOT NULL, -- 右侧卡片描述
  bottom_text TEXT NOT NULL,          -- 底部文字
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
) VALUES (
  '小黑的奇幻岛屿',
  '在岩壁上寻找自由，在代码中构建万物',
  '山海之息',
  '在崎岖的岩壁上寻找自由的支点，在深邃的海底听见心跳的回响。',
  '灯火之境',
  '一盏复古台灯，一行跳动的代码，在寂静的深夜构建属于未来的碎片。',
  '连接有趣的人，一起 Vibe Coding，一起坠入山海。'
);
```

#### 后台管理页面：
- 路径：`/admin/hero`
- 功能：编辑首页所有文字内容
- 实时预览

## 📋 实施计划

### 步骤 1：创建数据库表
在 Supabase SQL Editor 中执行上述 SQL

### 步骤 2：创建 API 路由
- `GET /api/hero` - 获取首页内容
- `PUT /api/hero` - 更新首页内容

### 步骤 3：更新 Hero 组件
从 API 加载内容而不是硬编码

### 步骤 4：创建后台管理页面
`/admin/hero` - 编辑首页内容

### 步骤 5：更新导航
在后台主页添加"首页内容"管理入口

## 🔍 当前可管理的内容总结

你现在可以在后台管理以下内容：

1. **个人资料** (`/admin/profile`)
   - ✅ 名字
   - ✅ 头像 URL
   - ✅ 身份标签
   - ✅ 个人介绍（两段）
   - ✅ 引用语句
   - ✅ 个人照片相册（Supabase Storage）

2. **岛屿碎片** (`/admin/posts`)
   - ✅ 图片（从 POSTS bucket 上传/选择）
   - ✅ 文字内容
   - ✅ 创建/编辑/删除

3. **营地集会** (`/admin/events`)
   - ✅ 活动封面（从 EVENTS bucket 上传/选择）
   - ✅ 活动标题
   - ✅ 活动描述
   - ✅ 时间
   - ✅ 地点
   - ✅ 报名链接
   - ✅ 创建/编辑/删除

4. **活动报名** (`/admin/event-registrations`)
   - ✅ 查看所有活动的报名统计
   - ✅ 管理每个活动的报名人员
   - ✅ 更新报名状态

5. **预约管理** (`/admin/bookings`)
   - ✅ 查看所有预约
   - ✅ 更新预约状态

6. **瓶中信** (`/admin/stories`)
   - ✅ 查看用户提交的故事
   - ✅ 删除不当内容

## ❓ 是否需要添加首页内容管理？

如果需要，我可以立即为你实现首页内容的后台管理功能。

