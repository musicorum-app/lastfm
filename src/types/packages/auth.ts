export interface LastfmAuthGetTokenResponse {
  token: string
}

export interface LastfmOriginalAuthGetSessionResponse {
  session: {
    name: string
    key: string
    subscriber: '0' | '1'
  }
}

export interface LastfmAuthGetSessionResponse {
  username: string
  key: string
  subscriber: boolean
}
