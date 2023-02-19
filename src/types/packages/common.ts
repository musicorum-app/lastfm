export type StringRecord<K extends string> = Record<K, string>

export type LastfmImageSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'extralarge'
  | 'mega'

export interface LastfmRawImage {
  size: LastfmImageSize
  '#text': string
}

export interface LastfmImage {
  size: LastfmImageSize
  url: string
}

export interface LastfmRawWikiData {
  published: string
  summary: string
  content: string
}

export interface LastfmWikiData {
  published: Date
  summary: string
  content: string
}

export type PaginatedResponseAttributes<EXTRA extends string = never> = {
  totalPages: string
  page: string
  perPage: string
  total: string
} & { [K in EXTRA]: string }

export type LastfmDate = StringRecord<'uts' | '#text'>

export type LastfmTag = StringRecord<'name' | 'url'>
