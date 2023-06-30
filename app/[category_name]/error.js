"use client";
import React from "react";

function Error({ error, reset }) {
  return (
    <div className="col-sm-12 text-center">
      {error}
      <div>
        <button className="main-btn primary-btn mt-4" onClick={() => reset()}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default Error;
