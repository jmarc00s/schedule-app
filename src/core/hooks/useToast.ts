import { toast, ToastOptions } from 'react-toastify';

export const useToast = () => {
  function showSuccessToast(message: string, options?: ToastOptions) {
    toast.success(message, options);
  }
  function showErrorToast(message: string, options?: ToastOptions) {
    toast.error(message, options);
  }
  function showWarningToast(message: string, options?: ToastOptions) {
    toast.warning(message, options);
  }
  function showDefaultToast(message: string, options?: ToastOptions) {
    toast(message, options);
  }

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showDefaultToast,
  };
};
