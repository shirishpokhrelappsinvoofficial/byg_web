"use client";
/* eslint-disable react/display-name */
// HOC/withAuth.jsx
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginModalHandler } from "@/redux/store/loginModalSlice";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const dispatch = useDispatch();
      const accessToken =
        Cookies.get("byg_tk") || localStorage.getItem("bookyourgift-token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/");
        dispatch(loginModalHandler(true));
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
