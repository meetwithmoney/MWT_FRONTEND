import { ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import successToastIcon from "../../assets/images/success-toast.png";
// import errorToastIcon from "../../assets/images/error-toast.png";
// import infoToastIcon from "../../assets/images/info-toast.png";
// import warningToastIcon from "../../assets/images/warning-toast.png";

const ToastNotification = () => {
  const toastNotification = {
    position: "top-right",
    autoCloseTimeOut: 1500,
    hideProgress: true,
  };
  return (
    <ToastContainer
      position={toastNotification.position as ToastPosition}
      closeButton={true}
      autoClose={toastNotification.autoCloseTimeOut}
      hideProgressBar={toastNotification.hideProgress}
      pauseOnHover={true}
      // icon={({ type }) => {
      //   if (type === "success") return <img src={successToastIcon} />;
      //   if (type === "error") return <img src={errorToastIcon} />;
      //   if (type === "info") return <img src={infoToastIcon} />;
      //   if (type === "warning") return <img src={warningToastIcon} />;
      // }}
    />
  );
};

export default ToastNotification;
