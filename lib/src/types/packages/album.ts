import type {
  LastfmImage,
  LastfmRawImage,
  LastfmRawWikiData,
  LastfmTag,
  LastfmWikiData,
  StringRecord
} from './common'

export interface LastfmOriginalAlbumInfoTrackResponse {
  streamable: StringRecord<'fulltrack' | '#text'>
  name: string
  duration?: number
  images: LastfmRawImage[]
  artist: StringRecord<'mbid' | 'name' | 'url'>
  url: string
  '@attr'?: {
    rank: number
  }
}

export interface LastfmOriginalAlbumInfoResponse {
  album?: {
    name: string
    artist: string
    playcount: string
    listeners: string
    streamable: StringRecord<'fulltrack' | '#text'>
    image?: LastfmRawImage[]
    mbid: string
    url: string
    userplaycount?: number
    tags?: {
      tag: LastfmTag[]
    }
    wiki?: LastfmRawWikiData
    tracks?: {
      track: LastfmOriginalAlbumInfoTrackResponse[]
    }
  }
}

// album.getInfo
export interface LastfmAlbumInfoTrack {
  name: string
  duration?: number
  artist: {
    name: string
    mbid?: string
    url: string
  }
  url: string
  rank?: number
}
export interface LastfmAlbumInfo {
  name: string
  artist: string
  url: string
  images?: LastfmImage[]
  mbid?: string
  playCount: number
  listeners: number
  tags?: LastfmTag[]
  wiki?: LastfmWikiData
  tracks?: LastfmAlbumInfoTrack[]
  user?: {
    playCount: number
  }
}
/**
 * Information regarding an album (from album.getInfo).
 *
 * {@link https://www.last.fm/api/show/album.getInfo API Reference}
 */
export interface LastfmAlbumInfoParams {
  /**
   * The MusicBrainz ID for the album
   * > ⚠ **Warning**
   * > Using the `mbid` will get you the wrong track most of the time. Save yourself the trouble and don't use it.
   */
  mbid?: string
  /**
   *  Whether to correct any spelling mistakes in the artist and track names. Returns the corrected version.
   */
  autoCorrect?: boolean
  /**
   * The username for the context of the request. If supplied, the user's playcount for this album is included in the response.
   */
  username?: string
  /**
   * The language to return the biography in, expressed as an ISO 639 alpha-2 code (e.g. `es` for Spanish, `de` for German, etc).
   * > 🗒 **Note**
   * > Using a non-existent language will return undefined for the `wiki` property.
   */
  biographyLanguage?: string
}
