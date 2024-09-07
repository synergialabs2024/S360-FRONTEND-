// // // Numbers ========================================
export const formatCurrency = (value: string | number): string => {
  return (+value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatQuantity = (value: string | number): string => {
  return (+value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// // // Dates ========================================
import dayjs from 'dayjs';

export const formatDate = (date?: Date | string): string => {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateWithTime = (date?: Date | string): string => {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

export const formatDateToISOString = (date?: Date | string): string => {
  if (!date) return '';
  return dayjs(date).toISOString();
};

export const formatHourByNumber = (hour: number): string => {
  return dayjs().hour(hour).minute(0).format('hh:mm A');
};

// // // Timers ========================================
export const formatCountDownTimer = (timer: number): string => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return `${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};
