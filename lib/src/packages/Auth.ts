import type { LastClient } from '../LastClient'
import type { GetFormattedResponse, LastfmResponses } from '../types/responses'

export class Auth {
  constructor(private client: LastClient) {}

  async getToken(): Promise<string> {
    const original = await this.client.request('auth.getToken', undefined, true)
    return original.token
  }

  async getSession(
    token: string
  ): Promise<GetFormattedResponse<LastfmResponses['auth.getSession']>> {
    const original = await this.client.request(
      'auth.getSession',
      { token },
      true
    )
    return {
      username: original.session.name,
      key: original.session.key,
      subscriber: original.session.subscriber === '1'
    }
  }
}
