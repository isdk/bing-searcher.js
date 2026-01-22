import { describe, it, expect } from 'vitest'
import { BingSearcher } from './bing'
import { SearchOptions } from '@isdk/web-searcher'

class TestBingSearcher extends BingSearcher {
  public testFormatOptions(options: SearchOptions) {
    return this.formatOptions(options)
  }
}

describe('BingSearcher Options', () => {
  const searcher = new TestBingSearcher()

  it('should enable international explicitly', () => {
    const result = searcher.testFormatOptions({ international: true } as any)
    expect(result.extraParams).toContain('ensearch=1')
  })

  it('should not enable international if explicitly disabled', () => {
    const result = searcher.testFormatOptions({ international: false } as any)
    expect(result.extraParams).not.toContain('ensearch=1')
  })

  it('should implicitly enable international for non-CN region', () => {
    const result = searcher.testFormatOptions({ region: 'US' })
    expect(result.extraParams).toContain('ensearch=1')
    expect(result.extraParams).toContain('cc=US')
  })

  it('should not implicitly enable international for CN region', () => {
    const result = searcher.testFormatOptions({ region: 'CN' })
    expect(result.extraParams).not.toContain('ensearch=1')
    expect(result.extraParams).toContain('cc=CN')
  })

  it('should implicitly enable international for non-ZH language when region is missing', () => {
    const result = searcher.testFormatOptions({ language: 'en' })
    expect(result.extraParams).toContain('ensearch=1')
    expect(result.extraParams).toContain('setlang=en')
  })

  it('should not implicitly enable international for ZH language when region is missing', () => {
    const result = searcher.testFormatOptions({ language: 'zh-CN' })
    expect(result.extraParams).not.toContain('ensearch=1')
    expect(result.extraParams).toContain('setlang=zh-CN')
  })

  it('should respect explicit option over implicit region (Enable)', () => {
    // region=CN would normally disable it, but explicit international=true enables it
    const result = searcher.testFormatOptions({
      region: 'CN',
      international: true,
    } as any)
    expect(result.extraParams).toContain('ensearch=1')
    expect(result.extraParams).toContain('cc=CN')
  })

  it('should respect explicit option over implicit region (Disable)', () => {
    // region=US would normally enable it, but explicit international=false disables it
    const result = searcher.testFormatOptions({
      region: 'US',
      international: false,
    } as any)
    expect(result.extraParams).not.toContain('ensearch=1')
    expect(result.extraParams).toContain('cc=US')
  })

  it('should support custom date range', () => {
    // 2025/12/01-2026/01/22: filters=ex1%3a%22ez5_20423_20475%22
    const result = searcher.testFormatOptions({
      timeRange: { from: '2025/12/01', to: '2026/01/22' },
    })
    // decodeURIComponent is needed because formatOptions uses URLSearchParams which encodes double quotes
    expect(decodeURIComponent(result.extraParams)).toContain(
      'filters=ex1:"ez5_20423_20475"'
    )
  })

  it('should support custom date range with only from', () => {
    // 2024/01/01: 19723
    const from = '2024/01/01'
    const result = searcher.testFormatOptions({
      timeRange: { from },
    })
    const today = Math.floor(
      (Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000
    )
    expect(decodeURIComponent(result.extraParams)).toContain(
      `filters=ex1:"ez5_19723_${today}"`
    )
  })

  it('should support year timeRange', () => {
    const result = searcher.testFormatOptions({
      timeRange: 'year',
    })
    const toDate = new Date()
    const fromDate = new Date()
    fromDate.setFullYear(toDate.getFullYear() - 1)
    const toDays = (d: Date) =>
      Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000)
    expect(decodeURIComponent(result.extraParams)).toContain(
      `filters=ex1:"ez5_${toDays(fromDate)}_${toDays(toDate)}"`
    )
  })
})
