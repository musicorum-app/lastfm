import type {
  LastfmImage,
  LastfmRawImage,
  LastfmRawWikiData,
  LastfmTag,
  LastfmWikiData
} from './common'

export interface LastfmOriginalArtistInfoSimilarArtistResponse {
  name: string
  image?: LastfmRawImage[]
  url: string
}

export interface LastfmOriginalArtistInfoResponse {
  artist?: {
    name: string
    image?: LastfmRawImage[]
    mbid?: string
    url: string
    streamable: '0' | '1'
    ontour: '0' | '1'
    stats: {
      listeners: string
      playcount: string
      userplaycount?: string
    }
    similar?: {
      artist: LastfmOriginalArtistInfoSimilarArtistResponse[]
    }
    tags?: {
      tag: LastfmTag[]
    }
    bio?: LastfmRawWikiData
  }
}

// artist.getInfo
export interface LastfmArtistInfoSimilarArtist {
  name: string
  url: string
  images?: LastfmImage[]
}
export interface LastfmArtistInfo {
  name: string
  mbid?: string
  url: string
  images?: LastfmImage[]
  streamable: boolean
  onTour: boolean
  listeners: number
  playCount: number
  user?: {
    playCount: number
  }
  similarArtists?: LastfmArtistInfoSimilarArtist[]
  tags?: LastfmTag[]
  wiki?: LastfmWikiData
}

/**
 * Information regarding an artist (from artist.getInfo).
 *
 * {@link https://www.last.fm/api/show/artist.getInfo API Reference}
 */
export interface LastfmArtistInfoParams {
  /**
   * The MusicBrainz ID for the artist
   * > ⚠ **Warning**
   * > Using the `mbid` will get you the wrong track most of the time. Save yourself the trouble and don't use it.
   */
  mbid?: string
  /**
   *  Whether to correct any spelling mistakes in the artist name. Returns the corrected version.
   */
  autoCorrect?: boolean
  /**
   * The username for the context of the request. If supplied, the user's playcount for this artist is included in the response.
   */
  username?: string
  /**
   * The language to return the biography in, expressed as an ISO 639 alpha-2 code (e.g. `es` for Spanish, `de` for German, etc).
   * > 🗒 **Note**
   * > Using a non-existent language will return undefined for the `wiki` property.
   */
  biographyLanguage?: string
}
