# 个人资料默认数据迁移

## 在 Supabase SQL Editor 中执行以下 SQL

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

## 验证数据

执行后，运行以下查询验证：

```sql
SELECT * FROM profile WHERE id = 1;
```

应该看到包含所有默认内容的记录。

## 说明

- 使用 `ON CONFLICT (id) DO UPDATE` 确保：
  - 如果记录不存在，则插入
  - 如果记录已存在，则更新为默认值
- 这样可以保证前端和后台显示的内容一致
- 后续可以在后台管理页面修改这些内容

