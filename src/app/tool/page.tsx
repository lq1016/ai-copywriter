"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

type Platform = "taobao" | "xiaohongshu" | "pinduoduo" | "douyin";
type ContentType = "title" | "selling_points" | "detail" | "note";

const platformNames: Record<Platform, string> = {
  taobao: "淘宝/天猫",
  xiaohongshu: "小红书",
  pinduoduo: "拼多多",
  douyin: "抖音",
};

const contentTypeNames: Record<ContentType, string> = {
  title: "商品标题",
  selling_points: "卖点提取",
  detail: "详情页文案",
  note: "种草笔记",
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
  const [platform, setPlatform] = useState<Platform>("taobao");
  const [contentType, setContentType] = useState<ContentType>("title");

  // 生成状态
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

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
          platform,
          type: contentType,
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI电商文案生成器
          </h1>
          <p className="text-gray-600">
            10秒生成高转化商品标题和文案
          </p>

          {/* 用户信息 */}
          <div className="mt-4 flex items-center justify-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
                <span className="text-sm text-indigo-600 font-medium">
                  今日剩余：{usage.remaining}次
                </span>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                登录/注册
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入表单 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              商品信息
            </h2>

            <div className="space-y-4">
              {/* 商品名称 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  商品名称 *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例如：夏季连衣裙"
                />
              </div>

              {/* 商品特点 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  商品特点 *
                </label>
                <textarea
                  value={productFeatures}
                  onChange={(e) => setProductFeatures(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="例如：显瘦、透气、约会穿搭、适合小个子"
                />
              </div>

              {/* 价格 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  价格（可选）
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例如：128"
                />
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
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        platform === p
                          ? "bg-indigo-500 text-white"
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
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        contentType === t
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {contentTypeNames[t]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 生成按钮 */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                {loading ? "生成中..." : "生成文案"}
              </button>

              {/* 错误提示 */}
              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* 右侧：生成结果 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              生成结果
            </h2>

            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 group relative"
                  >
                    <div className="pr-10">{result}</div>
                    <button
                      onClick={() => copyToClipboard(result)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="复制"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <p>填写商品信息，点击生成按钮</p>
                <p className="text-sm mt-1">AI将为你生成专业的电商文案</p>
              </div>
            )}
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
