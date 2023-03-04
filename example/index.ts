import {LastClient} from '../src/LastClient.js'

const client = new LastClient(process.env.LASTFM_KEY!)

async function main() {
  const user = await client.user.getInfo('metye')

  console.log('User', user.realName)

  const albums = await client.user.getTopAlbums('metye')
  const artists = await client.user.getTopArtists('metye')
  const tracks = await client.user.getTopTracks('metye')

  console.log('Top album of', albums.pagination.total, ':', albums.albums[0])
  console.log('Top artist of', artists.pagination.total, ':', artists.artists[0])
  console.log('Top track of', tracks.pagination.total, ':', tracks.tracks[0])
}

main()