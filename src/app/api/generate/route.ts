import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { canUseFeature, logUsage } from '@/lib/db';
import { generateContent } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    // 验证用户
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    // 检查使用次数
    if (!canUseFeature(user.userId)) {
      return NextResponse.json({ error: '今日免费次数已用完，请升级会员' }, { status: 403 });
    }

    const params = await request.json();

    // 验证参数
    if (!params.productName || !params.productFeatures || !params.platform || !params.type) {
      return NextResponse.json({ error: '请填写完整的商品信息' }, { status: 400 });
    }

    // 生成内容
    const results = await generateContent(params);

    // 记录使用
    logUsage(user.userId, params.type);

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
