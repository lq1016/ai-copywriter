"use client";

import { useState } from "react";

const faqs = [
  {
    question: "生成的文案可以直接用吗？",
    answer: "可以！我们的AI基于大量高转化文案训练，生成的文案质量很高。建议根据实际情况微调，比如加入你的品牌词或特定卖点。",
  },
  {
    question: "支持哪些电商平台？",
    answer: "支持淘宝、天猫、拼多多、小红书、抖音电商等主流平台。每个平台的文案风格和字数限制都不同，AI会自动适配。",
  },
  {
    question: "会不会被平台判定抄袭？",
    answer: "不会！每次生成都是AI原创内容，不是从网上复制的。而且每次生成的内容都不一样，完全不用担心重复铺货问题。",
  },
  {
    question: "可以退款吗？",
    answer: "当然！我们支持7天无理由退款。如果你对产品不满意，随时可以申请退款，没有任何隐藏费用。",
  },
  {
    question: "有免费试用吗？",
    answer: "有！我们提供每天5次免费生成，无需绑定信用卡。你可以先体验效果，满意后再升级到付费版。",
  },
  {
    question: "数据安全吗？",
    answer: "非常安全！我们不存储你的商品信息和生成内容，所有数据都经过加密传输。你的商业机密完全受到保护。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            常见问题
          </h2>
          <p className="text-lg text-gray-600">
            有疑问？看看这里有没有你想知道的
          </p>
        </div>

        {/* FAQ列表 */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* 问题 */}
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 答案 */}
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 联系支持 */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            还有其他问题？随时联系我们
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@example.com
          </a>
        </div>
      </div>
    </section>
  );
}
