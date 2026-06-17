import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getTodayUsage } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const usage = getTodayUsage(user.userId);
    const limit = 5; // 免费限制

    return NextResponse.json({
      success: true,
      usage,
      limit,
      remaining: Math.max(0, limit - usage),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
