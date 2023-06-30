import { postFormData } from "@apis";
import { toast } from "react-toastify";

export const userCount = async (obj, token, cookie = "") => {
  try {
    let response = await postRawData("viewers");
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const setViewedProduct = async (obj, token, cookie = "") => {
  try {
    let response = await postFormData("productView", obj);

    return response?.data;
  } catch (error) {
    console.log(error?.message);
  }
};

export const addToCart = async (obj, token, cookie = "") => {
  try {
    let response = await postFormData("cart/add", obj);

    return response;
  } catch (error) {
    console.log(error.message);
  }
};
