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
  // initalOtpCountMinutes = 0.1667, // 10 seconds
  // initalOtpCountSeconds = 10, // 10 seconds
  initalOtpCountMinutes = 10, // 10 minutes
  initalOtpCountSeconds = 600, // 10 minutes

  // initialOtpRangeNewOtpMinutes = 0.1, // 6 seconds
  // initialOtpRangeNewOtpSeconds = 6, // 6 seconds
  initialOtpRangeNewOtpMinutes = 2, // 2 minutes
  initialOtpRangeNewOtpSeconds = 120, // 2 minutes
}

export enum TimerAgendamientoCacheEnum {
  initialAgendamientoMinutes = 10, // 10 minutes
  initialAgendamientoSeconds = 600, // 10 minutes
}
