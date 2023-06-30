"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aboutUs, getAboutUs } from "../../redux/store/cmsSlice";
import Loader from "@components/loader";

export default function AboutUs() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getAboutUs()).then(() => {
      setLoading(false);
    });
  }, []);

  const about = useSelector(aboutUs);

  return (
    <section class="sec-bg product-wrapper pt-20 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 terms-condition">
            <h1 className="text-center">
              <strong>About Us</strong>
            </h1>
            {loading ? (
              <Loader />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: about?.about_us?.content }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
