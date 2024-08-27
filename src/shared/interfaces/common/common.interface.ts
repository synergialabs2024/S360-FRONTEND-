// // CACHE ENDPOINTS ====================================

export interface SetCacheBody {
  key: string;
  data: object | null;
  timeout?: number;
}

export interface CacheResponse<T> {
  status: number;
  message: string;
  data: T;
}

export enum TimerSolicitudServicioEnum {
  // initialCountMinutes = 0.35, // approximately 21 seconds
  // initialCountSeconds = 21, // 21 seconds

  // initialCountMinutes = 0.1667, // approximately 10 seconds
  // initialCountSeconds = 10, // 10 seconds

  initalOtpCountSeconds = 600, // 10 minutes

  initialOtpRangeNewOtpSeconds = 120, // 2 minutes
}
