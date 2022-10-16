import type {
  LastfmOriginalUserInfoResponse,
  LastfmOriginalUserRecentTracksResponse,
  LastfmOriginalUserTopArtistsResponse,
  LastfmUserInfo
} from './packages/user'

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
}

export type LastfmApiMethod = keyof LastfmResponses