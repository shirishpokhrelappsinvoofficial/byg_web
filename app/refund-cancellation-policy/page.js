"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancellationPolicy,
  getCancellationPolicy,
} from "@/redux/store/cmsSlice";
import Loader from "@components/loader";

function RefundAndCancellationPolicy() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cancellation = useSelector(cancellationPolicy);

  useEffect(() => {
    if (!cancellation) {
      setLoading(true);
      dispatch(getCancellationPolicy()).then(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <section class="sec-bg product-wrapper pt-20 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 terms-condition">
            <h1 className="text-center">
              <strong>Refund & Cancellation Policy</strong>
            </h1>
            {loading ? (
              <Loader />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: cancellation?.content }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RefundAndCancellationPolicy;
