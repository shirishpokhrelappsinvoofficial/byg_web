"use client";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { loginModalHandler } from "@redux/store/loginModalSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  otpModal,
  otpModalHandler,
  profileModal,
} from "@redux/store/otpModalSlice";
import {
  profileModalHandler,
  updateIsLoggedIn,
} from "@redux/store/profileModalSlice";
import { useEffect, useState } from "react";
import { postFormData } from "@/services/httphandler";
import { toast } from "react-toastify";
import Upload from "../uploadFile";
import { getUser, updateProfile, userPurchase } from "./userSlice";
import { AddressList } from "@/redux/store/addressSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "../otpInput/OtpInput.tsx";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
const LoginModal = ({ value }) => {
  const pathname = usePathname();
  const router = useRouter();
  const state = useSelector((state) => state.loginReducer.value);
  const otp = useSelector(otpModal);
  const [time, setTime] = useState(60);
  const profile = useSelector(profileModal);
  const [loginParams, setLoginParams] = useState({
    country_code: "+91",
    mobile_number: "",
    user_type: 2,
  });
  const [profileParams, setProfileParams] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [image, setImage] = useState({
    imagePreview: "",
    image: "",
  });
  const [params, setParams] = useState({
    id: "",
    otp: "",
  });

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    mobile_number: Yup.string()
      // .matches(
      //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      //   "*Mobile number is not valid"
      // )
      .required("*Mobile number is Required."),
  });

  const {
    values,
    handleSubmit,
    touched,
    errors,
    handleChange,
    setFieldValue,
    handleBlur,
  } = useFormik({
    initialValues: loginParams,
    validationSchema,
    onSubmit: async () => {
      let formdata = new FormData();
      formdata.append("country_code", values.country_code);
      formdata.append(
        "mobile_number",
        values.mobile_number?.replaceAll(" ", "")?.replaceAll("-", "")
      );
      formdata.append("user_type", values.user_type);

      // for (const key in values) {
      //   if (Object.hasOwnProperty.call(values, key)) {
      //     const element = values[key];
      //     formdata.append(key, element);
      //   }
      // }

      let response = await postFormData("auth/login", formdata);
      if (response && response.response_code === 200 && response?.success) {
        toast.success("Success");

        dispatch(loginModalHandler());
        dispatch(otpModalHandler());
        setTime(60);
        // readOtp();
      } else {
        toast.error(response.message);
      }
    },
  });

  // const readOtp = useCallback(() => {
  //   if ("OTPCredential" in window) {
  //     const ac = new AbortController();

  //     navigator.credentials
  //       .get({
  //         otp: { transport: ["sms"] },
  //         signal: ac.signal,
  //       })
  //       .then((otp) => {
  //         setParams({ ...params, otp: otp.code });
  //         ac.abort();
  //       })
  //       .catch((err) => {
  //         ac.abort();
  //       });
  //   }
  // }, [params]);
  // useEffect(() => {
  //   readOtp();
  // }, [readOtp]);

  useEffect(() => {
    if (otp && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time, otp]);

  const handleOtp = async (e) => {
    e.preventDefault();
    if (params.otp !== "") {
      const { mobile_number, country_code, user_type } = values;
      let formdata = new FormData();
      formdata.append("country_code", country_code);
      formdata.append(
        "mobile_number",
        mobile_number?.replaceAll(" ", "")?.replace("-", "")
      );
      formdata.append("user_type", user_type);
      formdata.append("otp", params.otp);

      let response = await postFormData("auth/verifyOtp", formdata);
      if (response && response?.response_code === 200 && response?.success) {
        toast.success("Success");
        setParams({
          ...params,
          otp: "",
        });
        dispatch(otpModalHandler());
        if (response?.data?.token) Cookies.set("byg_tk", response?.data?.token);
        (async () => {
          await localStorage.setItem(
            "bookyourgift-token",
            response?.data?.token
          );
        })();

        if (response?.data?.user?.email) {
          localStorage.setItem(
            "bookyourgift",
            JSON.stringify(response?.data?.user)
          );
          dispatch(getUser());
          dispatch(AddressList());
          dispatch(userPurchase());
          dispatch(updateIsLoggedIn(true));
        } else {
          dispatch(profileModalHandler());
        }
        // router.refresh();
      } else {
        toast.error(response?.message);
      }
    } else {
      toast.error("*Please enter otp.");
    }
  };

  const dataHandler = (data) => {
    setImage({
      ...image,
      image: data.location,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email } = profileParams;
    let formdata = new FormData();
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("email", email);
    formdata.append("image", image?.image);

    dispatch(updateProfile(formdata)).then((data) => {
      if (
        data &&
        data.payload?.response_code === 200 &&
        data?.payload?.success
      ) {
        toast.success("Success");
        localStorage.setItem(
          "bookyourgift",
          JSON.stringify(data.payload.data.user)
        );
        dispatch(profileModalHandler());

        dispatch(getUser());
        dispatch(AddressList());
        dispatch(userPurchase());
        dispatch(updateIsLoggedIn(true));
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setProfileParams({
      ...profileParams,
      [name]: value,
    });
  };

  const handleResendOtp = async () => {
    let formdata = new FormData();
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const element = values[key];
        formdata.append(key, element);
      }
    }

    let response = await postFormData("auth/login", formdata);
    if (response && response.response_code === 200) {
      toast.success("Success");
      setTime(60);

      // readOtp();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Modal
        centered
        show={state}
        id="modal-login"
        dialogClassName="modal-xl"
        onHide={() => {
          dispatch(loginModalHandler());
        }}
        size="xl"
      >
        <Modal.Body className="p-0">
          <div>
            <div className="modal-content">
              <div className="modal-body p-0">
                {/* <button
                  type="button"
                  className="btn-close"
                  onClick={() => dispatch(loginModalHandler())}
                ></button> */}
                <div className="row ">
                  <div className="col-sm-12 col-md-12 col-lg-6 login-left-bg ">
                    <div className="footer-logo">
                      <img
                        alt=""
                        src="/assets/img/footer-logo.png"
                        class="img-fluid forDesktopLogin"
                      />
                      <img
                        alt=""
                        src="/assets/img/logo.png"
                        class="img-fluid forMobileLogin"
                      />
                    </div>
                    <div
                    // className={"position-relative"}
                    // style={{
                    //   height: "auto",
                    //   width: "auto",
                    //   objectFit: "contain",
                    // }}
                    >
                      <img
                        alt=""
                        src="/assets/img/login-img.png"
                        class="img-fluid loginImage"
                        // fill={true}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6 mt-lg-5">
                    <div className="form-style mt-3 mt-lg-5 px-4">
                      <form className="" onSubmit={handleSubmit}>
                        <div className="row text-center">
                          <div className="col-sm-12 col-md-12 text-center mb-3 mb-md-5">
                            <h2 className="mdl-ttl">Login</h2>
                          </div>
                          <div className="col-sm-12 col-md-12 mb-4">
                            <div className="form-group">
                              <div className="input-container">
                                <PhoneInput
                                  country="in"
                                  inputProps={{
                                    name: "mobile_number",
                                  }}
                                  enableSearch
                                  disableCountryCode
                                  value={values.mobile_number}
                                  onChange={(
                                    phone,
                                    country,
                                    e,
                                    formattedValue
                                  ) => {
                                    if (phone.length > 0) {
                                      setFieldValue("mobile_number", phone);
                                    } else {
                                      setFieldValue("mobile_number", "");
                                    }
                                  }}
                                  // onBlur={handleBlur}
                                  placeholder="Enter Mobile Number"
                                  containerclassName="form-control signupClass"
                                  inputclassName="phoneInputClass"
                                />
                                {/* <img
                                  src="/assets/img/mobile.png"
                                  className="input-img"
                                  alt=""
                                /> */}
                              </div>
                            </div>
                            {errors.mobile_number && touched.mobile_number && (
                              <div className="text-red">
                                {" "}
                                {errors.mobile_number}
                              </div>
                            )}
                          </div>
                          <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                            <button type="submit" class="btn login-mbl">
                              Login
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        dialogClassName="modal-xl"
        show={otp}
        onHide={() => dispatch(otpModalHandler())}
      >
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="row ">
              <div class="col-sm-12 col-md-12 col-lg-6 login-left-bg">
                <div className="footer-logo">
                  <img
                    alt=""
                    src="/assets/img/footer-logo.png"
                    class="img-fluid forDesktopLogin"
                  />
                  <img
                    alt=""
                    src="/assets/img/logo.png"
                    class="img-fluid forMobileLogin"
                  />
                </div>
                <img
                  alt=""
                  src="/assets/img/login-img.png"
                  class="img-fluid loginImage"
                />
                <div class="app-btn mt-4 forDesktopLogin">
                  <a href="#">
                    <img src="/assets/img/applestore.png" class="img-fluid" />
                  </a>
                  <a href="#">
                    <img src="/assets/img/googleplay.png" class="img-fluid" />
                  </a>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-6">
                <form onSubmit={handleOtp} class="login-form">
                  <div class="row">
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                      <h3>OTP Verification</h3>
                      <p>
                        Please enter 6 digit code which has been send on your
                        Mobile Number.
                      </p>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                      <div class="passcode-wrapper">
                        <OtpInput
                          // containerStyle={{
                          //   display: "flex",
                          //   justifyContent: "space-between",
                          //   width: "100%",
                          // }}
                          value={params.otp}
                          // renderInput={(props) => <input {...props} />}
                          onChange={(otp) => {
                            setParams({
                              ...params,
                              otp,
                            });
                          }}
                          valueLength={6}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      {/* <Link to="#">Resend OTP?</Link> */}
                    </div>
                    {time > 0 && (
                      <div className="opt_time mb-3 text-center">
                        <span className="o_timing">00: {time}</span>
                      </div>
                    )}
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                      <button type="submit" class="btn login-mbl">
                        Submit
                      </button>
                    </div>
                    {time === 0 && (
                      <div className="resend_code text-right">
                        <a
                          style={{
                            cursor: `${time > 0 ? "no-drop" : "pointer"}`,
                          }}
                          onClick={() => {
                            time === 0
                              ? handleResendOtp()
                              : () => {
                                  return false;
                                };
                          }}
                        >
                          {" "}
                          Resend OTP?
                        </a>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        centered
        dialogClassName="modal-xl"
        show={profile}
        onHide={() => dispatch(profileModalHandler())}
      >
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="row align-items-center">
              <div class="col-sm-12 col-md-12 col-lg-6 login-left-bg">
                <div className="footer-logo">
                  <img
                    alt=""
                    src="/assets/img/footer-logo.png"
                    class="img-fluid forDesktopLogin"
                  />
                  <img
                    alt=""
                    src="/assets/img/logo.png"
                    class="img-fluid forMobileLogin"
                  />
                </div>
                <img
                  alt=""
                  src="/assets/img/login-img.png"
                  class="img-fluid loginImage"
                />
                <div class="app-btn mt-4 forDesktopLogin">
                  <a href="#">
                    <img
                      src="/assets/img/applestore.png"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/img/googleplay.png"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-6">
                <form onSubmit={handleUpdateProfile} class="login-form">
                  <div class="row">
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                      <h3>Set Profile</h3>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                      {/* <div class="upload-btn-wrapper">
                                                <button class="btn"><img src="assets/img/uploadimg.png" /></button>
                                                <input type="file" name="myfile" />
                                            </div> */}
                      <Upload dataHandler={dataHandler} />
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                      <div class="position-relative">
                        <input
                          required
                          type="text"
                          class="form-control pl-4"
                          placeholder="First Name"
                          name="first_name"
                          onChange={handleChangeInput}
                        />
                        <img
                          alt=""
                          src="assets/img/Full-Name.png"
                          class="img-fluid input-img"
                        />
                      </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                      <div class="position-relative">
                        <input
                          required
                          type="text"
                          class="form-control pl-4"
                          placeholder="Last Name"
                          onChange={handleChangeInput}
                          name="last_name"
                        />
                        <img
                          alt=""
                          src="assets/img/Full-Name.png"
                          class="img-fluid input-img"
                        />
                      </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                      <div class="position-relative">
                        <input
                          required
                          type="email"
                          class="form-control pl-4"
                          placeholder="Email Address"
                          onChange={handleChangeInput}
                          name="email"
                        />
                        <img
                          alt=""
                          src="assets/img/email-active.png"
                          class="img-fluid input-img"
                        />
                      </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 mb-3 text-center">
                      <button type="submit" class="btn login-mbl">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
