import { LastfmErrorResponse } from '../types/responses'

export class LastfmError extends Error {
  public error: number

  constructor(public response: LastfmErrorResponse) {
    super(response.message)
    this.error = response.error
  }
}
