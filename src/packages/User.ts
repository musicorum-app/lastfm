import type LastClient from '../LastClient'
import type { GetFormattedResponse, LastfmResponses } from '../types/responses'

export class User {
  constructor(private client: LastClient) {}

  async getInfo(
    user: string
  ): Promise<GetFormattedResponse<LastfmResponses['user.getInfo']>> {
    const original = await this.client.request('user.getInfo', { user })
    return {
      name: original.user.name,
      realName: original.user.name,
      age: parseInt(original.user.age),
      playCount: parseInt(original.user.playcount),
      country: original.user.country,
      registered: new Date(parseInt(original.user.registered.unixtime) * 1000),
      gender: original.user.gender,
      subscriber: original.user.subscriber === '1',
      images: [],
      url: original.user.url
    }
  }

  // @todo
  async getRecentTracks<EXTENDED = boolean, RESOURCE extends >(
    user: string,
    perPage = 20,
    page = 1,
    extended: EXTENDED = false,
    from?: Date,
    to?: Date
  ) {
    const response = await this.client.request('user.getRecentTracks', {
      user,
      limit: perPage.toString(),
      page: page.toString(),
      from: from
    })

    response.recenttracks.track[0]['@attr']
  }
}
