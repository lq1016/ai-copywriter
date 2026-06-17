import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

// 启用WAL模式提高性能
db.pragma('journal_mode = WAL');

// 创建用户表
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 创建使用记录表
db.exec(`
  CREATE TABLE IF NOT EXISTS usage_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    feature TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

export default db;

// 获取用户今日使用次数
export function getTodayUsage(userId: number): number {
  const today = new Date().toISOString().split('T')[0];
  const result = db.prepare(`
    SELECT COUNT(*) as count 
    FROM usage_logs 
    WHERE user_id = ? AND DATE(created_at) = ?
  `).get(userId, today) as { count: number };
  return result.count;
}

// 记录使用
export function logUsage(userId: number, feature: string): void {
  db.prepare(`
    INSERT INTO usage_logs (user_id, feature) VALUES (?, ?)
  `).run(userId, feature);
}

// 检查是否超过免费限制
export function canUseFeature(userId: number, dailyLimit: number = 5): boolean {
  const usage = getTodayUsage(userId);
  return usage < dailyLimit;
}
