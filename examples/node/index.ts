import { LastClient } from '@musicorum/lastfm'
import { deepStrictEqual } from 'assert'

class MonitoredClient extends LastClient {
  constructor () {
    super(process.env.LASTFM_KEY!)
  }

  onRequestStarted(
    method: string,
    params: Record<string, string>,
    internalData: Record<string, any>
  ) {
    internalData.startedAt = Date.now()
  }

  onRequestFinished(
    method: string,
    params: Record<string, string>,
    internalData: Record<string, never>,
    response: Record<string, never>
  ) {
    console.log('request to', method, 'finished,', 'took', Date.now() - internalData.startedAt, 'ms')
  }
}

const client = new MonitoredClient()

async function main() {
  const user1 = await client.request('user.getInfo', { user: 'metye' })
  const user2 = await client.user.getInfo('metye')

  console.log(user2.playCount)
  
  const recentTracks = await client.user.getRecentTracksPaginated('metye', {
    extended: false
  })
  console.log(`${recentTracks.totalResults} results in ${recentTracks.totalPages} pages`)

  const trackInfo = await client.request('track.getInfo', {
    artist: 'NewJeans',
    track: 'OMG',
    autocorrect: '1',
    username: 'blueslimee'
  })
  const trackInfo2 = await client.track.getInfo('28 Reasons', 'SEULGI', {
    autoCorrect: true,
    username: 'blueslimee'
  })

  const nonExistingTrack = await client.track.getInfo('21 Reasons', 'SEULBI')
  deepStrictEqual(nonExistingTrack, undefined)
  console.log(`blueslimee has ${trackInfo2!.user!.playCount} plays on ${trackInfo2!.name} vs. ${trackInfo!.track!.userplaycount} plays on ${trackInfo!.track!.name}`)

  const albumInfo = await client.request('album.getInfo', {
    artist: 'Sabrina Carpenter',
    album: 'Singular Act I',
    username: 'blueslimee'
  })
  const albumInfo2 = await client.album.getInfo('emails i can\'t send', 'Sabrina Carpenter', {
    username: 'blueslimee',
    biographyLanguage: 'por'
  })
  console.log(`blueslimee has ${albumInfo2!.user!.playCount} plays on ${albumInfo2!.name} vs. ${albumInfo!.album!.userplaycount} plays on ${albumInfo!.album!.name}`)

  const page1 = recentTracks.getPage(1)
  const page2 = await recentTracks.fetchPage(2)

  console.log(page1[0].name, '- is listening now:', page1[0].nowPlaying)
}
main()
