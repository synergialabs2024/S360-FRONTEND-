import { FieldErrors } from 'react-hook-form';

// // // Numbers ========================================
export const formatCurrency = (value: string | number): string => {
  return (+value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
export function formatToNDecimals(value: number, decimals: number = 2): string {
  // 1) Creamos un factor 10^decimals
  const factor = 10 ** decimals;
  // 2) Sumamos un pequeño EPSILON para minimizar errores de IEEE754
  //    Luego redondeamos al entero más cercano y devolvemos
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor;
  // 3) toFixed se encarga de rellenar con ceros si hace falta
  return rounded.toFixed(decimals);
}

export const formatQuantity = (value: string | number): string => {
  return (+value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// // // Dates ========================================
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

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

export const formatHourTimeField = (hour: string): string => {
  return dayjs(hour, 'HH:mm').format('hh:mm A');
};

export const formatDateLong = (date?: Date | string): string => {
  if (!date) return '';
  const formattedDate = dayjs(date).format('dddd, MMMM DD, YYYY');

  return capitalizeFirstLetterOfEachWord(formattedDate);
};

// // // Timers ========================================
export const formatCountDownTimer = (timer: number): string => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return `${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

// // // Common ========================================
export const humanizeString = (str: string): string => {
  const re1 = str.replace(/_/g, ' ');

  return re1.charAt(0).toUpperCase() + re1.slice(1);
};
export const humanizeStringArr = (arr: string[]): string[] =>
  arr.map(humanizeString);
export const getKeysFormErrorsMessage = (errors: FieldErrors<any>): string => {
  const keys = humanizeStringArr(Object.keys(errors)).join(', ');

  return keys.length > 12 ? `${keys.slice(0, 90)}...` : keys;
};

export const sanitizeDataResetForm = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeDataResetForm);
  } else if (obj !== null && typeof obj === 'object') {
    const sanitizedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitizedObj[key] = sanitizeDataResetForm(obj[key]);
      }
    }
    return sanitizedObj;
  } else if (obj === null) {
    return undefined;
  } else {
    return obj;
  }
};

export const formatExpirationDateCreditCard = (date: string): string => {
  return date.replace(/(\d{2})(\d{2})/, '$1/$2');
};

export const capitalizeFirstLetterOfEachWord = (str: string): string => {
  return str.replace(/(?:^|\s)\S/g, char => char.toUpperCase());
};

// // // Data to send to backend ========================================
export const sanitizeDataForSend = (obj: any): any => {
  if (Array.isArray(obj)) {
    // Si es un array, aplicar la sanitización a cada elemento
    return obj.map(sanitizeDataForSend).filter(item => item !== undefined); // Opcional: eliminar elementos undefined si es necesario
  } else if (obj !== null && typeof obj === 'object') {
    // Si es un objeto, crear un nuevo objeto sanitizado
    const sanitizedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (typeof value === 'string' && value.trim() === '') {
          // **Eliminar** propiedades con cadenas vacías
          continue;
        }
        if (value === null) {
          // **Eliminar** propiedades con null
          continue;
        }
        if (
          key.endsWith('_data') &&
          (typeof value === 'object' || Array.isArray(value))
        ) {
          // **Eliminar** propiedades que terminan con _data y son objetos o arrays
          continue;
        }
        // **Eliminar** todo lo q empieza con `raw`y sigue de algo en mayuscula
        if (key.match(/raw[A-Z]/)) {
          continue;
        }
        // **Eliminar** propiedades con valores undefined
        if (value === undefined) {
          continue;
        }
        // Aplicar sanitización recursivamente
        const sanitizedValue = sanitizeDataForSend(value);
        // **Mantener** propiedades con otros valores
        sanitizedObj[key] = sanitizedValue;
      }
    }
    return sanitizedObj;
  } else {
    // Para valores primitivos que no son cadenas vacías, retornarlos tal cual
    return obj;
  }
};
