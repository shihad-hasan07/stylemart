'use client';
import { ToastContainer } from "react-toastify";

export default function () {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1200}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="light"
    />
  );
}
