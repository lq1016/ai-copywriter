const plans = [
  {
    name: "免费版",
    price: "0",
    period: "",
    description: "适合体验和轻度使用",
    features: [
      "每天5次生成",
      "基础功能",
      "支持所有平台",
      "无需信用卡",
    ],
    notIncluded: [
      "无限次生成",
      "历史记录",
      "批量生成",
      "优先支持",
    ],
    cta: "免费试用",
    popular: false,
    highlight: "",
  },
  {
    name: "专业版",
    price: "29",
    period: "/月",
    description: "适合专业卖家和代运营",
    features: [
      "无限次生成",
      "全部功能",
      "历史记录",
      "批量生成",
      "优先支持",
      "新功能优先体验",
    ],
    notIncluded: [],
    cta: "立即升级",
    popular: true,
    highlight: "最受欢迎",
  },
  {
    name: "年付版",
    price: "199",
    period: "/年",
    description: "省149元，适合长期使用",
    features: [
      "包含专业版全部功能",
      "省149元",
      "专属客服",
      "定制功能优先",
    ],
    notIncluded: [],
    cta: "立即升级",
    popular: false,
    highlight: "最划算",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            简单透明的定价
          </h2>
          <p className="text-lg text-gray-600">
            选择适合你的方案，随时可以升级或降级
          </p>
        </div>

        {/* 价格卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-hover relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl scale-105"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {/* 标签 */}
              {plan.highlight && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium ${
                    plan.popular
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {plan.highlight}
                </div>
              )}

              {/* 名称 */}
              <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>

              {/* 价格 */}
              <div className="mb-4">
                <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  ¥{plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm ${plan.popular ? "text-white/80" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* 描述 */}
              <p className={`text-sm mb-6 ${plan.popular ? "text-white/80" : "text-gray-500"}`}>
                {plan.description}
              </p>

              {/* 功能列表 */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-yellow-300" : "text-indigo-500"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.popular ? "text-white/90" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 opacity-50">
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className={`text-sm ${plan.popular ? "text-white/60" : "text-gray-400"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA按钮 */}
              <button
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* 保证 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>7天无理由退款 · 随时取消 · 无隐藏费用</span>
          </div>
        </div>
      </div>
    </section>
  );
}
