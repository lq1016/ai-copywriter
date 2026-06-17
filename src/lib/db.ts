// 内存数据库（Vercel serverless环境）
// 注意：每次部署后数据会重置，生产环境建议使用Supabase或Vercel KV

interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
}

interface UsageLog {
  id: number;
  user_id: number;
  feature: string;
  created_at: string;
}

// 内存存储
const users: User[] = [];
const usageLogs: UsageLog[] = [];
let userIdCounter = 1;
let usageIdCounter = 1;

// 获取用户今日使用次数
export function getTodayUsage(userId: number): number {
  const today = new Date().toISOString().split('T')[0];
  return usageLogs.filter(
    (log) => log.user_id === userId && log.created_at.startsWith(today)
  ).length;
}

// 记录使用
export function logUsage(userId: number, feature: string): void {
  usageLogs.push({
    id: usageIdCounter++,
    user_id: userId,
    feature,
    created_at: new Date().toISOString(),
  });
}

// 检查是否超过免费限制
export function canUseFeature(userId: number, dailyLimit: number = 5): boolean {
  const usage = getTodayUsage(userId);
  return usage < dailyLimit;
}

// 查找用户
export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

// 创建用户
export function createUser(email: string, hashedPassword: string): User {
  const user: User = {
    id: userIdCounter++,
    email,
    password: hashedPassword,
    created_at: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export default {
  getTodayUsage,
  logUsage,
  canUseFeature,
  findUserByEmail,
  createUser,
};
