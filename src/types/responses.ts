import type {
  LastfmOriginalUserInfoResponse,
  LastfmOriginalUserRecentTracksResponse,
  LastfmOriginalUserTopArtistsResponse,
  LastfmUserInfo
} from './packages/user'
import {
  LastfmOriginalTrackInfoResponse,
  LastfmTrackInfo
} from './packages/track'
import {
  LastfmAlbumInfo,
  LastfmOriginalAlbumInfoResponse
} from './packages/album'
import {
  LastfmArtistInfo,
  LastfmOriginalArtistInfoResponse
} from './packages/artist'
import {
  LastfmAuthGetSessionResponse,
  LastfmAuthGetTokenResponse,
  LastfmOriginalAuthGetSessionResponse
} from './packages/auth'

export interface LastfmErrorResponse {
  error: number
  message: string
}

export type LastfmResponse<ORIGINAL, FORMATTED = ORIGINAL> = {
  original: ORIGINAL
  formatted: FORMATTED
}

export type GetOriginalResponse<R extends LastfmResponse<unknown, unknown>> =
  R['original']

export type GetFormattedResponse<R extends LastfmResponse<unknown, unknown>> =
  R['formatted']

export type LastfmResponses = {
  'user.getInfo': LastfmResponse<LastfmOriginalUserInfoResponse, LastfmUserInfo>
  'user.getRecentTracks': LastfmResponse<
    LastfmOriginalUserRecentTracksResponse<true | false>
  >
  'user.getTopArtists': LastfmResponse<LastfmOriginalUserTopArtistsResponse>
  'track.getInfo': LastfmResponse<
    LastfmOriginalTrackInfoResponse,
    LastfmTrackInfo
  >
  'album.getInfo': LastfmResponse<
    LastfmOriginalAlbumInfoResponse,
    LastfmAlbumInfo
  >
  'artist.getInfo': LastfmResponse<
    LastfmOriginalArtistInfoResponse,
    LastfmArtistInfo
  >
  'auth.getToken': LastfmResponse<LastfmAuthGetTokenResponse>
  'auth.getSession': LastfmResponse<
    LastfmOriginalAuthGetSessionResponse,
    LastfmAuthGetSessionResponse
  >
}

export type LastfmApiMethod = keyof LastfmResponses