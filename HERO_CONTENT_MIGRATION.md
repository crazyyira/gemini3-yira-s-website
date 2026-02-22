# Hero 首页内容管理 - 数据库迁移

## 在 Supabase SQL Editor 中执行以下 SQL

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

-- 插入默认数据（如果表为空）
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

-- 添加注释
COMMENT ON TABLE hero_content IS '首页 Hero 区域的内容';
COMMENT ON COLUMN hero_content.main_title IS '主标题';
COMMENT ON COLUMN hero_content.main_subtitle IS '副标题';
COMMENT ON COLUMN hero_content.left_card_title IS '左侧卡片标题';
COMMENT ON COLUMN hero_content.left_card_description IS '左侧卡片描述';
COMMENT ON COLUMN hero_content.right_card_title IS '右侧卡片标题';
COMMENT ON COLUMN hero_content.right_card_description IS '右侧卡片描述';
COMMENT ON COLUMN hero_content.bottom_text IS '底部文字';

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

## 验证

执行后，运行以下查询验证：

```sql
SELECT * FROM hero_content;
```

应该看到一条包含所有默认内容的记录。

