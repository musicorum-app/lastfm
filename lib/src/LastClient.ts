import { LastfmError } from './error/LastfmError.js'
import { User } from './packages/User.js'
import type {
  GetOriginalResponse,
  LastfmApiMethod,
  LastfmResponses
} from './types/responses'
import { isLastfmError } from './utils.js'
import axios, { Axios } from 'axios'

export default class LastClient {
  private apiUrl = 'https://ws.audioscrobbler.com/2.0'

  public user = new User(this)

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
      const response = await axios
        .get(`${this.apiUrl}?${queryString}`)
        .then((r) => r.data)
      return response as GetOriginalResponse<LastfmResponses[M]>
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        isLastfmError(error?.response?.data)
      ) {
        throw new LastfmError(error.response.data)
      } else throw error
    }
  }
}
