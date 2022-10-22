import LastClient from '@musicorum/lastfm'
import {LastfmError, LastfmErrorCode} from '@musicorum/lastfm/dist/error/LastfmError.js'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = new LastClient(process.env.LASTFM_KEY!)

async function main() {
  const user1 = await client.request('user.getInfo', { user: 'metye' })
  const user2 = await client.user.getInfo('metye')

  console.log(
    user1.user.playcount,
    user2.playCount
  )
  
  const recentTracks = await client.user.getRecentTracksPaginated('metye')
  console.log(`${recentTracks.totalResults} results in ${recentTracks.totalPages} pages`)

  const page1 = recentTracks.getPage(1)
  const page2 = await recentTracks.fetchPage(2)

  console.log(page1[0].name, '- is listening now:', page1[0].nowPlaying)
  console.log(page2[0].name)

  try {
    const user2 = await client.user.getInfo('aaa fff ssdds')
  } catch (err) {
    if (err instanceof LastfmError) {
      console.log(err.error, err.error === LastfmErrorCode.PARAMETER_ERROR)
    }
  }
}
main()
