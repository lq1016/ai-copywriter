const features = [
  {
    icon: "✍️",
    title: "智能标题生成",
    description: "输入商品信息，生成5个高转化标题，支持淘宝/天猫/拼多多/小红书",
    highlight: "10秒搞定",
  },
  {
    icon: "🎯",
    title: "卖点自动提取",
    description: "AI分析商品描述，自动提炼核心卖点，让你的商品更有吸引力",
    highlight: "AI智能",
  },
  {
    icon: "📄",
    title: "详情页文案",
    description: "一键生成结构化详情页文案，包含产品介绍、卖点、使用场景等",
    highlight: "专业模板",
  },
  {
    icon: "📱",
    title: "小红书笔记",
    description: "生成种草风格笔记文案，包含标题、正文、标签，提升互动率",
    highlight: "爆款公式",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            一站式电商文案解决方案
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            从标题到详情页，从淘宝到小红书，AI帮你搞定所有文案
          </p>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 group"
            >
              {/* 图标 */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              
              {/* 标题 */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              {/* 高亮标签 */}
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full mb-3">
                {feature.highlight}
              </span>
              
              {/* 描述 */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 功能预览 */}
        <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                看看AI是如何工作的
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span className="text-gray-700">输入商品名称和基本信息</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span className="text-gray-700">AI自动分析商品特点和卖点</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span className="text-gray-700">一键生成高转化标题和文案</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span className="text-gray-700">复制粘贴，直接使用</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  输入示例
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                  <p>商品：夏季连衣裙</p>
                  <p>特点：显瘦、透气、约会穿搭</p>
                  <p>价格：128元</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  AI生成结果
                </div>
                <div className="space-y-2">
                  <div className="bg-indigo-50 rounded-lg p-3 text-sm text-indigo-700">
                    1. 小个子显高！约会穿这条裙子被夸了3遍
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3 text-sm text-indigo-700">
                    2. 显瘦10斤！微胖姐妹的夏日救星
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3 text-sm text-indigo-700">
                    3. 128元买到约会战裙！闺蜜都问链接
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
