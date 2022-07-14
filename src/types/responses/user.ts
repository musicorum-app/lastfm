import type {
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

export interface LastfmOriginalUserRecentTracksResponse {
  recenttracks: {
    track: {
      name: string
      url: string
      streamable: string
      mbid: string
      artist: StringRecord<'mbid' | '#text'>
      image: LastfmRawImage[]
      album: StringRecord<'mbid' | '#text'>
      date: StringRecord<'uts' | '#text'>
    }[]
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
