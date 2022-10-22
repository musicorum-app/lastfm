import { LastfmErrorResponse } from '../types/responses'

export class LastfmError extends Error {
  public error: number

  constructor(public response: LastfmErrorResponse) {
    super(response.message)
    this.error = response.error
  }
}

export enum LastfmErrorCode {
  SERVICE_UNAVAILABLE = 2,
  /**
   *  No method with that name in this package
   */
  INVALID_METHOD = 3,

  /**
   * You do not have permissions to access the service
   */
  AUTHENTICATION_FAILED = 4,

  /**
   * This service doesn't exist in that format
   */
  INVALID_RESPONSE_FORMAT = 5,

  /**
   * Your request is missing a required parameter
   */
  PARAMETER_ERROR = 6,

  /**
   * Invalid resource specified
   */
  INVALID_RESOURCE = 7,

  /**
   * Something else went wrong
   */
  GENERIC_ERROR = 8,

  /**
   *  Invalid session key - Please re-authenticate
   */
  INVALID_SERSSION_TOKEN = 9,

  /**
   * You must be granted a valid key by last.fm
   */
  INVALID_API_TOKEN = 10,

  /**
   * This service is temporarily offline. Try again later.
   */
  SERVICE_OFFLINE = 11,

  /**
   * Access for your account has been suspended, please contact Last.fm
   */
  API_KEY_BANNED = 26,

  /**
   * Your IP has made too many requests in a short period
   */
  RATE_LIMIT_EXCEEDED = 29
}
