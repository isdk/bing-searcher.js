import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { WebSearcher } from '@isdk/web-searcher';
import { BingSearcher } from './bing';

// Run this test only if the environment variable RunNetworkTests is set to 'true'
const runRealNetworkTests = process.env.RunNetworkTests === 'true';

describe.skipIf(!runRealNetworkTests)('Bing Search Engine (Live)', () => {
  beforeAll(() => {
    WebSearcher.register(BingSearcher);
  });
  afterAll(() => {
    WebSearcher.unregister(BingSearcher);
  });

  it('should fetch real results from Bing', async () => {
    const limit = 5;
    const results = await WebSearcher.search('bing', 'typescript', {
      limit,
      timeoutMs: 3_000_000
    });

    console.log(`Successfully fetched ${results.length} results from Bing.`);
    if (results.length > 0) {
      console.log('results:', results);
    }

    expect(results.length).toBe(limit);

    results.forEach(item => {
      expect(item.title).toBeDefined();
      expect(item.url).toMatch(/^https?:\/\//);
    });
  }, 3_000_000);

  it('should fetch real results from Bing with time range', async () => {
    const limit = 5;
    const results = await WebSearcher.search('bing', 'typescript', {
      limit,
      timeRange: 'day',
      timeoutMs: 3_000_000
    });

    console.log(`Successfully fetched ${results.length} results from Bing with time range.`);
    if (results.length > 0) {
      console.log('results:', results);
    }

    expect(results.length).toBeGreaterThan(0);

    results.forEach(item => {
      expect(item.title).toBeDefined();
      expect(item.url).toMatch(/^https?:\/\//);
    });
  }, 3_000_000);

  it('should fetch real results from Bing with date extraction', async () => {
    const limit = 3;
    const results = await WebSearcher.search('bing', 'typescript news', {
      limit,
      needDate: true,
      timeoutMs: 3_000_000
    });

    console.log(`Successfully fetched ${results.length} results from Bing with date extraction.`);
    if (results.length > 0) {
      results.forEach((r, i) => {
        console.log(`Result ${i + 1}:`);
        console.log(`  Title: ${r.title}`);
        console.log(`  URL:   ${r.url}`);
        console.log(`  Date:  ${r.date || 'null'}`);
      });
    }

    expect(results.length).toBeGreaterThan(0);

    // Some results might not have dates if they are very static or block crawlers,
    // but at least some should have them for 'news' queries.
    const dates = results.map(r => r.date).filter(Boolean);
    console.log('Found dates:', dates);
    // Verify at least one result has a date detected
    expect(dates.length).toBeGreaterThan(0);

    results.forEach(item => {
      expect(item.title).toBeDefined();
      expect(item.url).toMatch(/^https?:\/\//);
      if (item.date) {
        // Should be ISO string if found
        expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      }
    });
  }, 3_000_000);
});
