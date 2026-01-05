"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CreditCard } from "lucide-react";
import { HK_CARDS } from "@/lib/data/cards";
import { useDataset } from "@/lib/admin/data-store";

// ============ 信用卡顯示組件 ============

// 單張卡片顯示（用於 {{card:id}} 或 {{card:id|rate=xxx}}）
interface CardInlineProps {
  id: string;
  rate?: string;
}

function CardInline({ id, rate }: CardInlineProps) {
  const { cards: dbCards } = useDataset();
  const card = dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id);
  
  if (!card) {
    return <span className="text-red-500">[找不到卡片: {id}]</span>;
  }
  
  return (
    <Link 
      href={`/cards/${id}`}
      className="inline-flex items-center gap-2 px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 not-prose"
    >
      <div className={`w-8 h-5 flex-shrink-0 rounded overflow-hidden ${card.imageUrl ? 'bg-white' : (card.style?.bgColor || 'bg-gray-200')}`}>
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={32}
            height={20}
            className="w-full h-full object-contain"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CreditCard className="h-3 w-3 text-gray-400" />
          </div>
        )}
      </div>
      <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
        {card.name}
      </span>
      {rate && (
        <span className="font-bold text-green-600 dark:text-green-400 text-sm">{rate}</span>
      )}
    </Link>
  );
}

// 多張卡片列表（用於 {{card-list:id1,id2,id3}}）
interface CardListProps {
  ids: string[];
  rates?: string[]; // 可選，對應每張卡的回贈率
}

