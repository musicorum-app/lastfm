import { LastfmErrorResponse } from './types/responses'

export function isLastfmError(error: unknown): error is LastfmErrorResponse {
  return (
    !!error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error
  )
}
