import type { LastClient } from '../LastClient'

export class Utilities {
  constructor(private client: LastClient) {}

  /**
   * Returns the URL to the Last.fm authentication page
   */
  buildDesktopAuthURL(token: string): string {
    return `https://www.last.fm/api/auth/?api_key=${this.client.apiKey}&token=${token}`
  }
}
