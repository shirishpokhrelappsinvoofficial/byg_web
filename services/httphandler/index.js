import { toast } from "react-toastify";
import { authHeader } from "../helper";
import { getCookie } from "@utils";
export const URI = "https://bookyourgift.in";
export const baseURI = "https://bookyourgift.in/bookyourgift-api/api/customer/";
// export const baseURI = "http://18.213.29.142/bookyourgift-api/api/customer/";
export const deviceId =
  typeof window !== "undefined"
    ? window.navigator.userAgent.replace(/\D+/g, "")
    : "";

// Example POST method implementation:
export async function postOrderData(url = "", data = {}) {
  // Default options are marked with *

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic rzp_test_wOXmi7Mv8xBE0UECdeysOvNIBhtxsN2IbDnTJc",
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Host: "api.razorpay.com",
      Device_id: getCookie("Device_id"),
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.text(); // parses JSON response into native JavaScript objects
}

// Example POST method implementation:
export async function postEncodedData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(baseURI + url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}

export async function postFormData(url = "", data = {}) {
  // Default options are marked with *xx

  try {
    const response = await fetch(baseURI + url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Device_id: getCookie("Device_id"),
      },
      body: data,
    });
    return response.json();
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}

export async function postFormDataWithToken(url = "", data = {}) {
  // Default options are marked with *xx
  // const Token = localStorage.getItem('bookyourgift-admin'));

  try {
    const response = await fetch(baseURI + url, {
      method: "POST",
      body: data,
      headers: authHeader(),
    });
    return response.json();
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}

export async function postRawData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(baseURI + url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}

export async function getData(url = "", params = {}) {
  // Default options are marked with *
  try {
    let uri = new URL(baseURI + url);
    uri.search = new URLSearchParams(params).toString();
    const response = await fetch(uri, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: authHeader(),
      redirect: "follow",
      // referrerPolicy: "no-referrer",
      // body: JSON.stringify(params)
    });
    return response.json();
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}

export async function deleteData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(baseURI + url, {
      method: "DELETE",
      credentials: "same-origin",
      headers: authHeader(),
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}

export async function putFormData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const Token = JSON.parse(localStorage.getItem("bookyourgift-admin"));
    const response = await fetch(baseURI + url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${Token.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Device_id: getCookie("Device_id"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}

export const deleteUrlEncoded = async (url = "", data = {}) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("bookyourgift-token")}`
  );

  var urlencoded = new URLSearchParams();
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      urlencoded.append(key, element);
    }
  }
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
    Device_id: getCookie("Device_id"),
  };

  let response = await fetch(`${baseURI + url}`, requestOptions);
  return response.json();
};

export async function putEncodedData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const Token = localStorage.getItem("bookyourgift-token");
    const response = await fetch(baseURI + url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
        Device_id: getCookie("Device_id"),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (ex) {
    toast.error("*Check Network Connection and try again later..!!");
  }
}
