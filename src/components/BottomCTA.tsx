export default function BottomCTA() {
  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* 标题 */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          立即开始，免费试用
        </h2>
        
        {/* 副标题 */}
        <p className="text-xl text-white/90 mb-8">
          10秒生成高转化标题，点击率提升200%
        </p>
        
        {/* CTA按钮 */}
        <a
          href="#pricing"
          className="btn-animate inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-full text-lg shadow-lg"
        >
          免费试用 →
        </a>
        
        {/* 辅助信息 */}
        <p className="text-white/70 mt-6 text-sm">
          无需信用卡 · 每天免费5次 · 7天无理由退款
        </p>
      </div>
    </section>
  );
}
