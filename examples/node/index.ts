import LastClient from '@musicorum/lastfm'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = new LastClient(process.env.LASTFM_KEY!)

async function main() {
  const user1 = await client.request('user.getInfo', { user: 'metye' })
  const user2 = await client.user.getInfo('metye')

  console.log(
    user1.user.playcount,
    user2.playCount
  )
  
  const recentTracks = await client.request('user.getRecentTracks', { user: 'metye' })

  console.log(recentTracks.recenttracks.track[0].name)
}
main()
