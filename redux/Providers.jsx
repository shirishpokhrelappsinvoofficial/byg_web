"use client";
import React, { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import LoginModal from "@components/loginmodal";
import ProgressBar from "next-nprogress-bar";
import { useRouter } from "next/navigation";
function Providers({ data, children }) {
  const Router = useRouter();

  return (
    <>
      <ProgressBar
        height="4px"
        color="rgb(229, 0, 65)"
        options={{ showSpinner: false }}
        shallowRouting
        appDirectory
      />
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <Header data={data} />
        {children}
        <Footer data={data} />
        <LoginModal />
      </Provider>
    </>
  );
}

export default Providers;
