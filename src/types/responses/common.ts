export type StringRecord<K extends string> = Record<K, string>

export interface LastfmRawImage {
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega'
  '#text': string
}

export type PaginatedResponseAttributes<EXTRA extends string = never> = {
  totalPages: string
  page: string
  perPage: string
  total: string
} & { [K in EXTRA]: string }
