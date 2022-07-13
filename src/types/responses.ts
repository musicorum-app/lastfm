import type { LastfmRawUserInfoResponse } from './responses/user'

export interface LastfmErrorResponse {
  error: number
  message: string
}

export type LastfmResponse<ORIGINAL, FORMATTED> = FORMATTED & {
  original: ORIGINAL
}

export type LastfmOriginalResponses = {
  'user.getInfo': LastfmRawUserInfoResponse
}

export type LastfmApiMethod = keyof LastfmOriginalResponses
