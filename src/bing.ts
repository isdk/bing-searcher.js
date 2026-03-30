import pLimit from 'p-limit'
import type { FetcherOptions } from '@isdk/web-fetcher'
import {
  PaginationConfig,
  SearchOptions,
  WebSearcher,
} from '@isdk/web-searcher'
import { extractDate } from '@isdk/web-searcher'

export class BingSearcher extends WebSearcher {
  // the search engine name is case sensitive, the formal name is Bing from class name.
  static override alias = ['bing']

  override get template(): FetcherOptions {
    return {
      engine: 'browser',
      antibot: true,
      timeoutMs: 300_000,
      browser: {
        headless: false,
        launchOptions: {
          slowMo: 800,
        },
      },
      // debug: true,
      storage: {
        persist: true,
        purge: false,
      },
      actions: [
        {
          id: 'goto',
          params: {
            url: 'https://www.bing.com/',
            // url: 'https://www.bing.com/search?q=${query}${extraParams}',
          },
        },
        { id: 'waitFor', params: { selector: '#sb_form_q', ms: 1000 } },
        { id: 'mouseClick', params: { selector: '#sb_form_q' } },
        { id: 'keyboardType', params: { text: '${query}' } },
        { id: 'keyboardPress', params: { key: 'Enter' } },
        { id: 'waitFor', params: { networkIdle: true, ms: 1000 } },
        { id: 'waitFor', params: { selector: '#b_results' } },
        { id: 'waitFor', params: { networkIdle: true, ms: 1000 } },
        { action: 'trim', params: { presets: 'all' } },
        {
          id: 'extract',
          storeAs: 'results',
          params: {
            type: 'array',
            mode: { type: 'segmented', anchor: 'li.b_algo' },
            selector: '#b_results',
            items: {
              url: { selector: 'h2 a', attribute: 'href', required: true },
              title: { selector: 'h2 a', required: true, mode: 'innerText' },
              snippet: {
                selector: '.b_caption p, .b_algo_snippet, .b_snippet',
                type: 'html',
              },
            },
          },
        },
      ],
    }
  }

  override get pagination(): PaginationConfig {
    return {
      type: 'url-param',
      paramName: 'first',
      startValue: 1,
      increment: 10,
    }
  }

  protected override formatOptions(
    options: SearchOptions
  ): Record<string, any> {
    const params = new URLSearchParams()

    // Map Time Range
    if (options.timeRange) {
      if (typeof options.timeRange === 'string') {
        const timeMap: Record<string, string> = {
          hour: 'ex1:"ez1"', // Fallback to day
          day: 'ex1:"ez1"',
          week: 'ex1:"ez2"',
          month: 'ex1:"ez3"',
        }
        if (timeMap[options.timeRange]) {
          params.set('filters', timeMap[options.timeRange])
        } else if (options.timeRange === 'year') {
          const toDays = (d: Date) =>
            Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000)
          const toDate = new Date()
          const fromDate = new Date()
          fromDate.setFullYear(toDate.getFullYear() - 1)
          params.set(
            'filters',
            `ex1:"ez5_${toDays(fromDate)}_${toDays(toDate)}"`
          )
        }
      } else {
        // Custom Range
        // 2025/12/01-2026/01/22: filters=ex1:"ez5_20423_20475"
        const fromDate = new Date(options.timeRange.from)
        const toDate = options.timeRange.to
          ? new Date(options.timeRange.to)
          : new Date()

        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
          const toDays = (d: Date) =>
            Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000)
          params.set(
            'filters',
            `ex1:"ez5_${toDays(fromDate)}_${toDays(toDate)}"`
          )
        }
      }
    }

    // Map Category
    // Bing uses different subdomains or paths for different categories sometimes,
    // but often it's just a parameter or tab.
    // For images/videos/news, Bing typically uses /images/search, /videos/search, /news/search

    // Map Region/Language
    if (options.region) params.set('cc', options.region)
    if (options.language) params.set('setlang', options.language)

    let enableEnsearch = false
    // Use 'international' as the public user-friendly option name
    const explicit = (options as any).international ?? (options as any).ensearch

    if (explicit !== undefined) {
      enableEnsearch = !!explicit
    } else {
      if (options.region) {
        if (options.region.toUpperCase() !== 'CN') enableEnsearch = true
      } else if (options.language) {
        if (!options.language.toLowerCase().startsWith('zh'))
          enableEnsearch = true
      }
    }
    if (enableEnsearch) params.set('ensearch', '1')

    // Map SafeSearch
    if (options.safeSearch) {
      if (options.safeSearch === 'strict') params.set('adlt', 'strict')
      else if (options.safeSearch === 'moderate') params.set('adlt', 'demote')
      else if (options.safeSearch === 'off') params.set('adlt', 'off')
    }

    if (options.offset && options.offset > 0) {
      params.set('first', (options.offset + 1).toString())
    }

    const paramStr = params.toString()
    return {
      extraParams: paramStr ? '&' + paramStr : '',
    }
  }

  override async transform(
    outputs: Record<string, any>,
    options: SearchOptions = {}
  ): Promise<any[]> {
    const results = outputs['results'] || []
    if (!Array.isArray(results)) return []

    const processedResults = results.map((item) => {
      // Clean up title and snippet
      if (item.title) item.title = item.title.trim()
      if (item.snippet) {
        // Remove all HTML tags to get clean text snippet
        item.snippet = item.snippet.replace(/<[^>]*>/g, '').trim()
      }
      return item
    })

    if (options.needDate) {
      const limit = pLimit(options.concurrency || 5)
      const tasks = processedResults.map((item) =>
        limit(async () => {
          if (item.url) {
            try {
              const date = await extractDate(item.url, { timeout: 5000 })
              if (date) {
                item.date = date
              }
            } catch (e) {
              // Ignore extraction errors for individual items
            }
          }
        })
      )
      await Promise.all(tasks)
    }

    return processedResults
  }
}
