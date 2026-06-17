export default function Hero() {
  return (
    <section className="relative gradient-bg min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          已有1000+卖家在使用
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          10秒生成
          <br />
          <span className="text-yellow-300">高转化商品标题</span>
        </h1>

        {/* 副标题 */}
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
          AI帮你写淘宝/小红书文案，点击率提升200%
        </p>

        {/* CTA按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#pricing"
            className="btn-animate bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-full text-lg shadow-lg"
          >
            免费试用 →
          </a>
          <a
            href="#features"
            className="btn-animate bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full text-lg border border-white/30"
          >
            了解更多
          </a>
        </div>

        {/* 辅助信息 */}
        <p className="text-white/70 mt-6 text-sm">
          每天免费5次 · 无需信用卡 · 7天无理由退款
        </p>

        {/* 预览图 */}
        <div className="mt-16 relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-white/20">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* 模拟工具界面 */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-500 text-sm ml-2">AI电商文案生成器</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 输入区 */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">商品信息</div>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <button className="w-full bg-indigo-500 text-white py-2 rounded-lg text-sm">
                      生成标题
                    </button>
                  </div>
                  {/* 输出区 */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">生成结果</div>
                    <div className="space-y-2">
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                        <div className="text-sm text-indigo-700">小个子显高！这条连衣裙让我被问了8遍链接</div>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                        <div className="text-sm text-indigo-700">显瘦10斤！微胖姐妹必入的连衣裙</div>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                        <div className="text-sm text-indigo-700">约会战裙！男朋友夸了3遍好看</div>
                      </div>
                    </div>
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
