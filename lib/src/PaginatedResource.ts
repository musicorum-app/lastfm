import { PaginatedResponseAttributes } from './types/packages/common'

export type RequesterFn<R> = (page: number) => Promise<R[]>

/**
 * Paginated results for a resource. This can be used to get specific pages or multiple pages
 */
export default class PaginatedResult<RESOURCE> {
  public readonly totalPages: number
  public readonly totalResults: number
  public readonly perPage: number
  private readonly pages: RESOURCE[][] = []

  constructor(
    attr: PaginatedResponseAttributes,
    private requester: RequesterFn<RESOURCE>
  ) {
    this.totalPages = parseInt(attr.totalPages)
    this.perPage = parseInt(attr.perPage)
    this.totalResults = parseInt(attr.total)
  }

  /**
   * Appends contents of a page to this paginated result
   * @param page The page number of the contents to append
   * @param items The resources of that page to append
   * @returns This current paginated result
   */
  appendPage(page: number, items: RESOURCE[]): this {
    // page index is converted to array index subtracting one number
    // e.g. page 1 reffers to index 0
    this.pages[--page] = items
    return this
  }

  /**
   * Get the contents from a page
   * @param page The page to get the contents from. Page numbers start from 1
   * @returns A list of the resources of that specific page
   */
  getPage(page: number) {
    return this.pages[--page]
  }

  /**
   * Get all contents fetched from this paginated result
   * @returns All contents of all fetched pages. Note that missing pages will be ignoed
   */
  getAll() {
    return this.pages.flat()
  }

  /**
   * Fetches content from a page from the API, if it wasn't fetched yet
   * @param page The page number to fetch content from. Page numbers start from 1
   * @param force This will force to fetch that page, even if it's already fetched
   * @returns The results from that page.
   */
  async fetchPage(page: number, force = false) {
    if (this.pages[page - 1] && !force) {
      return this.getPage(page)
    }
    const results = await this.requester(page)
    this.appendPage(page, results)
    return results
  }
}
