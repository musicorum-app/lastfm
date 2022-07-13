import LastClient from '@musicorum/lastfm'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = new LastClient(process.env.LASTFM_KEY!)

async function main() {
  const user = await client.getUserInfo('metye')

  console.log(user)
}
main()
