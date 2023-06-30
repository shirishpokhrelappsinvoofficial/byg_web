"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInputText from "@/components/FormInputText";
import { useDispatch, useSelector } from "react-redux";
import Upload from "@/components/uploadFile";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { postFormDataWithToken } from "@services/httphandler";

function AccessPage() {
  const [image, setImage] = useState([]);
  const [clearImage, setClearImage] = useState(false);
  const validationSchema = Yup.object().shape({
    category_type: Yup.string().required("*Category Type is required"),
    // name: Yup.string().required("*Name is required"),
    // mobile_number: Yup.string()
    //   .matches(/^[6789]\d{9}$/, "Kindly enter a valid number.")
    //   .required("*Phone number is required"),
    address: Yup.string().required("*Address is required"),
    payment_mode: Yup.string().required("*Payment Mode is required"),
    advance: Yup.string().when("payment_mode", {
      is: (type) => type === "cod",
      then: (schema) => schema.required("*Advance is required"),
      otherwise: (schema) => schema,
    }),
    cod_amount: Yup.string().when("payment_mode", {
      is: (type) => type === "cod",
      then: (schema) => schema.required("*Amount is required"),
      otherwise: (schema) => schema,
    }),
    online_amount: Yup.string().when("payment_mode", {
      is: (type) => type === "online_payment",
      then: (schema) => schema.required("*Amount is required"),
      otherwise: (schema) => schema,
    }),
    name_on_wallet: Yup.string().when("category_type", {
      is: (type) => type === "wallet",
      then: (schema) => schema.required("*Name on Wallet is required"),
      otherwise: (schema) => schema,
    }),
    items: Yup.string().when("category_type", {
      is: (type) => type === "wallet",
      then: (schema) => schema.required("*Items is required"),
      otherwise: (schema) => schema,
    }),
    charms: Yup.string().when("category_type", {
      is: (type) => type === "wallet",
      then: (schema) => schema.required("*Charms is required"),
      otherwise: (schema) => schema,
    }),
    images: Yup.array()?.min(1, "*Kindly upload images."),
    note: Yup.string(),
  });
  const {
    values,
    handleSubmit,
    touched,
    errors,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      category_type: "",
      name: "",
      mobile_number: "",
      address: "",
      payment_mode: "",
      advance: "",
      cod_amount: "",
      online_amount: "",
      name_on_wallet: "",
      items: "",
      charms: "",
      images: "",
      note: "",
    },
    validationSchema,
    onSubmit: async () => {
      console.log(errors);
      const {
        category_type,
        name,
        mobile_number,
        address,
        payment_mode,
        advance,
        cod_amount,
        online_amount,
        name_on_wallet,
        items,
        charms,
        image,
        note,
      } = values;
      let formdata = new FormData();
      formdata.append("category_type", category_type);
      formdata.append("name", name);
      formdata.append("mobile_number", mobile_number);
      formdata.append("address", address);
      formdata.append("payment_mode", payment_mode);
      formdata.append("advance", advance);
      formdata.append("cod_amount", cod_amount);
      formdata.append("online_amount", online_amount);
      formdata.append("name_on_wallet", name_on_wallet);
      formdata.append("items", items);
      formdata.append("charms", charms);
      formdata.append("note", note);
      formdata.append("images", image?.length > 0 ? image?.toString() : "");
      if (image?.length !== "") {
        postFormDataWithToken("addOtherOrder", formdata).then((data) => {
          if (data && data?.response_code === 200) {
            resetForm();
            setClearImage(true);
            toast.success("Success");
          } else {
            toast.error(data?.message);
          }
        });
      } else {
        toast.error("*Please upload an image.");
      }
    },
  });

  const dataHandler = (data) => {
    console.log("data: ", data);

    setImage(data);
    setFieldValue("image", data);
  };
  return (
    <section class="sec-bg product-wrapper pt-20 pb-70">
      <div class="container">
        <div class="row">
          <div className="text-center col-sm-12">
            <h2>Add Order</h2>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12 ">
            <form onSubmit={handleSubmit} class="">
              <div class="row">
                <div class="col-md-12 text-center">
                  <div class="single-form form-default">
                    <Upload
                      dataHandler={dataHandler}
                      multiple={true}
                      clearImage={clearImage}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="select-elements select-style-2 mt-30">
                    <label>Category Type</label>
                    <div class="select-items select">
                      <select
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        value={values.category_type}
                        name="category_type"
                      >
                        <option value="">Select</option>
                        <option value="wallet">Wallet</option>
                        <option value="wall_hanging">Wall Hanging</option>
                      </select>
                    </div>
                  </div>
                  <span className="errorMessage">
                    {touched["category_type"] && errors["category_type"]}
                  </span>
                </div>
                {/* <div class="col-md-6">
                  <FormInputText
                    title="Name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    type="text"
                  />

                  <span className="errorMessage">
                    {touched["name"] && errors["name"]}
                  </span>
                </div> */}

                {/* <div className="col-sm-6 ">
                  <div className="single-form form-default form-group">
                    <label>Mobile Number</label>
                    <div className="input-container">
                      <PhoneInput
                        country="in"
                        inputProps={{
                          name: "mobile_number",
                        }}
                        enableSearch
                        disableCountryCode
                        value={values.mobile_number}
                        onChange={(phone, country, e, formattedValue) => {
                          if (phone.length > 0) {
                            setFieldValue("mobile_number", phone);
                          } else {
                            setFieldValue("mobile_number", "");
                          }
                        }}
                        placeholder="Enter Mobile Number"
                        containerClass="signupClass form-input"
                        inputClass="addOrderPhone"
                      />
                    </div>
                  </div>
                  <span className="errorMessage">
                    {touched["mobile_number"] && errors["mobile_number"]}
                  </span>
                </div> */}
                <div class="col-md-6">
                  <div class="select-elements select-style-2 mt-30">
                    <label>Payment Mode</label>
                    <div class="select-items select">
                      <select
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        value={values.payment_mode}
                        name="payment_mode"
                      >
                        <option value="">Select</option>
                        <option value="cod">COD</option>
                        <option value="online_payment">Online Payment</option>
                      </select>
                    </div>
                  </div>
                  <span className="errorMessage">
                    {touched["payment_mode"] && errors["payment_mode"]}
                  </span>
                </div>
                <div class="col-md-12">
                  <div class="single-form form-default">
                    <label>Address</label>
                    <div class="form-input">
                      <textarea
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        placeholder="Recipient Address"
                        rows="3"
                      ></textarea>
                      <span className="errorMessage">
                        {touched["address"] && errors["address"]}
                      </span>
                    </div>
                  </div>
                </div>

                {values?.payment_mode === "cod" && (
                  <>
                    <div class="col-md-6">
                      <FormInputText
                        title="Advance"
                        placeholder="Advance"
                        onChange={handleChange}
                        value={values.advance}
                        name="advance"
                        type="text"
                        typeOf="number"
                      />

                      <span className="errorMessage">
                        {touched["advance"] && errors["advance"]}
                      </span>
                    </div>
                    <div class="col-md-6">
                      <FormInputText
                        title="Cod Amount"
                        placeholder="Cod Amount"
                        onChange={handleChange}
                        value={values.cod_amount}
                        name="cod_amount"
                        type="text"
                        typeOf="number"
                      />

                      <span className="errorMessage">
                        {touched["cod_amount"] && errors["cod_amount"]}
                      </span>
                    </div>
                  </>
                )}
                {values?.payment_mode === "online_payment" && (
                  <>
                    <div class="col-md-6">
                      <FormInputText
                        title="Online Amount"
                        placeholder="Online Amount"
                        onChange={handleChange}
                        value={values.online_amount}
                        name="online_amount"
                        type="text"
                        typeOf="number"
                      />

                      <span className="errorMessage">
                        {touched["online_amount"] && errors["online_amount"]}
                      </span>
                    </div>
                  </>
                )}

                {values.category_type === "wallet" && (
                  <>
                    <div class="col-md-6">
                      <FormInputText
                        title="Name on Wallet"
                        placeholder="Name on Wallet"
                        onChange={handleChange}
                        value={values.name_on_wallet}
                        name="name_on_wallet"
                        type="text"
                      />

                      <span className="errorMessage">
                        {touched["name_on_wallet"] && errors["name_on_wallet"]}
                      </span>
                    </div>
                    <div class="col-md-6">
                      <FormInputText
                        title="Items"
                        placeholder="Items"
                        onChange={handleChange}
                        value={values.items}
                        name="items"
                        type="text"
                      />

                      <span className="errorMessage">
                        {touched["items"] && errors["items"]}
                      </span>
                    </div>{" "}
                    <div class="col-md-6">
                      <FormInputText
                        title="Charms"
                        placeholder="Charms"
                        onChange={handleChange}
                        value={values.charms}
                        name="charms"
                        type="text"
                      />

                      <span className="errorMessage">
                        {touched["charms"] && errors["charms"]}
                      </span>
                    </div>
                  </>
                )}

                <div class="col-md-12">
                  <div class="single-form form-default">
                    <label>Note</label>
                    <div class="form-input">
                      <textarea
                        name="note"
                        value={values.note}
                        onChange={handleChange}
                        placeholder="Additional information here..."
                        rows="3"
                      ></textarea>
                      <span className="errorMessage">
                        {touched["note"] && errors["note"]}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 text-center mt-3">
                  <button type="submit" class="main-btn primary-btn w-20">
                    Update
                  </button>
                </div>
                {/* <div class="col-md-6">
                  <FormInputText
                    title="Email Address"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                  />

                  <span className="errorMessage">
                    {touched["email"] && errors["email"]}
                  </span>
                </div>

            
             
                <div class="col-md-6">
                  <FormInputText
                    title="City"
                    placeholder="City"
                    onChange={handleChange}
                    value={values.city}
                    name="city"
                    type="text"
                  />

                  <span className="errorMessage">
                    {touched["city"] && errors["city"]}
                  </span>
                </div>
                <div class="col-md-6">
                  <FormInputText
                    title="Zip Code"
                    placeholder="Post Code"
                    onChange={handleChange}
                    value={values.zipcode}
                    name="zipcode"
                    type="number"
                  />

                  <span className="errorMessage">
                    {touched["zipcode"] && errors["zipcode"]}
                  </span>
                </div>
                <div class="col-md-6">
                  <div class="select-elements select-style-2 mt-30">
                    <label>Country</label>
                    <div class="select-items select">
                      <select
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        value={values.country}
                        name="country"
                      >
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <span className="errorMessage">
                    {touched["country"] && errors["country"]}
                  </span>
                </div>
                <div class="col-md-6">
                  <div class="select-elements select-style-2 mt-30">
                    <label>Region/State</label>
                    <div class="select-items select">
                      <select
                        onChange={handleChange}
                        value={values.state}
                        name="state"
                        style={{ width: "100%" }}
                      >
                        <option value="">select</option>
                        {cityList &&
                          cityList.map((data) => {
                            return (
                              <option value={data.id}>{data.state}</option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <span className="errorMessage">
                    {touched["state"] && errors["state"]}
                  </span>
                </div>
               */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccessPage;
