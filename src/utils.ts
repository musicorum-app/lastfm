import {
  LastfmImage,
  LastfmRawImage,
  PaginatedResponseAttributes,
  PaginationAttributes
} from './types/packages/common'

export function parseLastfmImages(images: LastfmRawImage[]): LastfmImage[] {
  return images
    .filter((i) => !!i['#text'])
    .map((i) => ({
      size: i.size,
      url: i['#text']
    }))
}

export function parseLastfmPagination(
  original: PaginatedResponseAttributes
): PaginationAttributes {
  return {
    page: parseInt(original.page),
    totalPages: parseInt(original.totalPages),
    perPage: parseInt(original.perPage),
    total: parseInt(original.total)
  }
}
