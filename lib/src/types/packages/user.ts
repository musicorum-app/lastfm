import type {
  LastfmDate,
  LastfmImage,
  LastfmRawImage,
  PaginatedResponseAttributes,
  StringRecord
} from './common'

// user.getInfo
export interface LastfmOriginalUserInfoResponse {
  user: {
    name: string
    realname: string
    url: string
    country: string
    age: string
    playcount: string
    registered: {
      unixtime: string
      '#text': number
    }
    image: LastfmRawImage[]
    bootstrap: string
    subscriber: string
    playlists: string
    type: string
    gender: string
  }
}

export interface LastfmUserInfo {
  name: string
  realName: string
  url: string
  country: string
  age: number
  playCount: number
  registered: Date
  images: LastfmImage[]
  subscriber: boolean
  gender: string
}

// user.getRecentTracks
/**
 * Recent track listened by the user (from user.getRecentTracks).
 *
 * {@link https://www.last.fm/api/show/user.getRecentTracks API Reference}
 */
export interface LastfmUserRecentTracksParams {
  /**
   * The number of results to fetch per page. Defaults to 50
   */
  limit?: number
  /**
   * The page number to fetch. Defaults to first page
   */
  page?: number
  /**
   * Beginning timestamp of a range - only display scrobbles after this time
   */
  from?: Date
  /**
   *  End timestamp of a range - only display scrobbles before this time
   */
  to?: Date
  /**
   * Extended response includes whether or not the user has loved each track
   * The API also returns images for the artists of each track, but this is omitted since it defaults to a default image
   */
  extended?: boolean
}

export interface LastfmUserRecentTracksResponseTrack {
  artist: StringRecord<'mbid' | '#text'>
  streamable: '0' | '1'
  image: LastfmRawImage[]
  mbid: string
  album: StringRecord<'mbid' | '#text'>
  name: string
  url: string
  date?: LastfmDate
  '@attr'?: {
    nowplaying: 'true'
  }
}

export interface LastfmUserRecentTracksResponseTrackExtended
  extends LastfmUserRecentTracksResponseTrack {
  artist: StringRecord<'mbid' | '#text'> & { image: LastfmRawImage[] }
  loved: '1' | '0'
}

export type LastfmUserRecentTrackResponseResource<EXTENDED extends boolean> =
  EXTENDED extends true
    ? LastfmUserRecentTracksResponseTrackExtended
    : LastfmUserRecentTracksResponseTrack

export interface LastfmOriginalUserRecentTracksResponse<
  EXTENDED extends boolean
> {
  recenttracks: {
    track: LastfmUserRecentTrackResponseResource<EXTENDED>[]
    '@attr': PaginatedResponseAttributes<'user'>
  }
}

export interface LastfmRecentTracksTrack {
  name: string
  mbid?: string
  streamable: boolean
  artist: {
    name: string
    mbid?: string
  }
  images: LastfmImage[]
  album: {
    name: string
    mbid?: string
  }
  url: string
  date?: Date
  nowPlaying?: boolean
}

export interface LastfmRecentTracksTrackExtended
  extends LastfmRecentTracksTrack {
  loved: boolean
}

export type LastfmRecentTracksTrackResource<EXTENDED extends boolean> =
  EXTENDED extends true
    ? LastfmRecentTracksTrackExtended
    : LastfmRecentTracksTrack

export interface LastfmRecentTracksResponse<EXTENDED extends boolean> {
  tracks: LastfmRecentTracksTrackResource<EXTENDED>[]
  attr: PaginatedResponseAttributes<'user'>
}

// user.getTopArtists
export interface LastfmOriginalUserTopArtistsResponse {
  topartists: {
    artist: {
      name: string
      mbid: string
      url: string
      playcount: string
      streamable: string
      '@attr': StringRecord<'rank'>
      image: LastfmRawImage[]
    }[]
    '@attr': PaginatedResponseAttributes<'user'>
  }
}
