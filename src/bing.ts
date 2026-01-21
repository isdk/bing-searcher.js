import { FetcherOptions } from '@isdk/web-fetcher';
import { PaginationConfig, SearchOptions, WebSearcher } from '@isdk/web-searcher';

export class BingSearcher extends WebSearcher {
  static override alias = ['bing'];

  override get template(): FetcherOptions {
    return {
      engine: 'browser',
      antibot: true,
      timeoutMs: 300_000,
      browser: {
        headless: false,
      },
      debug: true,
      storage: {
        persist: true,
        purge: false,
      },
      actions: [
        { id: 'goto', params: { url: 'https://www.bing.com/search?q=${query}${extraParams}' } },
        { id: 'waitFor', params: { selector: '#b_results' } },
        { "action": "trim", "params": { "presets": "all" } },
        {
          id: 'extract',
          storeAs: 'results',
          "params": {
            "type": "array",
            "mode": { "type": "segmented", "anchor": "li.b_algo" },
            "selector": "#b_results",
            "items": {
              "url": { "selector": "h2 a", "attribute": "href", "required": true },
              "title": { "selector": "h2 a", "required": true, "mode": "innerText" },
              "snippet": { "selector": ".b_caption p, .b_algo_snippet, .b_snippet", "type": "html" }
            }
          }
        }
      ]
    };
  }

  override get pagination(): PaginationConfig {
    return {
      type: 'url-param',
      paramName: 'first',
      startValue: 1,
      increment: 10
    };
  }

  protected override formatOptions(options: SearchOptions): Record<string, any> {
    const params = new URLSearchParams();

    // Map Time Range
    if (options.timeRange) {
      if (typeof options.timeRange === 'string') {
        const timeMap: Record<string, string> = {
          day: 'ex1:"ez1"',
          week: 'ex1:"ez2"',
          month: 'ex1:"ez3"',
        };
        if (timeMap[options.timeRange]) {
          params.set('filters', timeMap[options.timeRange]);
        }
      } else {
        // Bing's custom range via URL is complex, often using filters=ex1:"ez1" style
        // For now, we only support predefined ranges or skip custom
      }
    }

    // Map Category
    // Bing uses different subdomains or paths for different categories sometimes,
    // but often it's just a parameter or tab.
    // For images/videos/news, Bing typically uses /images/search, /videos/search, /news/search

    // Map Region/Language
    if (options.region) params.set('cc', options.region);
    if (options.language) params.set('setlang', options.language);

    // Map SafeSearch
    if (options.safeSearch) {
        if (options.safeSearch === 'strict') params.set('adlt', 'strict');
        else if (options.safeSearch === 'moderate') params.set('adlt', 'demote');
        else if (options.safeSearch === 'off') params.set('adlt', 'off');
    }

    if (options.offset && options.offset > 0) {
      params.set('first', (options.offset + 1).toString());
    }

    const paramStr = params.toString();
    return {
        extraParams: paramStr ? '&' + paramStr : ''
    };
  }

  protected override async transform(outputs: Record<string, any>): Promise<any[]> {
    const results = outputs['results'] || [];
    if (!Array.isArray(results)) return [];

    return results.map(item => {
      // Clean up title and snippet
      if (item.title) item.title = item.title.trim();
      if (item.snippet) {
        // Remove all HTML tags to get clean text snippet
        item.snippet = item.snippet.replace(/<[^>]*>/g, '').trim();
      }
      return item;
    });
  }
}
