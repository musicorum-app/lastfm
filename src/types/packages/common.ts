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

export type Period =
  | 'overall'
  | '7day'
  | '1month'
  | '3month'
  | '6month'
  | '12month'

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

export interface PaginationAttributes {
  totalPages: number
  page: number
  perPage: number
  total: number
}

export type PaginatedResponse<I> = {
  pagination: PaginationAttributes
} & I

export type LastfmDate = StringRecord<'uts' | '#text'>

export type LastfmTag = StringRecord<'name' | 'url'>
