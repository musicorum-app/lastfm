import { LastfmImage, LastfmRawImage } from './types/packages/common'

export function parseLastfmImages(images: LastfmRawImage[]): LastfmImage[] {
  return images
    .filter((i) => !!i['#text'])
    .map((i) => ({
      size: i.size,
      url: i['#text']
    }))
}
