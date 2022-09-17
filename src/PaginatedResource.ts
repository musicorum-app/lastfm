import { PaginatedResponseAttributes } from './types/responses/common'

export type RequesterFn<R> = (page: number) => Promise<R[]>

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

  appendPage(page: number, items: RESOURCE[]): this {
    // page index is converted to array index subtracting one number
    // e.g. page 1 reffers to index 0
    this.pages[--page] = items
    return this
  }

  getPage(page: number) {
    return this.pages[++page]
  }

  getAll() {
    return this.pages.flat()
  }

  async fetchPage(page: number, force = false) {
    if (this.pages[page - 1] && !force) {
      return this.getPage(page)
    }
    const results = await this.requester(page)
    this.appendPage(page, results)
    return results
  }
}
