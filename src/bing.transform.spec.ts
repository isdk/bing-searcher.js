import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BingSearcher } from './bing.js';

// Mock the extractor
vi.mock('./extractor/index.js', () => ({
  extractDate: vi.fn(),
}));

import { extractDate } from './extractor/index.js';

describe('BingSearcher.transform', () => {
  let searcher: BingSearcher;

  beforeEach(() => {
    searcher = new BingSearcher();
    vi.clearAllMocks();
  });

  it('should clean up title and snippet', async () => {
    const outputs = {
      results: [
        {
          title: '  My Title  ',
          snippet: '<b>Bold</b> text with <a href="#">link</a>',
          url: 'https://example.com'
        }
      ]
    };

    const results = await searcher.transform(outputs);

    expect(results[0].title).toBe('My Title');
    expect(results[0].snippet).toBe('Bold text with link');
  });

  it('should not extract dates by default', async () => {
    const outputs = {
      results: [{ title: 'Title', url: 'https://example.com' }]
    };

    const results = await searcher.transform(outputs);

    expect(extractDate).not.toHaveBeenCalled();
    expect(results[0].date).toBeUndefined();
  });

  it('should extract dates when needDate is true', async () => {
    const outputs = {
      results: [
        { title: 'Result 1', url: 'https://a.com' },
        { title: 'Result 2', url: 'https://b.com' }
      ]
    };

    (extractDate as any)
      .mockResolvedValueOnce('2024-01-20T12:00:00.000Z')
      .mockResolvedValueOnce('2024-01-21T12:00:00.000Z');

    const results = await searcher.transform(outputs, { needDate: true });

    expect(extractDate).toHaveBeenCalledTimes(2);
    expect(results[0].date).toBe('2024-01-20T12:00:00.000Z');
    expect(results[1].date).toBe('2024-01-21T12:00:00.000Z');
  });

  it('should handle errors in date extraction gracefully', async () => {
    const outputs = {
      results: [{ title: 'Title', url: 'https://error.com' }]
    };

    (extractDate as any).mockRejectedValue(new Error('Network error'));

    const results = await searcher.transform(outputs, { needDate: true });

    expect(results[0].date).toBeUndefined(); // Should not crash
  });

  it('should handle missing results', async () => {
    const results = await searcher.transform({});
    expect(results).toEqual([]);
  });
});
