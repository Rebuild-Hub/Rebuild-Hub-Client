import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (msg = "Success") => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

export const failureToast = (msg = "Error") => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};
