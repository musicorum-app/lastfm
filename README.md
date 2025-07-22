# [@musicorum/lastfm](https://www.npmjs.com/package/@musicorum/lastfm)



Fully typed [Last.fm](https://last.fm) api client library written and made for Typescript!

> **Warning**
> This library is still in alpha and on heavy development. Expect incomplete stuff and future changes.

## Basic usage

```ts
import { LastClient } from '@musicorum/lastfm'

const client = new LastClient('e8077692fe0485f6b474fdab331793c')

async function main() {
  // Original response from API (with types)
  const user1 = await client.request('user.getInfo', { user: 'metye' })

  // Formated response for better experience
  const user2 = await client.user.getInfo('metye')

  console.log(
    user1.user.playcount,
    user2.playCount
  )

  // Pagination
  const recentTracks = await client.user.getRecentTracksPaginated('metye')
  console.log(`${recentTracks.totalResults} results in ${recentTracks.totalPages} pages`)

  const page1 = recentTracks.getPage(1)
  const page2 = await recentTracks.fetchPage(2)

  console.log('Last scrobble:', page1[0].name, page1[0].nowPlaying ? ' - Now playing' : '')
}
main()
```
