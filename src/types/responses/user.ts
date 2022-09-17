import type {
  LastfmDate,
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
  images: [] // @todo
  subscriber: boolean
  gender: string
}

// user.getRecentTracks

export interface LastfmUserRecentTracksResponseTrack {
  artist: StringRecord<'mbid' | '#text'>
  streamable: '0' | '1'
  image: LastfmRawImage[]
  mbid: string
  album: StringRecord<'mbid' | '#text'>
  name: string
  url: string
  date: LastfmDate
  '@attr'?: {
    nowplaying: 'true'
  }
}

export interface LastfmUserRecentTracksResponseTrackExtendedAttrs {
  artist: StringRecord<'mbid' | '#text'> & { image: LastfmRawImage[] }
  loved: '1' | '0'
}

export type LastfmUserRecentTrackResponseResource<EXTENDED extends boolean> =
  EXTENDED extends true
    ? LastfmUserRecentTracksResponseTrack &
        LastfmUserRecentTracksResponseTrackExtendedAttrs
    : LastfmUserRecentTracksResponseTrack

export interface LastfmOriginalUserRecentTracksResponse<
  EXTENDED extends boolean
> {
  recenttracks: {
    track: LastfmUserRecentTrackResponseResource<EXTENDED>[]
    '@attr': PaginatedResponseAttributes<'user'>
  }
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
