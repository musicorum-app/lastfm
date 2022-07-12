export interface IFMResponse {
}

export interface IFMErrorResponse extends IFMResponse {
  error: number
  message: string
}
