import { LastClient } from '../LastClient.js'
import { GetFormattedResponse, LastfmResponses } from '../types/responses.js'
import { parseLastfmImages } from '../utils.js'
import { LastfmTag } from '../types/packages/common.js'
import {
  LastfmArtistInfoParams,
  LastfmArtistInfoSimilarArtist,
  LastfmOriginalArtistInfoSimilarArtistResponse
} from '../types/packages/artist'

const parseSimilarArtists = (
  similarArtists: LastfmOriginalArtistInfoSimilarArtistResponse[]
): LastfmArtistInfoSimilarArtist[] => {
  return similarArtists.map((similarArtist) => ({
    name: similarArtist.name,
    url: similarArtist.url,
    images: similarArtist.image
      ? parseLastfmImages(similarArtist.image)
      : undefined
  }))
}
export class Artist {
  constructor(private client: LastClient) {}

  async getInfo(
    artistName: string,
    params?: LastfmArtistInfoParams
  ): Promise<
    GetFormattedResponse<LastfmResponses['artist.getInfo']> | undefined
  > {
    const original = await this.client.request('artist.getInfo', {
      artist: artistName,
      mbid: params?.mbid,
      autocorrect: params?.autoCorrect === true ? '1' : '0',
      username: params?.username,
      lang: params?.biographyLanguage
    })
    if (!original.artist) return undefined

    return {
      name: original.artist.name,
      mbid: original.artist.mbid,
      url: original.artist.url,
      images: original.artist.image
        ? parseLastfmImages(original.artist.image)
        : undefined,
      streamable: original.artist.streamable === '1',
      onTour: original.artist.ontour === '1',
      listeners: parseInt(original.artist.stats.listeners),
      playCount: parseInt(original.artist.stats.playcount),
      user: original.artist.stats.userplaycount
        ? { playCount: parseInt(original.artist.stats.userplaycount) }
        : undefined,
      similarArtists: original.artist.similar?.artist
        ? parseSimilarArtists(original.artist.similar.artist)
        : undefined,
      tags: original.artist.tags?.tag as LastfmTag[],
      wiki: original.artist.bio
        ? {
            published: new Date(original.artist.bio.published),
            summary: original.artist.bio.summary,
            content: original.artist.bio.content
          }
        : undefined
    }
  }
}
