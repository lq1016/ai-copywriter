const painPoints = [
  {
    emoji: "😫",
    pain: "写标题想半小时，还写不好",
    solution: "AI 10秒生成5个专业标题",
  },
  {
    emoji: "💰",
    pain: "找外包写文案，500-2000元/个",
    solution: "29元/月，无限次使用",
  },
  {
    emoji: "📉",
    pain: "标题没吸引力，点击率低",
    solution: "按高转化公式自动生成",
  },
];

export default function PainPoints() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            你是不是也遇到这些问题？
          </h2>
          <p className="text-lg text-gray-600">
            别担心，AI帮你解决
          </p>
        </div>

        {/* 痛点卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((item, index) => (
            <div
              key={index}
              className="card-hover bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              {/* 痛点 */}
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {item.pain}
              </h3>
              
              {/* 分割线 */}
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4"></div>
              
              {/* 解决方案 */}
              <p className="text-indigo-600 font-medium">
                ✨ {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
