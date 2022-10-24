import type LastClient from '../LastClient'
import PaginatedResult from '../PaginatedResource.js'
import {
  LastfmRecentTracksResponse,
  LastfmRecentTracksTrackResource,
  LastfmUserRecentTracksParams
} from '../types/packages/user'
import type { GetFormattedResponse, LastfmResponses } from '../types/responses'
import { parseLastfmImages } from '../utils.js'

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
      images: parseLastfmImages(original.user.image),
      url: original.user.url
    }
  }

  async getRecentTracks<EXTENDED extends boolean = false>(
    user: string,
    params?: LastfmUserRecentTracksParams
  ) {
    const stringParams: Record<string, string> = {
      user,
      limit: (params?.limit ?? 50).toString(),
      page: (params?.page ?? 1).toString(),
      extended: params?.extended === true ? '1' : '0'
    }
    if (params?.from) {
      stringParams.from = Math.round(params.from.getTime() / 1000).toString()
    }

    if (params?.to) {
      stringParams.to = Math.round(params.to.getTime() / 1000).toString()
    }
    const response = await this.client.request(
      'user.getRecentTracks',
      stringParams
    )

    const tracks = response.recenttracks.track.map((track) => ({
      name: track.name,
      mbid: track.mbid ?? undefined,
      streamable: track.streamable == '1',
      artist: {
        name: track.artist['#text'],
        mbid: track.artist.mbid ?? undefined
      },
      images: parseLastfmImages(track.image),
      album: {
        name: track.album['#text'],
        mbid: track.album.mbid ?? undefined
      },
      url: track.url,
      date: new Date(parseInt(track.date.uts) * 1000),
      nowPlaying: track['@attr']?.nowplaying === 'true',
      loved: 'loved' in track ? track.loved === '1' : undefined
    })) as LastfmRecentTracksTrackResource<EXTENDED>[]

    return {
      tracks,
      attr: response.recenttracks['@attr']
    } as LastfmRecentTracksResponse<EXTENDED>
  }

  async getRecentTracksPaginated<EXTENDED extends boolean = false>(
    user: string,
    params?: LastfmUserRecentTracksParams
  ) {
    const metadataResponse = await this.getRecentTracks<EXTENDED>(user, params)

    const paginated = new PaginatedResult(
      metadataResponse.attr,
      async (page) => {
        const tracks = await this.getRecentTracks<EXTENDED>(user, {
          ...params,
          page
        }).then((r) => r.tracks)

        // skip first item if its now playing and not at first page, to prevent duplicates
        return page !== 1 && tracks[0].nowPlaying ? tracks.slice(1) : tracks
      }
    )

    paginated.appendPage(params?.page ?? 1, metadataResponse.tracks)

    return paginated
  }
}