function CardList({ ids, rates }: CardListProps) {
  const { cards: dbCards } = useDataset();
  
  return (
    <div className="flex flex-wrap gap-2 my-4 not-prose">
      {ids.map((id, index) => {
        const card = dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id);
        if (!card) return null;
        
        return (
          <Link 
            key={id}
            href={`/cards/${id}`}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
          >
            <div className={`w-10 h-6 flex-shrink-0 rounded overflow-hidden ${card.imageUrl ? 'bg-white border border-gray-100' : (card.style?.bgColor || 'bg-gray-200')}`}>
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  width={40}
                  height={24}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CreditCard className="h-3 w-3 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {card.name}
              </span>
              {rates?.[index] && (
                <span className="font-bold text-green-600 dark:text-green-400 text-xs">{rates[index]}</span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// 卡片比較表格（用於 {{card-table:id1,id2,id3}}）
interface CardCompareTableProps {
  ids: string[];
  showBank?: boolean;
  showFee?: boolean;
}

function CardCompareTable({ ids, showBank = true, showFee = true }: CardCompareTableProps) {
  const { cards: dbCards } = useDataset();
  
  const cards = ids.map(id => 
    dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id)
  ).filter(Boolean);
  
  if (cards.length === 0) {
    return <div className="text-red-500">[找不到任何卡片]</div>;
  }
  
  return (
    <div className="overflow-x-auto my-6 not-prose">
      <table className="w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">信用卡</th>
            {showBank && <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">銀行</th>}
            {showFee && <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">年費</th>}
            <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">外幣手續費</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {cards.map((card: any) => (
            <tr key={card.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
              <td className="px-4 py-3">
                <Link 
                  href={`/cards/${card.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className={`w-10 h-6 flex-shrink-0 rounded overflow-hidden ${card.imageUrl ? 'bg-white border border-gray-100' : (card.style?.bgColor || 'bg-gray-200')}`}>
                    {card.imageUrl ? (
                      <Image
                        src={card.imageUrl}
                        alt={card.name}
                        width={40}
                        height={24}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className={`text-[8px] font-bold ${card.style?.textColor || 'text-gray-400'}`}>
                          {card.bank.slice(0, 3)}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    {card.name}
                  </span>
                </Link>
              </td>
              {showBank && <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{card.bank}</td>}
              {showFee && (
                <td className="px-4 py-3 text-center">
                  {card.feeWaiverCondition === "永久免年費" ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">免</span>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{card.feeWaiverCondition || "-"}</span>
                  )}
                </td>
              )}
              <td className="px-4 py-3 text-center">
                {card.foreignCurrencyFee === 0 ? (
                  <span className="text-green-600 dark:text-green-400 font-bold">0%</span>
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">{card.foreignCurrencyFee}%</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 推薦卡片格子顯示（用於 {{card-grid:id1,id2,id3}}）
interface CardGridProps {
  ids: string[];
  highlights?: string[]; // 每張卡的亮點文字
}

function CardGrid({ ids, highlights }: CardGridProps) {
  const { cards: dbCards } = useDataset();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 not-prose">
      {ids.map((id, index) => {
        const card = dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id);
        if (!card) return null;
        
        return (
          <Link 
            key={id}
            href={`/cards/${id}`}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
          >
            <div className={`w-full h-20 mb-3 rounded-lg overflow-hidden ${card.imageUrl ? 'bg-white' : (card.style?.bgColor || 'bg-gradient-to-br from-gray-200 to-gray-300')}`}>
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  width={200}
                  height={126}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CreditCard className={`h-8 w-8 ${card.style?.textColor || 'text-white'}`} />
                </div>
              )}
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{card.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{card.bank}</p>
            {highlights?.[index] && (
              <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                {highlights[index]}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

// ============ 特殊語法解析 ============

// 解析特殊語法並轉換為 React 組件
function parseCardSyntax(text: string): React.ReactNode[] {
  // 匹配 {{card:xxx}}, {{card:xxx|rate=xxx}}, {{card-list:xxx,xxx}}, {{card-table:xxx,xxx}}, {{card-grid:xxx,xxx}}
  const regex = /\{\{(card|card-list|card-table|card-grid):([^}]+)\}\}/g;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  
  while ((match = regex.exec(text)) !== null) {
    // 添加匹配前的文字
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    const type = match[1];
    const params = match[2];
    
    if (type === "card") {
      // 單張卡片: {{card:id}} 或 {{card:id|rate=xxx}}
      const [id, ...rest] = params.split("|");
      let rate: string | undefined;
      rest.forEach(param => {
        const [key, value] = param.split("=");
        if (key === "rate") rate = value;
      });
      parts.push(<CardInline key={`card-${key++}`} id={id.trim()} rate={rate} />);
    } else if (type === "card-list") {
      // 卡片列表: {{card-list:id1,id2,id3}} 或 {{card-list:id1,id2|rates=5%,4%,3%}}
      const [idsStr, ...rest] = params.split("|");
      const ids = idsStr.split(",").map(s => s.trim());
      let rates: string[] | undefined;
      rest.forEach(param => {
        const [key, value] = param.split("=");
        if (key === "rates") rates = value.split(",").map(s => s.trim());
      });
      parts.push(<CardList key={`list-${key++}`} ids={ids} rates={rates} />);
    } else if (type === "card-table") {
      // 比較表格: {{card-table:id1,id2,id3}}
      const ids = params.split(",").map(s => s.trim());
      parts.push(<CardCompareTable key={`table-${key++}`} ids={ids} />);
    } else if (type === "card-grid") {
      // 格子顯示: {{card-grid:id1,id2,id3}} 或 {{card-grid:id1,id2|highlights=5%,4%}}
      const [idsStr, ...rest] = params.split("|");
      const ids = idsStr.split(",").map(s => s.trim());
      let highlights: string[] | undefined;
      rest.forEach(param => {
        const [key, value] = param.split("=");
        if (key === "highlights") highlights = value.split(",").map(s => s.trim());
      });
      parts.push(<CardGrid key={`grid-${key++}`} ids={ids} highlights={highlights} />);
    }
    
    lastIndex = regex.lastIndex;
  }
  
  // 添加剩餘的文字
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts;
}

// ============ 主組件：CardMarkdownRenderer ============

interface CardMarkdownRendererProps {
  content: string;
  className?: string;
}

export function CardMarkdownRenderer({ content, className = "" }: CardMarkdownRendererProps) {
  // 先將特殊語法提取出來，用佔位符替代
  const { processedContent, cardComponents } = useMemo(() => {
    const components: Map<string, React.ReactNode> = new Map();
    let counter = 0;
    
    // 替換所有特殊語法為佔位符
    const regex = /\{\{(card|card-list|card-table|card-grid):([^}]+)\}\}/g;
    const processed = content.replace(regex, (match, type, params) => {
      const placeholder = `__CARD_COMPONENT_${counter++}__`;
      
      if (type === "card") {
        const [id, ...rest] = params.split("|");
        let rate: string | undefined;
        rest.forEach((param: string) => {
          const [key, value] = param.split("=");
          if (key === "rate") rate = value;
        });
        components.set(placeholder, <CardInline key={placeholder} id={id.trim()} rate={rate} />);
      } else if (type === "card-list") {
        const [idsStr, ...rest] = params.split("|");
        const ids = idsStr.split(",").map((s: string) => s.trim());
        let rates: string[] | undefined;
        rest.forEach((param: string) => {
          const [key, value] = param.split("=");
          if (key === "rates") rates = value.split(",").map((s: string) => s.trim());
        });
        components.set(placeholder, <CardList key={placeholder} ids={ids} rates={rates} />);
      } else if (type === "card-table") {
        const ids = params.split(",").map((s: string) => s.trim());
        components.set(placeholder, <CardCompareTable key={placeholder} ids={ids} />);
      } else if (type === "card-grid") {
        const [idsStr, ...rest] = params.split("|");
        const ids = idsStr.split(",").map((s: string) => s.trim());
        let highlights: string[] | undefined;
        rest.forEach((param: string) => {
          const [key, value] = param.split("=");
          if (key === "highlights") highlights = value.split(",").map((s: string) => s.trim());
        });
        components.set(placeholder, <CardGrid key={placeholder} ids={ids} highlights={highlights} />);
      }
      
      return placeholder;
    });
    
    return { processedContent: processed, cardComponents: components };
  }, [content]);
  
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // 處理段落，檢查是否包含佔位符
          p: ({ children }) => {
            // 如果段落只包含一個佔位符，直接返回組件
            if (typeof children === "string" && children.match(/^__CARD_COMPONENT_\d+__$/)) {
              const component = cardComponents.get(children);
              return component ? <>{component}</> : <p>{children}</p>;
            }
            
            // 如果段落包含佔位符混合文字，需要分割處理
            if (typeof children === "string" && children.includes("__CARD_COMPONENT_")) {
              const parts: React.ReactNode[] = [];
              const regex = /__CARD_COMPONENT_\d+__/g;
              let lastIndex = 0;
              let match;
              let key = 0;
              
              while ((match = regex.exec(children)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(children.slice(lastIndex, match.index));
                }
                const component = cardComponents.get(match[0]);
                if (component) {
                  parts.push(<React.Fragment key={key++}>{component}</React.Fragment>);
                }
                lastIndex = regex.lastIndex;
              }
              if (lastIndex < children.length) {
                parts.push(children.slice(lastIndex));
              }
              
              return <p>{parts}</p>;
            }
            
            // 處理 children 為數組的情況
            if (Array.isArray(children)) {
              const processedChildren = children.map((child, index) => {
                if (typeof child === "string" && child.match(/^__CARD_COMPONENT_\d+__$/)) {
                  return cardComponents.get(child) || child;
                }
                if (typeof child === "string" && child.includes("__CARD_COMPONENT_")) {
                  const parts: React.ReactNode[] = [];
                  const regex = /__CARD_COMPONENT_\d+__/g;
                  let lastIndex = 0;
                  let match;
                  let key = 0;
                  
                  while ((match = regex.exec(child)) !== null) {
                    if (match.index > lastIndex) {
                      parts.push(child.slice(lastIndex, match.index));
                    }
                    const component = cardComponents.get(match[0]);
                    if (component) {
                      parts.push(<React.Fragment key={key++}>{component}</React.Fragment>);
                    }
                    lastIndex = regex.lastIndex;
                  }
                  if (lastIndex < child.length) {
                    parts.push(child.slice(lastIndex));
                  }
                  return <React.Fragment key={index}>{parts}</React.Fragment>;
                }
                return child;
              });
              return <p>{processedChildren}</p>;
            }
            
            return <p>{children}</p>;
          },
          // 表格樣式
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">{children}</td>
          ),
          // 引用樣式
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 pl-4 py-3 my-4 rounded-r-lg text-gray-700 dark:text-gray-300 not-prose">
              {children}
            </blockquote>
          ),
          // 標題樣式
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 flex items-center gap-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">{children}</h3>
          ),
          // 分隔線
          hr: () => (
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          ),
          // 列表樣式
          ul: ({ children }) => (
            <ul className="space-y-2 my-4">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">•</span>
              <span>{children}</span>
            </li>
          ),
          ol: ({ children }) => (
            <ol className="space-y-3 my-4 list-none">{children}</ol>
          ),
          // 粗體
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
          ),
          // 圖片
          img: ({ src, alt }) => {
            const isFilename = alt && (
              alt.includes('螢幕截圖') || 
              alt.includes('Screenshot') || 
              alt.includes('Screen Shot') ||
              alt.match(/^\d+[-_]/) ||
              alt.match(/\.(png|jpg|jpeg|gif|webp)$/i)
            );
            return (
              <span className="block my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={src || ''} 
                  alt={alt || ''} 
                  className="rounded-xl max-w-full h-auto mx-auto shadow-lg border border-gray-200 dark:border-gray-700"
                  loading="lazy"
                />
                {alt && !isFilename && <span className="block text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">{alt}</span>}
              </span>
            );
          },
          // 連結
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              {children}
            </a>
          ),
          // 段落
        }}
      >{processedContent}</ReactMarkdown>
    </div>
  );
}

// ============ 導出 ============
export { CardInline, CardList, CardCompareTable, CardGrid };

