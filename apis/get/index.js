// "use server";
import { cache } from "react";
import { getData } from "../index";
import { setViewedProduct } from "@apis/post";

export const getHomapageData = cache(async (obj, token = "", cookie = "") => {
  try {
    const response = await getData("home", obj, token, cookie);
    return response?.data;
  } catch (error) {}
});
export const getCategory = cache(async (obj, token = "", cookie = "") => {
  try {
    const response = await getData("home", obj, token, cookie);

    return response?.data?.categories;
  } catch (error) {}
});
export const getOccassion = cache(async (obj, token = "", cookie = "") => {
  try {
    const response = await getData("home", obj, token, cookie);
    return response?.data?.occasions;
  } catch (error) {}
});
export const getBanner = cache(async (obj, token = "", cookie = "") => {
  try {
    const response = await getData("home", obj, token, cookie);
    return response?.data?.banner;
  } catch (error) {}
});
export const getCoupons = cache(async (obj, token = "", cookie = "") => {
  try {
    const response = await getData("home", obj, token, cookie);
    return response?.data?.coupons;
  } catch (error) {}
});
export const getRelations = cache(async (obj, token = "", cookie = "") => {
  try {
    const response = await getData("home", obj, token, cookie);
    return response?.data?.relations;
  } catch (error) {}
});
export const getRecentViews = cache(async (obj, token = "", cookie = "") => {
  try {
    const response = await getData("home", obj, token, cookie);
    return response?.data?.recent_viewes;
  } catch (error) {}
});
export const getProduct = cache(async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("product", obj, token, cookie);
    return response?.data?.products;
  } catch (error) {}
});
export const getHomeSearchedProducts = cache(
  async (obj, token = "", cookie = "") => {
    try {
      let response = await getData(
        "homeSearchedProducts",
        obj,

        token,
        cookie
      );
      return response?.data;
    } catch (error) {}
  }
);
export const getCartList = async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("cart/get", obj, token, cookie);
    return response?.data;
  } catch (error) {}
};
export const getProductBySearch = async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("homeSearch", obj, token, cookie);
    return response?.data;
  } catch (error) {}
};
export const getCityList = async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("getCities", obj, token, cookie);
    // return response?.data?.cityList;
    return response?.data;
  } catch (error) {}
};

export const getContactUs = cache(async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("cms/getContactUs", obj, token, cookie);
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {}
});
export const getTnc = cache(async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("cms/getTnc", obj, token, cookie);
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {}
});
export const getPrivacy = cache(async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("cms/getPrivacy", obj, token, cookie);
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {}
});
export const getCancellationPolicy = cache(
  async (obj, token = "", cookie = "") => {
    try {
      let response = await getData(
        "cms/getCancellationPolicy",
        obj,
        token,
        cookie
      );
      // return response?.data?.contactus;
      return response?.data;
    } catch (error) {}
  }
);
export const getRefundPolicy = cache(async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("cms/getRefundPolicy", obj, token, cookie);
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {}
});
export const getContactNumber = cache(async (obj, token = "", cookie = "") => {
  try {
    let response = await getData("cms/getContactNumber", obj, token, cookie);
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {}
});

export const getWishlist = cache(async (obj, token, cookie) => {
  try {
    let response = await getData("getWishlist", obj, token, cookie);
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {}
});
export const getUser = async (obj, token = "", cookie = "") => {
  try {
    let response = await getData(
      "getProfile",
      obj,

      token,
      cookie
    );
    // return response?.data?.contactus;
    return response?.data;
  } catch (error) {}
};
export const getProductDetail = async (obj, token, cookie) => {
  try {
    let response = await getData("productDetail", obj, token, cookie);
    if (response?.data?.product?.id) {
      setViewedProduct(
        {
          product: response.data.product.id,
        },
        token,
        cookie
      );
    }

    return response?.data;
  } catch (error) {}
};
export const fetchWishlist = cache(async (obj, token, cookie) => {
  try {
    let response = await getData("getWishlist", obj, token, cookie);

    return response?.data;
  } catch (error) {}
});
