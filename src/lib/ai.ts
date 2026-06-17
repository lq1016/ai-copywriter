const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface GenerateParams {
  productName: string;
  productFeatures: string;
  price?: string;
  platform: 'taobao' | 'xiaohongshu' | 'pinduoduo' | 'douyin';
  type: 'title' | 'selling_points' | 'detail' | 'note';
}

// 平台特定的提示词
const platformPrompts = {
  taobao: {
    title: '淘宝商品标题，要求：包含核心关键词、属性词、长尾词，控制在30字以内，突出卖点和促销信息',
    selling_points: '淘宝商品卖点，要求：提炼3-5个核心卖点，每个卖点用一句话概括，突出用户痛点和解决方案',
    detail: '淘宝详情页文案，要求：包含商品介绍、核心卖点、使用场景、规格参数，结构清晰',
    note: '淘宝买家秀文案，要求：真实感、种草风格、突出使用体验',
  },
  xiaohongshu: {
    title: '小红书笔记标题，要求：吸引眼球、包含数字、制造悬念，控制在20字以内',
    selling_points: '小红书种草卖点，要求：口语化、真实感、突出使用体验和效果',
    detail: '小红书笔记正文，要求：种草风格、分段清晰、包含表情符号、结尾引导互动',
    note: '小红书种草笔记，要求：第一人称、真实体验、包含使用场景和效果对比',
  },
  pinduoduo: {
    title: '拼多多商品标题，要求：突出性价比、促销信息、控制在60字以内',
    selling_points: '拼多多商品卖点，要求：突出低价高质、促销力度、用户好评',
    detail: '拼多多详情页文案，要求：简洁明了、突出价格优势、促销信息',
    note: '拼多多买家评价文案，要求：真实感、突出性价比',
  },
  douyin: {
    title: '抖音商品标题，要求：吸引眼球、突出卖点、适合短视频展示',
    selling_points: '抖音商品卖点，要求：口语化、适合视频展示、突出视觉效果',
    detail: '抖音商品详情，要求：简洁有力、突出使用场景、适合快速浏览',
    note: '抖音种草文案，要求：口语化、适合视频口播、节奏感强',
  },
};

export async function generateContent(params: GenerateParams): Promise<string[]> {
  const { productName, productFeatures, price, platform, type } = params;

  if (!DEEPSEEK_API_KEY) {
    throw new Error('请配置 DEEPSEEK_API_KEY 环境变量');
  }

  const platformPrompt = platformPrompts[platform][type];

  const prompt = `你是一个专业的电商文案写手。请为以下商品生成${type === 'title' ? '5个' : '3个'}${platformPrompt}。

商品信息：
- 商品名称：${productName}
- 商品特点：${productFeatures}
${price ? `- 价格：${price}元` : ''}

要求：
1. 每个结果用数字编号（1. 2. 3. ...）
2. 结果之间用换行分隔
3. 直接输出文案，不要有其他说明
4. 符合${platform}平台的风格和调性`;

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: '你是一个专业的电商文案写手，擅长为各种电商平台撰写高转化的商品文案。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI生成失败: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // 解析结果
  const results = content
    .split('\n')
    .filter((line: string) => line.trim())
    .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
    .filter((line: string) => line.length > 0);

  return results;
}
