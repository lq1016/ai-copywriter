import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// 注册用户
export async function registerUser(email: string, password: string) {
  // 检查邮箱是否已存在
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    throw new Error('邮箱已注册');
  }

  // 加密密码
  const hashedPassword = await bcrypt.hash(password, 10);

  // 插入用户
  const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);

  return { id: result.lastInsertRowid, email };
}

// 登录用户
export async function loginUser(email: string, password: string) {
  // 查找用户
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user) {
    throw new Error('邮箱或密码错误');
  }

  // 验证密码
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('邮箱或密码错误');
  }

  // 生成JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  return { token, user: { id: user.id, email: user.email } };
}

// 验证JWT
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
  } catch {
    throw new Error('Token无效');
  }
}

// 从请求中获取用户
export function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
