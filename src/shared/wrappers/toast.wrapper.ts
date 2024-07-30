import { Id, ToastOptions, toast } from 'react-toastify';

export class ToastWrapper {
  static success(
    message: string,
    options?: ToastOptions<unknown> | undefined,
  ): Id {
    return toast.success(message, options);
  }

  static error(
    message: string,
    options?: ToastOptions<unknown> | undefined,
  ): Id {
    return toast.error(message, options);
  }

  static warning(
    message: string,
    options?: ToastOptions<unknown> | undefined,
  ): Id {
    return toast.warning(message, options);
  }

  static info(
    message: string,
    options?: ToastOptions<unknown> | undefined,
  ): Id {
    return toast.info(message, options);
  }
}
