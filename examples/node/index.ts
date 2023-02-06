import { LastClient } from '@musicorum/lastfm'

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
    console.log('request to', method, 'started')
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

  console.log(
    user1.user.playcount,
    user2.images
  )
  
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

  console.log(`blueslimee has ${trackInfo2.user!.playCount} plays on ${trackInfo2.name} vs ${trackInfo.track.userplaycount} plays on ${trackInfo.track.name}`)


  
  const page1 = recentTracks.getPage(1)
  const page2 = await recentTracks.fetchPage(2)
  console.log(page1[2])

  console.log(page1[0].name, '- is listening now:', page1[0].nowPlaying)
  console.log(page2[0].name)
}
main()
