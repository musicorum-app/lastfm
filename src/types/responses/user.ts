import { LastfmRawImage } from './image'

export interface LastfmRawUserInfoResponse {
  user: {
    name: string
    realname: string
    url: string
    country: string
    age: string
    playcount: string
    registered: {
      unixtime: string
      '#text': number
    }
    image: LastfmRawImage[]
    bootstrap: string
    subscriber: string
    playlists: string
    type: string
    gender: string
  }
}

export interface LastfmUserInfo {
  name: string
  realName: string
  url: string
  country: string
  age: number
  playCount: number
  registered: Date
  images: [] // @todo
  subscriber: boolean
  gender: string
}
