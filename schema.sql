-- Cloudflare D1 数据库结构 (peach-blossom-island-v0-2)
-- 表名: articles
-- 注意：如果数据库中已有 articles 表，请勿删除重建表；
-- Worker 会在启动/请求时自动检测并安全执行 ALTER TABLE 增量添加 excerpt 与 pinned 字段。

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 1,
  pinned INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
);

-- 若在 D1 控制台对已有旧表手动执行增量升级，可运行以下两条语句（Worker 也会自动检测并执行）：
-- ALTER TABLE articles ADD COLUMN excerpt TEXT NOT NULL DEFAULT '';
-- ALTER TABLE articles ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_articles_category_published
  ON articles (category, published, pinned DESC, created_at DESC);
