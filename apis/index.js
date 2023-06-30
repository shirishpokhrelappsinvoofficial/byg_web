import axios from "axios";
import { toast } from "react-toastify";
import { baseURI } from "@services/httphandler";
import { getCookie, getToken } from "@utils";

// POST METHOD

export const postFormData = async (url = "", data = {}, token, cookie) => {
  try {
    const tokenz = token
      ? token
      : await localStorage.getItem("bookyourgift_token");

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }
    const response = await axios.post(baseURI + url, formData, {
      headers: { authorization: tokenz ? tokenz : "", Device_id: cookie },
    });

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const postRawData = async (url = "", data = {}, token = "") => {
  try {
    const tokenz = token
      ? token
      : getToken()
      ? getToken()
      : getCookie("byg_tk")
      ? getCookie("byg_tk")
      : "";

    const response = await axios.post(baseURI + url, data, {
      headers: {
        authorization: tokenz ? tokenz : "",
      },
    });

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// GET METHOD

export const getData = async (url = "", data = {}, token = "", cookie) => {
  try {
    let tokenz = token ? token : "";
    const head = {
      authorization: tokenz,
      Device_id: cookie ? cookie : getCookie("Device_id"),
    };
    const response = await axios.get(baseURI + url, {
      params: data,
      headers: head,
    });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
