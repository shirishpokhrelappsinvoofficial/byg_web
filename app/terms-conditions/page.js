"use client";
import { useEffect, useRef, useState } from "react";
import { getTnc, tnc } from "@/redux/store/cmsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Loader from "@components/loader";

const TermsConditions = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getTnc()).then(() => {
      setLoading(false);
    });
  }, []);

  const terms = useSelector(tnc);

  return (
    <section class="sec-bg product-wrapper pt-20 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 terms-condition">
            <h1 className="text-center">
              <strong>Terms and Conditions</strong>
            </h1>
            {loading ? (
              <Loader />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: terms?.content }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
