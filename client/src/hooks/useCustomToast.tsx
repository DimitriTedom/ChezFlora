import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";

type ToastType = "success" | "error";

interface CustomToastProps {
  message: string;
  subtitle?: string;
  type?: ToastType;
  duration?: number; // durée de visibilité "idéale" (sans transition)
}

export const useCustomToast = () => {
  const showCustomToast = ({
    message,
    subtitle,
    type = "success",
    duration = 5000,
  }: CustomToastProps) => {
    const transitionDuration = 1000; // durée de la transition de la barre (en ms)
    const totalDuration = duration + transitionDuration;

    const id = toast(
      <div
        className={`rounded-lg shadow-md p-4 w-full space-y-2 text-white ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
        aria-live="polite"
      >
        <div className="flex justify-between items-center">
          <strong>{message}</strong>
          <button
            className="opacity-70 hover:opacity-100"
            onClick={() => id && toast.dismiss(id)}
          >
            ×
          </button>
        </div>
        {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
        <ProgressBar duration={totalDuration} type={type} />
      </div>,
      { duration: totalDuration }
    );

    return id;
  };

  return { showCustomToast };
};

interface ProgressBarProps {
  duration: number;
  type: ToastType;
}

const ProgressBar = ({ duration, type }: ProgressBarProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // On met à jour la barre toutes les 50ms pour une transition plus fluide
    const interval = setInterval(() => {
      setProgress((prev) => {
        const decrement = 100 / (duration / 50);
        return Math.max(0, prev - decrement);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="h-1 bg-white rounded-full overflow-hidden mt-2">
      <div
        className="h-full bg-opacity-30 transition-all duration-1000"
        style={{
          width: `${progress}%`,
          backgroundColor: type === "success" ? "green" : "red",
        }}
      />
    </div>
  );
};

// Fournisseur de toast
export const ToastProvider = () => <Toaster position="top-right" />;
