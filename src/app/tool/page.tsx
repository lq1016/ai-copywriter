"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

type Platform = "taobao" | "xiaohongshu" | "pinduoduo" | "douyin";
type ContentType = "title" | "selling_points" | "detail" | "note";
type StyleType = "professional" | "casual" | "luxury" | "budget";

const platformNames: Record<Platform, string> = {
  taobao: "淘宝/天猫",
  xiaohongshu: "小红书",
  pinduoduo: "拼多多",
  douyin: "抖音",
};

const contentTypeNames: Record<ContentType, { name: string; desc: string }> = {
  title: { name: "商品标题", desc: "高转化搜索标题" },
  selling_points: { name: "卖点提炼", desc: "核心卖点文案" },
  detail: { name: "详情页文案", desc: "完整详情页内容" },
  note: { name: "种草笔记", desc: "真实种草文案" },
};

const styleNames: Record<StyleType, string> = {
  professional: "专业权威",
  casual: "轻松亲切",
  luxury: "高端优雅",
  budget: "实惠接地气",
};

export default function ToolPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [usage, setUsage] = useState({ usage: 0, limit: 5, remaining: 5 });

  // 表单状态
  const [productName, setProductName] = useState("");
  const [productFeatures, setProductFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [platform, setPlatform] = useState<Platform>("taobao");
  const [contentType, setContentType] = useState<ContentType>("title");
  const [style, setStyle] = useState<StyleType>("casual");
  const [count, setCount] = useState(5);

  // 生成状态
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [expandedResults, setExpandedResults] = useState<number[]>([]);

  // 检查登录状态
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUsage(savedToken);
    }
  }, []);

  // 获取使用次数
  const fetchUsage = async (authToken: string) => {
    try {
      const response = await fetch("/api/usage", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsage(data);
      }
    } catch (err) {
      console.error("获取使用次数失败:", err);
    }
  };

  // 登录成功回调
  const handleAuth = (newToken: string, newUser: { id: number; email: string }) => {
    setToken(newToken);
    setUser(newUser);
    setShowAuth(false);
    fetchUsage(newToken);
  };

  // 生成内容
  const handleGenerate = async () => {
    if (!token) {
      setShowAuth(true);
      return;
    }

    if (!productName || !productFeatures) {
      setError("请填写商品名称和特点");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setExpandedResults([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productName,
          productFeatures,
          price: price || undefined,
          targetAudience: targetAudience || undefined,
          platform,
          type: contentType,
          style,
          count,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "生成失败");
      }

      setResults(data.results);
      fetchUsage(token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 复制到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("已复制到剪贴板");
  };

  // 切换展开/收起
  const toggleExpand = (index: number) => {
    setExpandedResults(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI电商文案生成器
          </h1>
          <p className="text-lg text-gray-600">
            一键生成高转化商品标题、详情页、种草笔记
          </p>

          {/* 用户信息 */}
          <div className="mt-4 flex items-center justify-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                  {user.email}
                </span>
                <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">
                  今日剩余：{usage.remaining}次
                </span>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors"
              >
                登录/注册 使用全部功能
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左侧：输入表单 */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">📝</span>
                商品信息
              </h2>

              <div className="space-y-4">
                {/* 商品名称 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    商品名称 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="例如：夏季新款连衣裙"
                  />
                </div>

                {/* 商品特点 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    商品特点 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={productFeatures}
                    onChange={(e) => setProductFeatures(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    rows={3}
                    placeholder="例如：显瘦、透气、冰丝面料、适合小个子、约会穿搭"
                  />
                </div>

                {/* 价格和目标人群 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      价格（可选）
                    </label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="128"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      目标人群（可选）
                    </label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="小个子女生"
                    />
                  </div>
                </div>

                {/* 平台选择 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    目标平台
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(platformNames) as Platform[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                          platform === p
                            ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {platformNames[p]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 内容类型 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    内容类型
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(contentTypeNames) as ContentType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setContentType(t)}
                        className={`py-2.5 px-3 rounded-lg text-left transition-all ${
                          contentType === t
                            ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <div className="text-sm font-medium">{contentTypeNames[t].name}</div>
                        <div className={`text-xs ${contentType === t ? 'text-indigo-100' : 'text-gray-500'}`}>
                          {contentTypeNames[t].desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 文案风格 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    文案风格
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(styleNames) as StyleType[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                          style === s
                            ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {styleNames[s]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 生成数量 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    生成数量：{count}个
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* 生成按钮 */}
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      生成中...
                    </span>
                  ) : (
                    "生成文案"
                  )}
                </button>

                {/* 错误提示 */}
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧：生成结果 */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[600px]">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">✨</span>
                生成结果
              </h2>

              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-colors"
                    >
                      {/* 结果头部 */}
                      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                        <span className="text-sm font-medium text-gray-700">
                          方案 {index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-gray-500 hover:text-indigo-600 text-sm"
                          >
                            {expandedResults.includes(index) ? "收起" : "展开"}
                          </button>
                          <button
                            onClick={() => copyToClipboard(result)}
                            className="text-gray-500 hover:text-indigo-600"
                            title="复制"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* 结果内容 */}
                      <div className={`p-4 ${!expandedResults.includes(index) && result.length > 200 ? 'max-h-[150px] overflow-hidden relative' : ''}`}>
                        <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                          {result}
                        </div>
                        {!expandedResults.includes(index) && result.length > 200 && (
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* 复制全部按钮 */}
                  <button
                    onClick={() => copyToClipboard(results.join("\n\n"))}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                  >
                    复制全部结果
                  </button>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <svg className="w-20 h-20 mx-auto mb-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-500 mb-2">填写商品信息，开始生成</p>
                  <p className="text-sm">AI将为你生成专业的电商文案</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 登录弹窗 */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuth={handleAuth}
      />
    </div>
  );
}
