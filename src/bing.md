# Bing Searcher

The `BingSearcher` is a specialized search engine scraper for Bing, built on top of the `WebSearcher` framework. It uses browser-based scraping to navigate through search results effectively while handling Bing's specific features.

## Features

- **Browser-based Execution**: Uses Playwright (via `@isdk/web-fetcher`) to simulate real user behavior, helping to bypass basic anti-bot measures.
- **Pagination**: Automatically handles multi-page results using Bing's `first` parameter.
- **Data Extraction**: Extracts titles, URLs, and snippets.
- **Date Extraction**: Supports optional deep extraction of publication dates from result pages.
- **International Edition Support**: Specifically designed to handle regional redirects.

## Usage

```typescript
import { BingSearcher, WebSearcher } from '@isdk/ai-tools';

// Register if not already done
WebSearcher.register(BingSearcher);

const results = await WebSearcher.search('bing', 'typescript design patterns', {
  limit: 20,
  international: true, // Force Bing International Edition
  region: 'US',
  timeRange: 'month'
});
```

## Options

In addition to standard `SearchOptions`, `BingSearcher` supports:

| Option | Type | Description |
| :--- | :--- | :--- |
| `international` | `boolean` | If `true`, appends `ensearch=1` to the URL. This forces Bing to use the International Edition, bypassing the redirect to `cn.bing.com` in China. Defaults to `true` if `region` is not 'CN' or `language` is not 'zh'. |
| `region` | `string` | ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB'). Maps to `cc` parameter. |
| `language` | `string` | ISO 639-1 language code (e.g., 'en', 'fr'). Maps to `setlang` parameter. |
| `timeRange` | `string` | Filter by time: `'day'`, `'week'`, `'month'`. |
| `safeSearch` | `string` | `'off'`, `'moderate'`, `'strict'`. |
| `needDate` | `boolean` | If `true`, will attempt to fetch and extract publication dates for each result. |

## Implementation Details

- **Engine**: `browser` (Headless mode by default, can be configured).
- **Pagination Type**: `url-param` (parameter: `first`).
- **Selector**: Targets `#b_results` for main results and `li.b_algo` for individual items.
