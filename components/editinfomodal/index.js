import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { Select } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInputText from "../FormInputText";
import { useDispatch, useSelector } from "react-redux";
import { cities, getCityList } from "@/redux/store/citySlice";
import Upload from "../uploadFile";
import { getUser, updateProfile } from "@/redux/store/userSlice";
import { toast } from "react-toastify";

const EditInfoModal = ({ details }) => {
  const dispatch = useDispatch();
  const [state, setstate] = useState(false);
  const [image, setImage] = useState({
    imagePreview: "",
    image: details.image,
  });
  const [params, setparams] = useState({
    first_name: details.first_name,
    last_name: details.last_name,
    email: details.email,
    mobile_number: details.mobile_number,
    address: details?.address?.address,
    city: details?.address?.city,
    zipcode: details?.address?.zipcode,
    country: details?.address?.country,
    state: details?.address?.state?.id || "",
    country_code: "+91",
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

  useEffect(() => {
    dispatch(getCityList());
  }, [dispatch]);

  const { values, handleSubmit, touched, errors, handleChange } = useFormik({
    initialValues: params,
    validationSchema,
    onSubmit: async () => {
      const {
        first_name,
        last_name,
        mobile_number,
        address,
        city,
        zipcode,
        country,
        state,
        email,
      } = values;
      let formdata = new FormData();
      formdata.append("first_name", first_name);
      formdata.append("email", email);
      formdata.append("last_name", last_name);
      formdata.append("mobile_number", mobile_number);
      formdata.append("address", address);
      formdata.append("city", city);
      formdata.append("zipcode", zipcode);
      formdata.append("country", country);
      formdata.append("state", state);
      formdata.append("image", image?.image);

      if (image.image !== "") {
        dispatch(updateProfile(formdata)).then((data) => {
          if (data && data.payload?.response_code === 200) {
            toast.success("Success");
            dispatch(getUser());
            setstate(false);
          } else {
            toast.error(data?.payload?.message);
          }
        });
      } else {
        toast.error("*Please upload an image.");
      }
    },
  });

  const dataHandler = (data) => {
    setImage({
      ...image,
      image: data.location,
    });
  };
  return (
    <>
      <button class="btn btn-info" onClick={() => setstate(true)}>
        Edit Info
      </button>
      <Modal
        dialogClassName="modal-xl custom-width"
        show={state}
        onHide={() => setstate(false)}
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Info</h5>
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
            <div class="col-md-12 text-center">
              <div class="single-form form-default">
                {/* <div class="upload-btn-wrapper">
                                    <button type='button' class="btn"><img alt="" src={params.image || "assets/img/uploadimg.png"} /></button>
                                    <input type="file" name="myfile" />
                                </div> */}
                <Upload
                  imager={image.image || details.image}
                  dataHandler={dataHandler}
                />
              </div>
            </div>
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
                        {/* <option value="Afganistan">Afghanistan</option>
                                                <option value="Albania">Albania</option>
                                                <option value="Algeria">Algeria</option>
                                                <option value="American Samoa">American Samoa</option>
                                                <option value="Andorra">Andorra</option>
                                                <option value="Angola">Angola</option>
                                                <option value="Anguilla">Anguilla</option>
                                                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Armenia">Armenia</option>
                                                <option value="Aruba">Aruba</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Austria">Austria</option>
                                                <option value="Azerbaijan">Azerbaijan</option>
                                                <option value="Bahamas">Bahamas</option>
                                                <option value="Bahrain">Bahrain</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="Barbados">Barbados</option>
                                                <option value="Belarus">Belarus</option>
                                                <option value="Belgium">Belgium</option>
                                                <option value="Belize">Belize</option>
                                                <option value="Benin">Benin</option>
                                                <option value="Bermuda">Bermuda</option>
                                                <option value="Bhutan">Bhutan</option>
                                                <option value="Bolivia">Bolivia</option>
                                                <option value="Bonaire">Bonaire</option>
                                                <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                                <option value="Botswana">Botswana</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                                <option value="Brunei">Brunei</option>
                                                <option value="Bulgaria">Bulgaria</option>
                                                <option value="Burkina Faso">Burkina Faso</option>
                                                <option value="Burundi">Burundi</option>
                                                <option value="Cambodia">Cambodia</option>
                                                <option value="Cameroon">Cameroon</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Canary Islands">Canary Islands</option>
                                                <option value="Cape Verde">Cape Verde</option>
                                                <option value="Cayman Islands">Cayman Islands</option>
                                                <option value="Central African Republic">Central African Republic</option>
                                                <option value="Chad">Chad</option>
                                                <option value="Channel Islands">Channel Islands</option>
                                                <option value="Chile">Chile</option>
                                                <option value="China">China</option>
                                                <option value="Christmas Island">Christmas Island</option>
                                                <option value="Cocos Island">Cocos Island</option>
                                                <option value="Colombia">Colombia</option>
                                                <option value="Comoros">Comoros</option>
                                                <option value="Congo">Congo</option>
                                                <option value="Cook Islands">Cook Islands</option>
                                                <option value="Costa Rica">Costa Rica</option>
                                                <option value="Cote DIvoire">Cote DIvoire</option>
                                                <option value="Croatia">Croatia</option>
                                                <option value="Cuba">Cuba</option>
                                                <option value="Curaco">Curacao</option>
                                                <option value="Cyprus">Cyprus</option>
                                                <option value="Czech Republic">Czech Republic</option>
                                                <option value="Denmark">Denmark</option>
                                                <option value="Djibouti">Djibouti</option>
                                                <option value="Dominica">Dominica</option>
                                                <option value="Dominican Republic">Dominican Republic</option>
                                                <option value="East Timor">East Timor</option>
                                                <option value="Ecuador">Ecuador</option>
                                                <option value="Egypt">Egypt</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                <option value="Eritrea">Eritrea</option>
                                                <option value="Estonia">Estonia</option>
                                                <option value="Ethiopia">Ethiopia</option>
                                                <option value="Falkland Islands">Falkland Islands</option>
                                                <option value="Faroe Islands">Faroe Islands</option>
                                                <option value="Fiji">Fiji</option>
                                                <option value="Finland">Finland</option>
                                                <option value="France">France</option>
                                                <option value="French Guiana">French Guiana</option>
                                                <option value="French Polynesia">French Polynesia</option>
                                                <option value="French Southern Ter">French Southern Ter</option>
                                                <option value="Gabon">Gabon</option>
                                                <option value="Gambia">Gambia</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="Ghana">Ghana</option>
                                                <option value="Gibraltar">Gibraltar</option>
                                                <option value="Great Britain">Great Britain</option>
                                                <option value="Greece">Greece</option>
                                                <option value="Greenland">Greenland</option>
                                                <option value="Grenada">Grenada</option>
                                                <option value="Guadeloupe">Guadeloupe</option>
                                                <option value="Guam">Guam</option>
                                                <option value="Guatemala">Guatemala</option>
                                                <option value="Guinea">Guinea</option>
                                                <option value="Guyana">Guyana</option>
                                                <option value="Haiti">Haiti</option>
                                                <option value="Hawaii">Hawaii</option>
                                                <option value="Honduras">Honduras</option>
                                                <option value="Hong Kong">Hong Kong</option>
                                                <option value="Hungary">Hungary</option>
                                                <option value="Iceland">Iceland</option>
                                                <option value="Indonesia">Indonesia</option> */}
                        <option value="India">India</option>
                        {/* <option value="Iran">Iran</option>
                                                <option value="Iraq">Iraq</option>
                                                <option value="Ireland">Ireland</option>
                                                <option value="Isle of Man">Isle of Man</option>
                                                <option value="Israel">Israel</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Jamaica">Jamaica</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Jordan">Jordan</option>
                                                <option value="Kazakhstan">Kazakhstan</option>
                                                <option value="Kenya">Kenya</option>
                                                <option value="Kiribati">Kiribati</option>
                                                <option value="Korea North">Korea North</option>
                                                <option value="Korea Sout">Korea South</option>
                                                <option value="Kuwait">Kuwait</option>
                                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                <option value="Laos">Laos</option>
                                                <option value="Latvia">Latvia</option>
                                                <option value="Lebanon">Lebanon</option>
                                                <option value="Lesotho">Lesotho</option>
                                                <option value="Liberia">Liberia</option>
                                                <option value="Libya">Libya</option>
                                                <option value="Liechtenstein">Liechtenstein</option>
                                                <option value="Lithuania">Lithuania</option>
                                                <option value="Luxembourg">Luxembourg</option>
                                                <option value="Macau">Macau</option>
                                                <option value="Macedonia">Macedonia</option>
                                                <option value="Madagascar">Madagascar</option>
                                                <option value="Malaysia">Malaysia</option>
                                                <option value="Malawi">Malawi</option>
                                                <option value="Maldives">Maldives</option>
                                                <option value="Mali">Mali</option>
                                                <option value="Malta">Malta</option>
                                                <option value="Marshall Islands">Marshall Islands</option>
                                                <option value="Martinique">Martinique</option>
                                                <option value="Mauritania">Mauritania</option>
                                                <option value="Mauritius">Mauritius</option>
                                                <option value="Mayotte">Mayotte</option>
                                                <option value="Mexico">Mexico</option>
                                                <option value="Midway Islands">Midway Islands</option>
                                                <option value="Moldova">Moldova</option>
                                                <option value="Monaco">Monaco</option>
                                                <option value="Mongolia">Mongolia</option>
                                                <option value="Montserrat">Montserrat</option>
                                                <option value="Morocco">Morocco</option>
                                                <option value="Mozambique">Mozambique</option>
                                                <option value="Myanmar">Myanmar</option>
                                                <option value="Nambia">Nambia</option>
                                                <option value="Nauru">Nauru</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Netherland Antilles">Netherland Antilles</option>
                                                <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                                <option value="Nevis">Nevis</option>
                                                <option value="New Caledonia">New Caledonia</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Nicaragua">Nicaragua</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Niue">Niue</option>
                                                <option value="Norfolk Island">Norfolk Island</option>
                                                <option value="Norway">Norway</option>
                                                <option value="Oman">Oman</option>
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="Palau Island">Palau Island</option>
                                                <option value="Palestine">Palestine</option>
                                                <option value="Panama">Panama</option>
                                                <option value="Papua New Guinea">Papua New Guinea</option>
                                                <option value="Paraguay">Paraguay</option>
                                                <option value="Peru">Peru</option>
                                                <option value="Phillipines">Philippines</option>
                                                <option value="Pitcairn Island">Pitcairn Island</option>
                                                <option value="Poland">Poland</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Puerto Rico">Puerto Rico</option>
                                                <option value="Qatar">Qatar</option>
                                                <option value="Republic of Montenegro">Republic of Montenegro</option>
                                                <option value="Republic of Serbia">Republic of Serbia</option>
                                                <option value="Reunion">Reunion</option>
                                                <option value="Romania">Romania</option>
                                                <option value="Russia">Russia</option>
                                                <option value="Rwanda">Rwanda</option>
                                                <option value="St Barthelemy">St Barthelemy</option>
                                                <option value="St Eustatius">St Eustatius</option>
                                                <option value="St Helena">St Helena</option>
                                                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                                <option value="St Lucia">St Lucia</option>
                                                <option value="St Maarten">St Maarten</option>
                                                <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                                <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                                <option value="Saipan">Saipan</option>
                                                <option value="Samoa">Samoa</option>
                                                <option value="Samoa American">Samoa American</option>
                                                <option value="San Marino">San Marino</option>
                                                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                                <option value="Saudi Arabia">Saudi Arabia</option>
                                                <option value="Senegal">Senegal</option>
                                                <option value="Seychelles">Seychelles</option>
                                                <option value="Sierra Leone">Sierra Leone</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Slovakia">Slovakia</option>
                                                <option value="Slovenia">Slovenia</option>
                                                <option value="Solomon Islands">Solomon Islands</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="Spain">Spain</option>
                                                <option value="Sri Lanka">Sri Lanka</option>
                                                <option value="Sudan">Sudan</option>
                                                <option value="Suriname">Suriname</option>
                                                <option value="Swaziland">Swaziland</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Switzerland">Switzerland</option>
                                                <option value="Syria">Syria</option>
                                                <option value="Tahiti">Tahiti</option>
                                                <option value="Taiwan">Taiwan</option>
                                                <option value="Tajikistan">Tajikistan</option>
                                                <option value="Tanzania">Tanzania</option>
                                                <option value="Thailand">Thailand</option>
                                                <option value="Togo">Togo</option>
                                                <option value="Tokelau">Tokelau</option>
                                                <option value="Tonga">Tonga</option>
                                                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                                <option value="Tunisia">Tunisia</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="Turkmenistan">Turkmenistan</option>
                                                <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                                <option value="Tuvalu">Tuvalu</option>
                                                <option value="Uganda">Uganda</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Ukraine">Ukraine</option>
                                                <option value="United Arab Erimates">United Arab Emirates</option>
                                                <option value="United States of America">United States of America</option>
                                                <option value="Uraguay">Uruguay</option>
                                                <option value="Uzbekistan">Uzbekistan</option>
                                                <option value="Vanuatu">Vanuatu</option>
                                                <option value="Vatican City State">Vatican City State</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Vietnam">Vietnam</option>
                                                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                                <option value="Wake Island">Wake Island</option>
                                                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                                <option value="Yemen">Yemen</option>
                                                <option value="Zaire">Zaire</option>
                                                <option value="Zambia">Zambia</option>
                                                <option value="Zimbabwe">Zimbabwe</option> */}
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
                <div class="col-md-12">
                  <div class="single-form cancel-save-btn">
                    <button
                      type="button"
                      onClick={() => setstate(false)}
                      class="btn btn-cancel w-100"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-success w-100">
                      Update
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
export default EditInfoModal;
