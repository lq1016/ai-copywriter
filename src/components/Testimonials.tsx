const testimonials = [
  {
    name: "小美",
    role: "淘宝卖家",
    avatar: "👩",
    rating: 5,
    content: "之前找外包写详情页要500元，现在用这个工具10秒搞定，质量还更好！强烈推荐给所有卖家！",
    result: "点击率提升150%",
  },
  {
    name: "老王",
    role: "电商代运营",
    avatar: "👨",
    rating: 5,
    content: "代运营必备！我现在一个人管20个店铺，效率提升10倍，月收入从8000涨到2万+！",
    result: "效率提升10倍",
  },
  {
    name: "琳琳",
    role: "小红书卖家",
    avatar: "👧",
    rating: 5,
    content: "小红书笔记点击率从2%涨到8%，太香了！现在每天都有人私信问链接，订单翻了3倍！",
    result: "订单翻3倍",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            听听卖家们怎么说
          </h2>
          <p className="text-lg text-gray-600">
            1000+卖家的选择，用效果说话
          </p>
        </div>

        {/* 评价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              {/* 评分 */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* 内容 */}
              <p className="text-gray-700 leading-relaxed mb-4 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* 效果标签 */}
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
                {testimonial.result}
              </div>

              {/* 用户信息 */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 社会证明 */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-indigo-600">1000+</div>
              <div className="text-sm text-gray-500 mt-1">活跃用户</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">50000+</div>
              <div className="text-sm text-gray-500 mt-1">文案生成</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">200%</div>
              <div className="text-sm text-gray-500 mt-1">平均提升</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">4.9</div>
              <div className="text-sm text-gray-500 mt-1">用户评分</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
