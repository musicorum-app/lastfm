import { LastClient } from '../LastClient.js'
import { GetFormattedResponse, LastfmResponses } from '../types/responses.js'
import { parseLastfmImages } from '../utils.js'
import { LastfmTag } from '../types/packages/common.js'
import {
  LastfmAlbumInfoParams,
  LastfmAlbumInfoTrack,
  LastfmOriginalAlbumInfoTrackResponse
} from '../types/packages/album.js'

const parseAlbumInfoTracks = (
  tracks: LastfmOriginalAlbumInfoTrackResponse[]
): LastfmAlbumInfoTrack[] => {
  if (Array.isArray(tracks)) {
    return tracks.map((track) => ({
      name: track.name,
      duration: track.duration,
      artist: {
        name: track.artist.name,
        mbid: track.artist.mbid ?? undefined,
        url: track.artist.url
      },
      url: track.url,
      rank: track['@attr']?.rank ?? undefined
    }))
  } else {
    return tracks
  }
}
export class Album {
  constructor(private client: LastClient) {}

  async getInfo(
    albumName: string,
    artistName: string,
    params?: LastfmAlbumInfoParams
  ): Promise<
    GetFormattedResponse<LastfmResponses['album.getInfo']> | undefined
  > {
    const original = await this.client.request('album.getInfo', {
      album: albumName,
      artist: artistName,
      mbid: params?.mbid,
      autocorrect: params?.autoCorrect === true ? '1' : '0',
      username: params?.username,
      lang: params?.biographyLanguage
    })
    if (!original.album) return undefined

    return {
      artist: original.album.artist,
      images: original.album.image
        ? parseLastfmImages(original.album.image)
        : undefined,
      listeners: parseInt(original.album.listeners),
      mbid: original.album.mbid !== '' ? original.album.mbid : undefined,
      name: original.album.name,
      playCount: parseInt(original.album.playcount),
      tags: original.album.tags?.tag as LastfmTag[],
      tracks: original.album.tracks?.track
        ? parseAlbumInfoTracks(original.album.tracks?.track)
        : undefined,
      url: original.album.url,
      user: original.album.userplaycount
        ? { playCount: original.album.userplaycount }
        : undefined,

      wiki: original.album.wiki
        ? {
            published: new Date(original.album.wiki.published),
            summary: original.album.wiki.summary,
            content: original.album.wiki.content
          }
        : undefined
    }
  }
}
