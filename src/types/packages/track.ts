import type {
  LastfmImage,
  LastfmRawImage,
  LastfmRawWikiData,
  LastfmTag,
  LastfmWikiData,
  StringRecord
} from './common'

export interface LastfmOriginalTrackInfoResponse {
  track?: {
    artist: StringRecord<'mbid' | 'name' | 'url'>
    streamable: StringRecord<'fulltrack' | '#text'>
    image?: LastfmRawImage[]
    mbid?: string
    album?: {
      artist: string
      title: string
      url: string
      image?: LastfmRawImage[]
    }
    name: string
    duration: string
    listeners: string
    playcount: string
    url: string
    userplaycount?: string
    userloved?: '0' | '1'
    toptags?: {
      tag: LastfmTag[]
    }
    wiki?: LastfmRawWikiData
  }
}

// track.getInfo
export interface LastfmTrackInfo {
  name: string
  mbid?: string
  url: string
  artist: {
    name: string
    mbid?: string
    url: string
  }
  album?: {
    name: string
    artist: string
    url: string
    images?: LastfmImage[]
  }
  duration?: number
  listeners: number
  playCount: number
  tags?: LastfmTag[]
  user?: {
    playCount: number
    loved: boolean
  }
  wiki?: LastfmWikiData
}

// track.getInfo
/**
 * Information regarding a track (from track.getInfo).
 *
 * {@link https://www.last.fm/api/show/track.getInfo API Reference}
 */
export interface LastfmTrackInfoParams {
  /**
   * The MusicBrainz ID for the track
   * > ⚠ **Warning**
   * > Using the `mbid` will get you the wrong track most of the time. Save yourself the trouble and don't use it.
   */
  mbid?: string
  /**
   *  Whether to correct any spelling mistakes in the artist and track names. Returns the corrected version.
   */
  autoCorrect?: boolean
  /**
   * The username for the context of the request. If supplied, the user's playcount for this track and whether they have loved the track is included in the response.
   */
  username?: string
}
