const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface GenerateParams {
  productName: string;
  productFeatures: string;
  price?: string;
  targetAudience?: string;
  platform: 'taobao' | 'xiaohongshu' | 'pinduoduo' | 'douyin';
  type: 'title' | 'selling_points' | 'detail' | 'note';
  style?: 'professional' | 'casual' | 'luxury' | 'budget';
  count?: number;
}

// 平台特定的详细提示词
const platformPrompts = {
  taobao: {
    title: `淘宝商品标题，要求：
1. 包含品牌词+核心词+属性词+长尾词+促销词
2. 突出用户痛点和解决方案
3. 包含数字增加可信度（如：显瘦10斤、销量10000+）
4. 控制在30-60字
5. 包含搜索热词，提高搜索排名
6. 每个标题风格不同，覆盖不同搜索场景`,
    
    selling_points: `淘宝商品卖点，要求：
1. 提炼5-8个核心卖点
2. 每个卖点格式：主标题 + 详细描述（2-3句话）
3. 从用户角度出发，突出使用场景和效果
4. 包含数据支撑（如：98%好评率、复购率60%）
5. 解决用户常见疑虑
6. 包含对比优势（vs竞品）`,
    
    detail: `淘宝详情页文案，要求：
1. 结构清晰，包含以下模块：
   - 吸引眼球的开头（制造痛点/场景代入）
   - 商品核心卖点（3-5个，每个详细展开）
   - 使用场景展示（3-4个具体场景）
   - 用户好评精选（3-4条真实感评价）
   - 常见问题解答（4-5个Q&A）
   - 购买理由总结
2. 每个模块都要详细展开，有说服力
3. 语言专业但不失亲切
4. 总字数800-1200字`,
    
    note: `淘宝买家秀/种草文案，要求：
1. 第一人称视角，真实感强
2. 包含使用前后对比
3. 详细描述使用体验和效果
4. 包含具体使用场景
5. 语气自然，像朋友推荐
6. 200-300字`,
  },
  
  xiaohongshu: {
    title: `小红书笔记标题，要求：
1. 吸引眼球，制造好奇心
2. 包含数字和效果词（如：3天瘦5斤、100元搞定）
3. 使用emoji增加视觉吸引力
4. 包含人群标签（如：学生党、小个子、黄皮）
5. 控制在18-22字
6. 每个标题角度不同（痛点型/效果型/场景型/对比型）`,
    
    selling_points: `小红书种草卖点，要求：
1. 口语化、真实感强
2. 突出个人使用体验
3. 包含具体效果和数据
4. 使用小红书流行词汇
5. 适合配图展示
6. 每个卖点100-150字`,
    
    detail: `小红书种草笔记，要求：
1. 标题吸引眼球（含emoji）
2. 开头制造共鸣/痛点
3. 中间详细种草（分点展开，每点配emoji）
4. 使用前后对比
5. 具体使用方法/技巧
6. 结尾总结+互动引导
7. 附带相关标签（5-8个）
8. 总字数500-800字`,
    
    note: `小红书种草笔记，要求：
1. 第一人称，真实体验
2. 包含具体使用场景
3. 详细效果描述
4. 使用前后对比图描述
5. 价格和购买渠道
6. 300-500字`,
  },
  
  pinduoduo: {
    title: `拼多多商品标题，要求：
1. 突出性价比和促销信息
2. 包含价格优势词（如：工厂价、批发价、亏本清仓）
3. 包含销量/好评数据
4. 控制在40-60字
5. 包含搜索热词
6. 每个标题突出不同卖点`,
    
    selling_points: `拼多多商品卖点，要求：
1. 突出低价高质
2. 强调促销力度
3. 包含用户好评
4. 突出实用性和性价比
5. 每个卖点简洁有力`,
    
    detail: `拼多多详情页文案，要求：
1. 简洁明了，突出重点
2. 开头强调价格优势
3. 核心卖点（3-5个）
4. 商品规格参数
5. 用户好评展示
6. 售后保障说明
7. 500-800字`,
    
    note: `拼多多买家评价文案，要求：
1. 真实感强
2. 突出性价比
3. 包含使用体验
4. 100-200字`,
  },
  
  douyin: {
    title: `抖音商品标题，要求：
1. 吸引眼球，适合短视频展示
2. 突出视觉效果和使用场景
3. 包含热门话题词
4. 控制在15-25字
5. 适合口播和字幕`,
    
    selling_points: `抖音商品卖点，要求：
1. 口语化，适合视频口播
2. 节奏感强，朗朗上口
3. 突出视觉效果
4. 包含使用场景
5. 每个卖点50-80字`,
    
    detail: `抖音商品详情文案，要求：
1. 适合短视频脚本
2. 开头3秒抓住注意力
3. 中间展示产品亮点
4. 结尾引导购买
5. 300-500字`,
    
    note: `抖音种草文案，要求：
1. 口语化，节奏感强
2. 适合15-30秒视频
3. 突出产品效果
4. 包含购买引导
5. 150-250字`,
  },
};

// 风格修饰词
const styleModifiers = {
  professional: '专业、权威、可信',
  casual: '轻松、亲切、口语化',
  luxury: '高端、优雅、有格调',
  budget: '实惠、接地气、强调性价比',
};

export async function generateContent(params: GenerateParams): Promise<string[]> {
  const { productName, productFeatures, price, targetAudience, platform, type, style = 'casual', count = 5 } = params;

  if (!DEEPSEEK_API_KEY) {
    throw new Error('请配置 DEEPSEEK_API_KEY 环境变量');
  }

  const platformPrompt = platformPrompts[platform][type];
  const styleModifier = styleModifiers[style];

  const promptLines = [
    '你是一个顶级的电商文案专家，擅长为各种平台撰写高转化的商品文案。',
    '',
    '请为以下商品生成' + count + '个' + platformPrompt,
    '',
    '商品信息：',
    '- 商品名称：' + productName,
    '- 商品特点：' + productFeatures,
  ];
  
  if (price) promptLines.push('- 价格：' + price + '元');
  if (targetAudience) promptLines.push('- 目标人群：' + targetAudience);
  
  promptLines.push(
    '',
    '文案风格要求：' + styleModifier,
    '',
    '输出要求：',
    '1. 每个结果用数字编号（1. 2. 3. ...）',
    '2. 结果之间用空行分隔',
    '3. 直接输出文案内容，不要有其他说明',
    '4. 确保内容详细、有说服力、能打动用户',
    '5. 符合' + platform + '平台的调性和用户习惯',
    '6. 如果是详情页或笔记，使用分段和小标题让结构清晰'
  );
  
  const prompt = promptLines.join('\n');

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { 
          role: 'system', 
          content: '你是一个顶级的电商文案专家，拥有10年电商运营经验。你擅长撰写高转化的商品标题、提炼商品核心卖点、编写吸引人的详情页文案、创作真实的种草笔记、制作吸引眼球的广告文案、编写专业的FAQ。你的文案风格多变，能根据不同平台和目标人群调整语言风格。你深知各平台的算法规则和用户喜好。'
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI生成失败: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // 解析结果 - 按数字编号分割
  const results = content
    .split(/\n\s*\n/)
    .map((block: string) => block.trim())
    .filter((block: string) => block.length > 0)
    .map((block: string) => {
      // 移除开头的数字编号
      return block.replace(/^\d+[\.\)、]\s*/, '').trim();
    });

  return results;
}
