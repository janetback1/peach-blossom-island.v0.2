-- Cloudflare D1 数据库结构 (peach-blossom-island-v0-2)
-- 表名: articles

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_articles_category_published
  ON articles (category, published, created_at DESC);
