import type { LastClient } from '../LastClient.js'
import PaginatedResult from '../PaginatedResource.js'
import {
  LastfmRecentTracksResponse,
  LastfmRecentTracksTrackResource,
  LastfmUserRecentTracksParams,
  LastfmUserTopAlbum,
  LastfmUserTopAlbumsParams,
  UserTopArtists,
  UserTopTracks
} from '../types/packages/user.js'
import type {
  GetFormattedResponse,
  LastfmResponses
} from '../types/responses.js'
import { parseLastfmImages, parseLastfmPagination } from '../utils.js'

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

    const trackList = Array.isArray(response.recenttracks.track)
      ? response.recenttracks.track
      : [response.recenttracks.track]

    const tracks = trackList.map((track) => ({
      name: track.name,
      mbid: track.mbid ?? undefined,
      streamable: track.streamable == '1',
      artist: {
        name: track.artist.name || track.artist['#text'],
        mbid: track.artist.mbid ?? undefined
      },
      images: parseLastfmImages(track.image),
      album: {
        name: track.album['#text'],
        mbid: track.album.mbid ?? undefined
      },
      url: track.url,
      date: track.date?.uts
        ? new Date(parseInt(track.date.uts) * 1000)
        : undefined,
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

  async getTopAlbums(
    user: string,
    params?: LastfmUserTopAlbumsParams
  ): Promise<GetFormattedResponse<LastfmResponses['user.getTopAlbums']>> {
    const response = await this.client.request('user.getTopAlbums', {
      ...params,
      user
    })

    const albums: LastfmUserTopAlbum[] = response.topalbums.album.map((a) => ({
      name: a.name,
      artist: a.artist,
      playCount: parseInt(a.playcount),
      rank: parseInt(a['@attr'].rank),
      mbid: a.mbid,
      images: parseLastfmImages(a.image)
    }))

    return {
      albums,
      pagination: parseLastfmPagination(response.topalbums['@attr'])
    }
  }

  async getTopArtists(
    user: string,
    params?: UserTopArtists.Params
  ): Promise<GetFormattedResponse<LastfmResponses['user.getTopArtists']>> {
    const response = await this.client.request('user.getTopArtists', {
      ...params,
      user
    })

    const artists: UserTopArtists.Artist[] = response.topartists.artist.map(
      (a) => ({
        name: a.name,
        mbid: a.mbid,
        url: a.url,
        playCount: parseInt(a.playcount),
        streamable: a.streamable === '1',
        rank: parseInt(a['@attr'].rank),
        images: parseLastfmImages(a.image)
      })
    )

    return {
      artists,
      pagination: parseLastfmPagination(response.topartists['@attr'])
    }
  }

  async getTopTracks(
    user: string,
    params?: UserTopTracks.Params
  ): Promise<GetFormattedResponse<LastfmResponses['user.getTopTracks']>> {
    const response = await this.client.request('user.getTopTracks', {
      ...params,
      user
    })

    const tracks: UserTopTracks.Track[] = response.toptracks.track.map((t) => ({
      name: t.name,
      mbid: t.mbid,
      url: t.url,
      playCount: parseInt(t.playcount),
      artist: t.artist,
      streamable: t.streamable.fulltrack === '1',
      rank: parseInt(t['@attr'].rank),
      images: parseLastfmImages(t.image)
    }))

    return {
      tracks,
      pagination: parseLastfmPagination(response.toptracks['@attr'])
    }
  }
}
