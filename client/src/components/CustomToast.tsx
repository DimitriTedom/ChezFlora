// src/components/CustomToast.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContentProps } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface CustomToastProps extends Partial<ToastContentProps> {
  type: ToastType;
  message: string;
  subtitle?: string;
}

const iconMap = {
  success: faCheckCircle,
  error: faTimesCircle,
  warning: faExclamationTriangle,
  info: faInfoCircle,
};

const bgColorMap = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
};

const CustomToast = ({
  type,
  message,
  subtitle,
  closeToast,
  toastProps,
  isPaused,
  ...props
}: CustomToastProps) => {
  // Use the provided progress value or default to 0.
  const progress = toastProps?.progress || 0;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`relative flex items-center p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${bgColorMap[type]} text-white min-w-[300px]`}
      onMouseEnter={props.pauseOnHover ? () => isPaused?.(true) : undefined}
      onMouseLeave={props.pauseOnHover ? () => isPaused?.(false) : undefined}
      style={{ zIndex: 9999 }}
    >
      <FontAwesomeIcon
        icon={iconMap[type]}
        className="mr-3 text-2xl flex-shrink-0"
      />
      <div className="flex-1">
        <div className="font-semibold">{message}</div>
        {subtitle && <div className="text-sm opacity-90">{subtitle}</div>}
      </div>
      <button
        aria-label="Close notification"
        className="ml-3 text-white opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white rounded flex-shrink-0"
        onClick={() => closeToast?.()}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      {progress !== undefined && (
        <div className="absolute bottom-0 left-0 w-full">
          <div className="w-full h-1 bg-white rounded-full mt-2">
            <div
              className="h-full bg-opacity-30 transition-all duration-1000"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: 'white',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomToast;
