import fetch from 'node-fetch'
import { LastfmError } from './error/LastfmError.js'
import {
  LastfmApiMethod,
  LastfmOriginalResponses,
  LastfmResponse
} from './types/responses.js'
import {
  LastfmRawUserInfoResponse,
  LastfmUserInfo
} from './types/responses/user.js'
import { isLastfmError } from './utils.js'

export default class LastClient {
  private apiUrl = 'https://ws.audioscrobbler.com/2.0'

  constructor(
    public apiKey: string,
    public apiSecret?: string,
    public sessionToken?: string
  ) {
    if (!apiKey) throw new Error('apiKey is required and is missing')
  }

  /**
   * @todo implement signed requests
   */
  async request<M extends LastfmApiMethod>(
    method: M,
    params?: Record<string, string>
  ) {
    try {
      params = {
        ...params,
        method,
        api_key: this.apiKey,
        format: 'json'
      }
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${this.apiUrl}?${queryString}`).then((r) =>
        r.json()
      )
      return response as LastfmOriginalResponses[M]
    } catch (error) {
      if (isLastfmError(error)) {
        throw new LastfmError(error)
      } else throw error
    }
  }

  async getUserInfo(
    user: string
  ): Promise<LastfmResponse<LastfmRawUserInfoResponse, LastfmUserInfo>> {
    const original = await this.request('user.getInfo', { user })
    return {
      name: original.user.name,
      realName: original.user.name,
      age: parseInt(original.user.age),
      playCount: parseInt(original.user.playcount),
      country: original.user.country,
      registered: new Date(original.user.registered.unixtime),
      gender: original.user.gender,
      subscriber: original.user.subscriber === '1',
      images: [],
      url: original.user.url,
      original
    }
  }
}
