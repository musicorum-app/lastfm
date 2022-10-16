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

export type PaginatedResponseAttributes<EXTRA extends string = never> = {
  totalPages: string
  page: string
  perPage: string
  total: string
} & { [K in EXTRA]: string }

export type LastfmDate = StringRecord<'uts' | '#text'>
