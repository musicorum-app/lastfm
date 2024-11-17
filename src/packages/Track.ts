import { LastClient } from '../LastClient.js'
import { GetFormattedResponse, LastfmResponses } from '../types/responses.js'
import { parseLastfmImages } from '../utils.js'
import { LastfmTrackInfoParams } from '../types/packages/track.js'
import { LastfmTag } from '../types/packages/common.js'

export class Track {
  constructor(private client: LastClient) {}

  async getInfo(
    trackName: string,
    artistName: string,
    params?: LastfmTrackInfoParams
  ): Promise<
    GetFormattedResponse<LastfmResponses['track.getInfo']> | undefined
  > {
    const original = await this.client.request('track.getInfo', {
      track: trackName,
      artist: artistName,
      mbid: params?.mbid,
      autocorrect: params?.autoCorrect === true ? '1' : '0',
      username: params?.username
    })
    if (!original.track) return undefined

    return {
      user:
        typeof original.track.userloved === 'string'
          ? {
              loved: original.track.userloved === '1',
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              playCount: parseInt(original.track.userplaycount!)
            }
          : undefined,
      name: original.track.name,
      mbid: original.track.mbid ?? undefined,
      url: original.track.url,
      duration:
        original.track.duration !== '0'
          ? parseInt(original.track.duration)
          : undefined,
      listeners: parseInt(original.track.listeners),
      playcount: parseInt(original.track.playcount),
      artist: {
        name: original.track.artist.name,
        mbid: original.track.artist.mbid ?? undefined,
        url: original.track.artist.url
      },
      album: original.track.album
        ? {
            name: original.track.album.title,
            artist: original.track.album.artist,
            url: original.track.album.url,
            images: original.track.album.image
              ? parseLastfmImages(original.track.album.image)
              : undefined
          }
        : undefined,
      tags: original.track.toptags?.tag as LastfmTag[],
      wiki: original.track.wiki
        ? {
            published: new Date(original.track.wiki.published),
            summary: original.track.wiki.summary,
            content: original.track.wiki.content
          }
        : undefined
    }
  }

  async love(
    trackName: string,
    artistName: string,
    sessionKey: string
  ): Promise<void> {
    await this.client.request('track.love', {
      track: trackName,
      artist: artistName,
      sk: sessionKey
    }, true, true)
  }

  async unlove(
    trackName: string,
    artistName: string,
    sessionKey: string
  ): Promise<void> {
    await this.client.request('track.unlove', {
      track: trackName,
      artist: artistName,
      sk: sessionKey
    }, true, true)
  }
}
