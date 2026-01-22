# Bing 搜索器 (Bing Searcher)

`BingSearcher` 是一个专门为 Bing 开发的搜索引擎抓取工具，基于 `WebSearcher` 框架构建。它通过模拟浏览器行为来高效地获取搜索结果，并支持 Bing 的多种特有功能。

## 特性

- **基于浏览器执行**: 使用 Playwright (通过 `@isdk/web-fetcher`) 模拟真实用户行为，有效绕过基础的反爬虫检测。
- **自动分页**: 自动处理多页结果抓取（通过 Bing 的 `first` 参数）。
- **数据提取**: 精准提取标题 (title)、链接 (url) 和摘要 (snippet)。
- **日期提取**: 支持可选的深度提取，从目标网页中获取发布日期。
- **国际版支持**: 专门优化了针对区域重定向的处理。

## 使用方法

```typescript
import { BingSearcher, WebSearcher } from '@isdk/ai-tools';

// 注册引擎 (如果尚未注册)
WebSearcher.register(BingSearcher);

const results = await WebSearcher.search('bing', 'typescript 设计模式', {
  limit: 20,
  international: true, // 强制开启 Bing 国际版
  region: 'US',
  timeRange: 'month'
});
```

## 配置选项

除了标准的 `SearchOptions` 外，`BingSearcher` 还支持以下特定选项：

| 选项 | 类型 | 说明 |
| :--- | :--- | :--- |
| `international` | `boolean` | 是否开启国际版。如果为 `true`，会在 URL 中添加 `ensearch=1`。这能强制 Bing 使用国际版界面和结果，解决中国大陆用户被自动重定向到 `cn.bing.com` 的问题。当 `region` 不是 'CN' 或 `language` 不是 'zh' 时，默认自动开启。 |
| `region` | `string` | 地区代码 (ISO 3166-1 alpha-2，如 'US', 'UK')。映射为 `cc` 参数。 |
| `language` | `string` | 语言代码 (ISO 639-1，如 'en', 'zh-CN')。映射为 `setlang` 参数。 |
| timeRange | `string \| object` | 时间范围过滤：支持 `'day'` (一天内), `'week'` (一周内), `'month'` (一月内), `'year'` (一年内)。也支持自定义范围对象：`{ from: string, to?: string }`。 |
| `safeSearch` | `string` | 安全搜索级别：`'off'`, `'moderate'`, `'strict'`。 |
| `needDate` | `boolean` | 是否需要提取发布日期。设为 `true` 会对每个结果页面进行异步抓取以分析日期。 |

## 实现细节

- **引擎类型**: `browser` (默认无头模式，可配置)。
- **分页模式**: `url-param` (参数名: `first`)。
- **选择器**: 使用 `#b_results` 定位结果列表，`li.b_algo` 定位具体条目。
