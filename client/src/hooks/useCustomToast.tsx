// src/hooks/useCustomToast.tsx
import { toast, ToastOptions,ToastPosition } from 'react-toastify';
import CustomToast from '../components/CustomToast';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastParams {
  message: string;
  subtitle?: string;
  type?: ToastType;
  duration?: number;
}

export const useCustomToast = () => {
  const showToast = ({
    message,
    subtitle,
    type = 'success',
    duration=5000,
  }: ToastParams) => {
    return toast[type](
      <CustomToast 
        type={type} 
        message={message} 
        subtitle={subtitle} 
      />,
      {
        autoClose: duration,
        closeButton: false,
        position: "top-right" as ToastPosition,
        hideProgressBar: false,
        progressClassName: 'bg-white',
        progressStyle: { transition: 'width 0.3s ease' },
        pauseOnHover: true,
      } as ToastOptions
    );
  };

  const promiseToast = (
    promise: Promise<any>,
    {
      pending = 'Processing...',
      success = 'Success!',
      error = 'Something went wrong',
    }: {
      pending?: string;
      success?: string;
      error?: string;
    }
  ) => {
    return toast.promise(
      promise,
      {
        pending: <CustomToast type="info" message={pending} />,
        success: <CustomToast type="success" message={success} />,
        error: <CustomToast type="error" message={error} />,
      },
      {
        position:  "top-right" as ToastPosition,
        autoClose: 5000,
        closeButton: false,
      } as ToastOptions
    );
  };

  return { showToast, promiseToast };
};