import { useState } from "react";

const FormInputPassword = ({ onChange, placeholder, value, name }) => {
    const [state, setstate] = useState(false)
    return (
        <div class="form-group">
            <label>Password</label>
            <div class="input-container">
                <input
                    onChange={onChange}
                    type={state ? 'text' : "password"}
                    class="form-control pl-5"
                    placeholder={placeholder || "Password"}
                    value={value}
                    name={name}
                />

                <img
                    alt=""
                    src="assets/images/password.png"
                    class="input-img" />
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => setstate(!state)}
                    class="pass-view field-icon toggle-password"></span>
            </div>
        </div>
    )
}

export default FormInputPassword;