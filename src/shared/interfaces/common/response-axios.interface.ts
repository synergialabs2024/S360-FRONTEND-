/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

export interface PagingMetaResponse {
  next: number | null;
  previous: number | null;
  count: number;
  total_pages: number;
}

export enum HTTPResStatusCodeEnum {
  ///* Ok
  OK = 200,
  CREATED = 200,

  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,

  ACTIVE_SESSION = 409, // active session

  USER_BLOCKED = 423, // fail login more than 3 times
}
