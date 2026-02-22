# 前端与后台数据同步完整指南

## 📊 当前状态

### 问题
后台管理系统中的个人资料（灵魂拼贴）显示为空，与前端默认显示的内容不一致。

### 解决方案
在 Supabase 数据库中插入默认数据，确保前端和后台显示一致。

---

## 🔧 需要执行的 SQL 语句

### 1. 个人资料默认数据

在 Supabase SQL Editor 中执行：

```sql
-- 插入或更新个人资料默认数据
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

### 2. 首页内容默认数据（如果还没执行）

```sql
-- 插入首页内容默认数据
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
```

### 3. 示例岛屿碎片数据（可选）

如果想要一些示例数据：

```sql
-- 插入示例岛屿碎片
INSERT INTO posts (content, image_url) VALUES
('在阳朔的岩壁上，找到了属于自己的节奏。每一次攀爬都是一次与自己的对话。', 'https://picsum.photos/seed/climbing1/800/600'),
('深夜的代码，就像海底的珊瑚，静静生长，构建着属于未来的世界。', 'https://picsum.photos/seed/coding1/800/600'),
('读诗会上的温柔时光，让城市的喧嚣暂时停歇。', 'https://picsum.photos/seed/poetry1/800/600')
ON CONFLICT DO NOTHING;
```

### 4. 示例营地集会数据（可选）

```sql
-- 插入示例活动
INSERT INTO events (title, description, time, location, join_link, image_url) VALUES
('周末攀岩体验', '一起去阳朔体验攀岩的乐趣，适合新手和老手。', '2026年3月15日 09:00', '阳朔攀岩场', '', 'https://picsum.photos/seed/climbing-event/1920/1080'),
('Vibe Coding 夜', '深夜编程马拉松，一起写代码，一起喝咖啡。', '2026年3月20日 20:00', '北京某咖啡馆', '', 'https://picsum.photos/seed/coding-event/1920/1080')
ON CONFLICT DO NOTHING;
```

---

## ✅ 验证步骤

### 1. 验证个人资料

```sql
SELECT * FROM profile WHERE id = 1;
```

应该看到：
- name: 小黑
- avatar_url: https://picsum.photos/seed/xiaohei/800/800
- tags: {北京,攀岩者,潜水员,Vibe Coder,活动主理人}
- bio_paragraph_1: 从印尼的浪尖到阳朔的洞穴...
- bio_paragraph_2: 我在这里创造一个让城市紧绷的人放松的场域...
- bio_quote: We are all fragments of a larger dream.

### 2. 验证首页内容

```sql
SELECT * FROM hero_content;
```

应该看到一条包含所有首页文字的记录。

### 3. 验证岛屿碎片（如果插入了示例数据）

```sql
SELECT id, content, LEFT(image_url, 50) as image_url FROM posts;
```

### 4. 验证营地集会（如果插入了示例数据）

```sql
SELECT id, title, time, location FROM events;
```

---

## 🎯 执行后的效果

### 前端
- ✅ 首页显示完整内容
- ✅ 关于页面显示个人信息
- ✅ 岛屿碎片显示内容（如果有数据）
- ✅ 营地集会显示活动（如果有数据）

### 后台
- ✅ 个人资料管理显示完整信息
- ✅ 首页内容管理显示所有文字
- ✅ 岛屿碎片管理显示所有碎片
- ✅ 营地集会管理显示所有活动

### 一致性
- ✅ 前端和后台显示相同的内容
- ✅ 可以在后台修改所有内容
- ✅ 修改后前端立即生效

---

## 📝 注意事项

### 1. 关于图片
- 示例使用的是 picsum.photos 的占位图片
- 建议上传真实图片到 Supabase Storage
- 在后台管理页面可以上传和管理图片

### 2. 关于数据
- `ON CONFLICT` 确保不会重复插入
- 如果数据已存在，会更新为默认值
- 可以在后台随时修改这些内容

### 3. 关于 Storage
- 个人照片存储在 PHOTO bucket
- 岛屿碎片图片存储在 POSTS bucket
- 活动封面存储在 EVENTS bucket

---

## 🚀 快速开始

### 最小化步骤（只同步个人资料）

1. 打开 Supabase Dashboard
2. 进入 SQL Editor
3. 复制并执行"个人资料默认数据"的 SQL
4. 刷新后台管理页面
5. 查看个人资料管理，应该显示完整内容

### 完整步骤（同步所有内容）

1. 执行所有 SQL 语句
2. 重启开发服务器：`npm run dev`
3. 访问前端查看所有内容
4. 登录后台查看所有管理页面
5. 在后台修改内容，前端立即生效

---

## 🔍 故障排查

### 问题：后台仍然显示空白

**解决方案：**
1. 检查 SQL 是否执行成功
2. 查看浏览器控制台是否有错误
3. 检查 API 路由是否正常：访问 `/api/profile`
4. 清除浏览器缓存并刷新

### 问题：前端显示但后台不显示

**解决方案：**
1. 检查后台是否正确调用 API
2. 查看网络请求是否成功
3. 确认数据库中有数据

### 问题：修改后不生效

**解决方案：**
1. 检查保存是否成功（查看通知）
2. 刷新前端页面
3. 清除浏览器缓存

---

## 📊 数据流程图

```
数据库 (Supabase)
    ↓
API 路由 (/api/*)
    ↓
前端组件 (Hero, About, Feed, Events)
    ↓
用户看到的页面

后台管理 (/admin/*)
    ↓
API 路由 (/api/*)
    ↓
数据库 (Supabase)
```

---

## ✨ 完成后的功能

现在你可以：

1. ✅ 在后台看到所有前端显示的内容
2. ✅ 在后台修改任何文字和图片
3. ✅ 修改后前端立即更新
4. ✅ 添加新的岛屿碎片和活动
5. ✅ 管理活动报名和预约
6. ✅ 查看用户提交的瓶中信

前端和后台完全同步，所有内容都可以通过"小黑的灯塔"管理！🎉

