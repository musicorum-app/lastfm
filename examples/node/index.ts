import LastClient from '@musicorum/lastfm'
import {LastfmError, LastfmErrorCode} from '@musicorum/lastfm/dist/error/LastfmError.js'

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

  
  const page1 = recentTracks.getPage(1)
  const page2 = await recentTracks.fetchPage(2)
  console.log(page1[2])

  console.log(page1[0].name, '- is listening now:', page1[0].nowPlaying)
  console.log(page2[0].name)
}
main()
