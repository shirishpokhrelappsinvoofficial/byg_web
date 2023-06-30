"use client";
import { useDispatch, useSelector } from "react-redux";
import { getPrivacy, privacy } from "@/redux/store/cmsSlice";
import { useEffect, useState } from "react";
import Loader from "@components/loader";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const PrivacyPolicy = useSelector(privacy);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    dispatch(getPrivacy()).then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <section class="sec-bg product-wrapper pt-20 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 terms-condition">
            <h1>Privacy Policy</h1>
            {loading ? (
              <Loader />
            ) : <div
              dangerouslySetInnerHTML={{ __html: PrivacyPolicy?.content }}
            />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
