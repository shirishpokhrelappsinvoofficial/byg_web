"use client";

function isNumberKey(evt) {
  var charCode = evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

const FormInputText = ({
  onChange,
  placeholder,
  value,
  name,
  disabled,
  onBlur,
  title,
  type,
  typeOf,
}) => {
  const handleNumericValidation = (e) => {
    if (type === "text" && typeOf === "number") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      e.target.value = e.target.value.replace(/(\..*)\./g, "$1");
    }

    onChange(e);
  };
  return (
    <div class="single-form form-default">
      <label>{title || "Email Address"}</label>
      <div class="form-input">
        <input
          style={{ fontSize: "13px" }}
          onChange={(e) => {
            handleNumericValidation(e);
          }}
          onKeyDown={(e) => {}}
          type={type || "email"}
          value={value}
          // pattern={typeOf === "number" ? "[0-9]" : ""}
          disabled={disabled}
          onBlur={onBlur}
          name={name}
          class="form-control"
          placeholder={placeholder || "Email Address"}
        />
      </div>
    </div>
  );
};

export default FormInputText;
