export type Global = 'init' | 'checked' | 'disabled'

export enum CheckStatus {
  init = 'init',
  run = 'run',
  failed = 'failed',
  finished = 'finished',
}

export interface PageParam {
  page: number
  perPage: number
}

export interface Dictionary<T> {
    [Key: string]: T;
}
