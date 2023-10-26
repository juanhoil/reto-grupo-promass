import { toast } from "react-toastify";

type ToastType = "success" | "info" | "warning" | "error" | "default";

export const showNotification = (message: string, type: ToastType) => {
  return toast(message, { type });
};

export const showNotificationError = () => {
  return toast(
    "Ocurrió un error con la solicitud. Por favor, intenta de nuevo",
    { type: "error" }
  );
};
