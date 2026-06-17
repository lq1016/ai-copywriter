import { NextRequest, NextResponse } from 'next/server';
import { registerUser, loginUser } from '@/lib/auth';

// 注册
export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '请填写邮箱和密码' }, { status: 400 });
    }

    if (action === 'register') {
      const user = await registerUser(email, password);
      return NextResponse.json({ success: true, user });
    } else if (action === 'login') {
      const result = await loginUser(email, password);
      return NextResponse.json({ success: true, ...result });
    } else {
      return NextResponse.json({ error: '无效的操作' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
