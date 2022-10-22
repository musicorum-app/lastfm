import { LastfmImage, LastfmRawImage } from './types/packages/common'
import { LastfmErrorResponse } from './types/responses'

export function isLastfmError(error: unknown): error is LastfmErrorResponse {
  return (
    !!error &&
    typeof error === 'object' &&
    'error' in error &&
    'message' in error
  )
}

export function parseLastfmImages(images: LastfmRawImage[]): LastfmImage[] {
  return images
    .filter((i) => !!i['#text'])
    .map((i) => ({
      size: i.size,
      url: i['#text']
    }))
}
