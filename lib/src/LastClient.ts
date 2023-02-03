/* eslint-disable @typescript-eslint/no-unused-vars */
import { LastfmError } from './error/LastfmError.js'
import { User } from './packages/User.js'
import type {
  GetOriginalResponse,
  LastfmApiMethod,
  LastfmResponses
} from './types/responses'

export default class LastClient {
  private apiUrl = 'https://ws.audioscrobbler.com/2.0'

  public user = new User(this)

  constructor(
    public apiKey: string,
    public apiSecret?: string,
    public sessionToken?: string,
    public userAgent?: string
  ) {
    if (!apiKey) throw new Error('apiKey is required and is missing')
  }

  onRequestStarted(
    method: LastfmApiMethod,
    params: Record<string, string>,
    internalData: Record<string, never>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  onRequestFinished(
    method: LastfmApiMethod,
    params: Record<string, string>,
    internalData: Record<string, never>,
    response: Record<string, never>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  /**
   * @todo implement signed requests
   */
  async request<M extends LastfmApiMethod>(
    method: M,
    params?: Record<string, string>
  ) {
    params = {
      ...params,
      method,
      api_key: this.apiKey,
      format: 'json'
    }
    const queryString = new URLSearchParams(params).toString()

    const internalData = {}
    this.onRequestStarted(method, params, internalData)
    const response = await fetch(`${this.apiUrl}?${queryString}`, {
      headers: {
        'User-Agent':
          this.userAgent ??
          'Unknown app (@musicorum/lastfm; github.com/musicorum-app/lastfm)'
      }
    })
    const data = await response.json()
    this.onRequestFinished(method, params, internalData, data)

    if (!response.ok) throw new LastfmError(data)

    return data as GetOriginalResponse<LastfmResponses[M]>
  }
}
