/* eslint-disable @typescript-eslint/no-unused-vars */
import { LastfmError } from './error/LastfmError.js'
import { User } from './packages/User.js'
import { Track } from './packages/Track.js'
import { Album } from './packages/Album.js'
import { Artist } from './packages/Artist.js'
import { Auth } from './packages/Auth.js'
import { Utilities } from './packages/Utilities.js'
import type {
  GetOriginalResponse,
  LastfmApiMethod,
  LastfmResponses
} from './types/responses'
import crypto from 'crypto'

export class LastClient {
  private apiUrl = 'https://ws.audioscrobbler.com/2.0'

  public user = new User(this)
  public track = new Track(this)
  public album = new Album(this)
  public artist = new Artist(this)
  public auth = new Auth(this)
  public utilities = new Utilities(this)
  private readonly headers: Record<string, string>

  constructor(
    public apiKey: string,
    public apiSecret?: string,
    userAgent?: string
  ) {
    if (!apiKey) throw new Error('apiKey is required and is missing')

    this.headers = {
      'User-Agent':
        userAgent ??
        'Unknown app (@musicorum/lastfm; github.com/musicorum-app/lastfm)'
    }
  }

  onRequestStarted(
    method: LastfmApiMethod | string,
    params: Record<string, string>,
    internalData: Record<string, never>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  onRequestFinished(
    method: LastfmApiMethod | string,
    params: Record<string, string>,
    internalData: Record<string, never>,
    response: Record<string, never>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  /**
   * @todo implement signed requests
   */
  async request<M extends string = LastfmApiMethod>(
    method: M,
    params?: Record<string, string | number | undefined>,
    signed = false,
    write = false
  ) {
    if (signed && !this.apiSecret)
      throw new Error('apiSecret is required for signed requests')

    params = {
      ...params,
      method,
      api_key: this.apiKey,
      format: 'json'
    }

    const cleanParams: { [p: string]: string } = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => !!v) as [string, string][]
    )

    const searchParams = new URLSearchParams(cleanParams)
    if (signed) {
      // order cleanParams alphabetically by key
      const orderedParams = Object.fromEntries(
        Object.entries(cleanParams).sort(([a], [b]) => a.localeCompare(b))
      )

      const signature =
        Object.entries(orderedParams)
          .filter(([k]) => k !== 'format')
          .map(([k, v]) => `${k}${v}`)
          .join('') + this.apiSecret

      const hashedSignature = crypto
        .createHash('md5')
        .update(signature)
        .digest('hex')

      searchParams.set('api_sig', hashedSignature)
    }
    const queryString = searchParams.toString()

    const internalData = {}
    this.onRequestStarted(method, cleanParams, internalData)
    const response = write
      ? await fetch(`${this.apiUrl}/?format=json`, {
          method: 'POST',
          headers: this.headers,
          body: queryString
        })
      : await fetch(`${this.apiUrl}?${queryString}`, { headers: this.headers })

    const data = await response.json()
    this.onRequestFinished(method, cleanParams, internalData, data)

    if (!response.ok) throw new LastfmError(data)

    return data as M extends LastfmApiMethod
      ? GetOriginalResponse<LastfmResponses[M]>
      : unknown
  }
}
