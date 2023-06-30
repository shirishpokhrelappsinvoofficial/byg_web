import React from "react";
import "./loader.css";
function LoadingServerData() {
  return (
    <div className="lds-roller m-auto">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {/* <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> */}
    </div>
  );
}

export default LoadingServerData;
