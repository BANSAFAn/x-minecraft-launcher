import useSWRV from 'swrv'
import { useSWRVConfig } from './swrvConfig'

export interface PlayPageImage {
  title: string
  url: string
}

export interface NewsPageImage {
  title: string
  url: string
  dimensions: {
    width: number
    height: number
  }

}
export interface NewsItem {
  title: string
  tag: string
  category: string
  date: string
  text: string
  playPageImage: PlayPageImage
  newsPageImage: NewsPageImage
  readMoreLink: string
  cardBorder: boolean
  newsType: string[]
  id: string
}
export function useMojangNews() {
  const { data, error, isValidating, mutate } = useSWRV('/news', async () => {
    const resp = await fetch('https://launchercontent.mojang.com/v2/news.json')
    const result: { version: number; entries: NewsItem[] } = await resp.json()
    if (result.version === 1) {
      const entries = result.entries.filter(e => e.category === 'Minecraft: Java Edition')
      for (const e of entries) {
        e.newsPageImage.url = new URL(e.newsPageImage.url, 'https://launchercontent.mojang.com').toString()
        e.playPageImage.url = new URL(e.playPageImage.url, 'https://launchercontent.mojang.com').toString()
      }
      return entries
    } else {
    // error
      return []
    }
  }, useSWRVConfig())
  const news = computed(() => data.value || [] as NewsItem[])
  return {
    news,
    isValidating,
    mutate,
    error,
  }
}
