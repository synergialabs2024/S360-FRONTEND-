import { isAxiosError } from 'axios';

import { ToastWrapper } from '@/shared/wrappers';
import { ToastSeverityType } from '../interfaces';

export interface ErrorResponse {
  code: number;
  status: string;
  message: string;
  data: ErrorData;
}

export interface ErrorData {
  invalid_fields: string[];
}

export const handleAxiosError = (
  error: any,
  customMessageErrorToast?: string | null,
  customMessageErrorSeverityToast: ToastSeverityType = 'error',
) => {
  console.log('-------------------------------------------');

  ///* axios errror handler
  if (isAxiosError(error)) {
    // custom message error
    if (customMessageErrorToast) {
      return ToastWrapper[customMessageErrorSeverityToast](
        customMessageErrorToast,
      );
    }

    // handle ErrorData from response
    const respAxiosData = error.response?.data || {};
    const { invalid_fields } = (respAxiosData as ErrorData) || {};

    // handle error as normal message
    if (!invalid_fields) {
      if (error?.response?.data?.message)
        return ToastWrapper.error(
          customMessageErrorToast || error.response?.data?.message,
        );

      console.log('error.response?.data', error.response?.data);
      if ((error as any)?.response?.data?.errors?.length) {
        return ToastWrapper.error((error as any)?.response?.data?.errors[0]);
      }

      return ToastWrapper.error(
        error?.message + 'aaaaaaaaaaaaaaa' ||
          'Error no controlado, contacte al administrador del sistema',
      );
    }

    // handle invalid fields
    for (const field of invalid_fields) {
      ToastWrapper.error(field);
    }

    return;
  }

  ToastWrapper.error(
    'Error no controlado, contacte al administrador del sistema',
  );
};
