const useCases = [
  {
    emoji: "🛍️",
    title: "淘宝新手",
    pain: "不会写标题，搜索流量为0",
    result: "10秒写出专业标题，流量提升3倍",
    testimonial: "之前瞎写的标题根本没人搜，现在用AI生成的标题，搜索流量真的涨了好多！",
    user: "小美 - 淘宝新手卖家",
  },
  {
    emoji: "💼",
    title: "代运营",
    pain: "管多个店铺，写文案写到崩溃",
    result: "效率提升10倍，一人管20个店",
    testimonial: "以前一天最多处理5个商品，现在50个都不在话下，月收入从8000涨到2万！",
    user: "老王 - 电商代运营",
  },
  {
    emoji: "📱",
    title: "小红书卖家",
    pain: "不会写种草笔记，互动率低",
    result: "AI生成爆款笔记，点赞提升200%",
    testimonial: "用AI写的笔记，点赞从100涨到1000+，现在每天都有人私信问链接！",
    user: "琳琳 - 小红书卖家",
  },
];

export default function UseCases() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            适合这些卖家
          </h2>
          <p className="text-lg text-gray-600">
            无论你是新手还是老手，AI都能帮你提升效率
          </p>
        </div>

        {/* 场景卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              {/* 头部 */}
              <div className="gradient-bg p-6 text-center">
                <div className="text-4xl mb-2">{useCase.emoji}</div>
                <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
              </div>
              
              {/* 内容 */}
              <div className="p-6 space-y-4">
                {/* 痛点 */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">痛点</div>
                  <div className="text-gray-700 font-medium">{useCase.pain}</div>
                </div>
                
                {/* 结果 */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">效果</div>
                  <div className="text-indigo-600 font-semibold">{useCase.result}</div>
                </div>
                
                {/* 分割线 */}
                <div className="border-t border-gray-100 pt-4">
                  {/* 评价 */}
                  <div className="text-gray-600 text-sm italic leading-relaxed">
                    &ldquo;{useCase.testimonial}&rdquo;
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    — {useCase.user}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
