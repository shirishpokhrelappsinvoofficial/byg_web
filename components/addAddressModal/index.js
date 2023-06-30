import Modal from "react-bootstrap/Modal";
import { useCallback, useState } from "react";
// import { Select } from 'antd';
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInputText from "../FormInputText";
import { useDispatch, useSelector } from "react-redux";
import { AddAddress } from "@/redux/store/addressSlice";
import { cities } from "@/redux/store/citySlice";
import { toast } from "react-toastify";
import { getData } from "@/services/httphandler";
import home from "../../public/assets/img/home.png";
import home_black from "../../public/assets/img/home_black.png";
import office from "../../public/assets/img/office.png";
import office_white from "../../public/assets/img/office_white.png";
import location_white from "../../public/assets/img/location_white.png";
import location_black from "../../public/assets/img/location_black.png";
import Image from "next/image";

const AddAddressModal = () => {
  const dispatch = useDispatch();
  const [state, setstate] = useState(false);
  const [params, setparams] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    country_code: "+91",
    resident_type: "home",
  });

  const cityList = useSelector(cities);
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("*First name is required"),
    last_name: Yup.string().required("*Last name is required"),
    email: Yup.string().email("Invalid email").required("*Email is required"),
    mobile_number: Yup.string().required("*Phone number is required"),
    address: Yup.string().required("*Address is required"),
    city: Yup.string().required("*City name is required"),
    zipcode: Yup.string().required("*Zip code is required"),
    country: Yup.string().required("*Country is required"),
    state: Yup.string().required("*State is required"),
  });

  const {
    values,
    handleSubmit,
    setValues,
    setErrors,
    touched,
    errors,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: params,
    validationSchema,
    onSubmit: async () => {
      let formdata = new FormData();
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const element = values[key];
          formdata.append(key, element);
        }
      }

      formdata.append("resident_type", params.resident_type);
      dispatch(AddAddress(formdata)).then((data) => {
        if (data && data.payload.response_code === 200) {
          toast.success("Address Added Successfully ..!!");
          setstate(false);
          resetForm(params);
        } else {
          toast.error(data?.payload?.message);
        }
      });
    },
  });
  const hitApi = useCallback(
    async (value) => {
      let response = await getData(`addressDetail/${value}`);
      if (response && response.response_code === 200) {
        const { address_components } = response.data;
        setValues({
          ...values,
          city: address_components[1].long_name,
          state: address_components[address_components.length - 2].long_name,
          country: address_components[address_components.length - 1].long_name,
        });
      } else {
        toast.error("*Invalid Code");
        setValues({
          ...values,
          city: "",
          state: "",
          country: "",
        });
      }
    },
    [values.zipcode]
  );

  const handleChangePin = async (e) => {
    setValues({
      ...values,
      zipcode: e.target.value,
    });
    // hitApi(e.target.value)
  };
  const handleResidentChange = (e) => {
    setparams({
      ...params,
      resident_type: e.target.value,
    });
  };

  return (
    <>
      <button
        onClick={() => setstate(true)}
        class="btn btn-cancel add-new-address m-3"
      >
        Add New Address
      </button>

      <Modal
        dialogClassName="modal-xl custom-width"
        show={state}
        onHide={() => setstate(false)}
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Delivery Address</h5>
            <button
              type="button"
              onClick={() => setstate(false)}
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleSubmit} class="checkout-steps-form-content">
              <div class="row">
                <div class="col-md-12">
                  <div class="single-form form-default">
                    <label>User Name</label>
                    <div class="row">
                      <div class="col-md-6 form-input">
                        <input
                          name="first_name"
                          value={values.first_name}
                          onChange={handleChange}
                          type="text"
                          placeholder="First Name"
                        />

                        <span className="errorMessage">
                          {touched["first_name"] && errors["first_name"]}
                        </span>
                      </div>
                      <div class="col-md-6 form-input">
                        <input
                          name="last_name"
                          value={values.last_name}
                          onChange={handleChange}
                          type="text"
                          placeholder="Last Name"
                        />

                        <span className="errorMessage">
                          {touched["last_name"] && errors["last_name"]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
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
                    title="Phone Number"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    value={values.mobile_number}
                    name="mobile_number"
                    type="number"
                  />

                  <span className="errorMessage">
                    {touched["mobile_number"] && errors["mobile_number"]}
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
                        rows="5"
                      ></textarea>
                      <span className="errorMessage">
                        {touched["address"] && errors["address"]}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <FormInputText
                    title="Pin Code"
                    placeholder="Pin Code"
                    onBlur={handleChangePin}
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
                  {/* <div
                    className="code_wrapper"
                    // onClick={() => toast.error("*please fill pin code first")}
                    style={{ position: "relative", cursor: "pointer" }}
                  ></div> */}
                  <FormInputText
                    title="City"
                    placeholder="City"
                    onChange={handleChange}
                    //   disabled={true}
                    value={values.city}
                    name="city"
                    type="text"
                  />

                  <span className="errorMessage">
                    {touched["city"] && errors["city"]}
                  </span>
                </div>

                <div class="col-md-6">
                  {/* <div
                    className="code_wrapper"
                    // onClick={() => toast.error("*please fill pin code first")}
                    style={{ position: "relative", cursor: "pointer" }}
                  ></div> */}
                  <FormInputText
                    title="State"
                    placeholder="State"
                    onChange={handleChange}
                    //   disabled={true}
                    value={values.state}
                    name="state"
                    type="text"
                  />
                  <span className="errorMessage">
                    {touched["state"] && errors["state"]}
                  </span>
                </div>
                <div class="col-md-6">
                  {/* <div
                    className="code_wrapper"
                    // onClick={() => toast.error("*please fill pin code first")}
                    style={{ position: "relative", cursor: "pointer" }}
                  >

                  </div> */}
                  <FormInputText
                    title="Country"
                    placeholder="Country"
                    onChange={handleChange}
                    //   disabled={true}
                    value={values.country}
                    name="country"
                    type="text"
                  />

                  <span className="errorMessage">
                    {touched["country"] && errors["country"]}
                  </span>
                </div>
                <div class="col-md-12">
                  <div class="home-office-other">
                    <div>
                      <input
                        type="radio"
                        onChange={handleResidentChange}
                        checked={params.resident_type === "home"}
                        id="place_01"
                        name="select"
                        value="home"
                      />
                      <label htmlFor="place_01">
                        <p>
                          <Image
                            src={
                              params.resident_type === "home"
                                ? home
                                : home_black
                            }
                            alt={"rs"}
                            height={15}
                            width={15}
                          />
                          Home
                        </p>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        onChange={handleResidentChange}
                        id="place_02"
                        name="select"
                        value="office"
                        checked={params.resident_type === "office"}
                      />
                      <label htmlFor="place_02">
                        <p>
                          <Image
                            src={
                              params.resident_type === "office"
                                ? office_white
                                : office
                            }
                            alt={"rs"}
                            height={15}
                            width={15}
                          />{" "}
                          Office
                        </p>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        onChange={handleResidentChange}
                        id="place_03"
                        name="select"
                        value="other"
                        checked={params.resident_type === "other"}
                      />
                      <label htmlFor="place_03">
                        <p>
                          <Image
                            src={
                              params.resident_type === "other"
                                ? location_white
                                : location_black
                            }
                            alt={"rs"}
                            height={15}
                            width={15}
                          />{" "}
                          Other
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="single-form cancel-save-btn">
                    <button
                      onClick={() => setstate(false)}
                      type="reset"
                      class="btn btn-cancel w-100"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-success w-100">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddAddressModal;
