import { LastfmErrorResponse } from '../types/responses'

export class LastfmError extends Error {
  public error: number

  constructor(public response: LastfmErrorResponse) {
    super(response.message)
    this.error = response.error
  }
}

/**
 * Sources: {@link https://lastfm-docs.github.io/api-docs/codes/} and {@link https://www.last.fm/api/errorcodes}
 */
export enum LastfmErrorCode {
  /**
   * This service does not exist
   */
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
  INVALID_PARAMETER = 6,

  /**
   * Invalid resource specified
   */
  INVALID_RESOURCE = 7,

  /**
   * Most likely the backend service failed. Please try again.
   */
  OPERATION_FAILED = 8,

  /**
   *  Invalid session key - Please re-authenticate
   */
  INVALID_SERSSION_TOKEN = 9,

  /**
   * You must be granted with a valid key by last.fm
   */
  INVALID_API_TOKEN = 10,

  /**
   * This service is temporary offline. Try again later.
   */
  SERVICE_OFFLINE = 11,

  /**
   * Invalid method signature supplied
   */
  INVALID_SIGNATURE = 13,

  /**
   * This token has not been authorized
   */
  UNAUTHORIZED_TOKEN = 14,

  /**
   * The service is temporarily unavailable, please try again.
   */
  TEMPORARY_ERROR = 16,

  /**
   * User requires to be logged in to use this
   * This may be caused when trying to get some user's data with restricted privicy
   */
  REQUIRES_LOGIN = 17,

  /**
   * This application is not allowed to make requests to the web services
   */
  API_KEY_SUSPENDED = 26,

  /**
   * This type of request is no longer supported
   */
  DEPRECATED = 27,

  /**
   * Your IP has made too many requests in a short period
   */
  RATE_LIMIT_EXCEEDED = 29
}
