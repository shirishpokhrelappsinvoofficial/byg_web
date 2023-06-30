import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteUrlEncoded,
  deviceId,
  getData,
  postFormDataWithToken,
  putEncodedData,
} from "@/services/httphandler";
import { getProduct } from "@/redux/store/prouductSlice";
import { getHomapageData } from "@/redux/store/homepageSlice";

const initialState = {
  isLoading: false,
  cartList: [],
  wishList: [],
  coupon: "",
  cartDetails: {
    couponDiscount: 0,
    cod_price: 0,
  },
};

export const cart = (state) => state.cart.cartList;
export const couponApplied = (state) => state.cart.coupon;
export const wishlist = (state) => state.cart.wishList;
export const cartDetails = (state) => state.cart.cartDetails;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (object, { getState, dispatch }) => {
    let filters = getState().product.filters;
    let formdata = new FormData();
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        formdata.append(key, element);
      }
    }
    let response = await postFormDataWithToken("cart/add", formdata);

    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(getCartList());
      dispatch(getWishlist());
      dispatch(getProduct(filters));
      dispatch(getHomapageData({ load: "dontLoad" }));
    } else {
      toast.error(response.message);
    }

    return response;
  }
);

export const addToWishlist = createAsyncThunk(
  "product/addToWishlist",
  async (object, { getState, dispatch }) => {
    let filters = getState().product.filters;
    let formdata = new FormData();
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        formdata.append(key, element);
      }
    }
    let response = await postFormDataWithToken("productWishlist", formdata);

    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(getWishlist());
      dispatch(getProduct(filters));
      dispatch(getHomapageData());
    } else {
      toast.error(response.message);
    }

    return response;
  }
);

export const getCartList = createAsyncThunk("cart/getList", async (obj) => {
  try {
    console.log(obj, "Object being sent");
    let response = await getData(
      "cart/get",
      obj ? obj : { device_id: deviceId }
    );
    console.log(response, "Resposne");
    return response.data;
  } catch (error) {
    console.log(error, "Error");
  }
});

export const getWishlist = createAsyncThunk("product/getWishlist", async () => {
  let response = await getData("getWishlist", {
    device_id: deviceId,
  });

  return response.data;
});

export const moveToCart = createAsyncThunk(
  "product/moveToCart",
  async (object, { getState, dispatch }) => {
    let filters = getState().product.filters;
    let formdata = new FormData();
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        formdata.append(key, element);
      }
    }
    let response = await postFormDataWithToken("moveToCart", formdata);

    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(getWishlist());
      dispatch(getCartList());
      dispatch(getProduct(filters));
      dispatch(getHomapageData());
    } else {
      toast.error(response.message);
    }

    return response;
  }
);

export const moveOneToCart = createAsyncThunk(
  "product/moveToCart",
  async (object, { getState, dispatch }) => {
    let filters = getState().product.filters;
    let formdata = new FormData();
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        formdata.append(key, element);
      }
    }
    let response = await postFormDataWithToken("moveOneToCart", formdata);

    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(getWishlist());
      dispatch(getCartList());
      dispatch(getProduct(filters));
      dispatch(getHomapageData());
    } else {
      toast.error(response.message);
    }

    return response;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (object, { getState, dispatch }) => {
    let filters = getState().product.filters;
    let response = await deleteUrlEncoded("cart/delete", object);
    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(getCartList());
      dispatch(getProduct(filters));
      dispatch(getHomapageData());
    }
    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async (object, { getState, dispatch }) => {
    let filters = getState().product.filters;
    let response = await putEncodedData("cart/update", object);
    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(getCartList());
      dispatch(getProduct(filters));
      dispatch(getHomapageData());
    }
    return response.data;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateWishList: (state, action) => {
      state.wishList = action.payload;
    },
    updateCartDetails: (state, action) => {
      state.cartDetails.couponDiscount = action.payload.coupon_discount;
      state.cartDetails.total_payable_amount = action.payload.payable_amount;
    },
    updateHeaderForCart: (state, action) => {
      state.cartList = action.payload.cart?.cart;
      // state.cartDetails = action.payload.cartDetails;
      state.cartDetails.couponDiscount = action.payload?.cart?.coupon_discount;
      state.cartDetails.sub_total_price = action.payload.cart?.sub_total_price;
      state.cartDetails.total_discount = action.payload.cart?.total_discount;
      state.cartDetails.cod_price = action.payload.cart?.cod_price;
      state.cartDetails.shipping_price = action.payload.cart?.shipping_price;
      state.cartDetails.shipping_label = action.payload.cart?.shipping_label;
      state.cartDetails.cod_label = action.payload.cart?.cod_label;
      state.cartDetails.total_payable_amount =
        action.payload.cart?.total_payable_amount;
      state.coupon = action.payload?.cart?.coupon;
    },
  },
  extraReducers: {
    [getCartList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartList = action.payload?.carts;
      state.coupon = action.payload?.coupon;
      state.cartDetails.couponDiscount = action.payload?.coupon_discount;
      state.cartDetails.sub_total_price = action.payload.sub_total_price;
      state.cartDetails.total_discount = action.payload.total_discount;
      state.cartDetails.cod_price = action.payload.cod_price;
      state.cartDetails.total_payable_amount =
        action.payload.total_payable_amount;
    },
    [getWishlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.wishList = action.payload?.wishlists;
    },
  },
});

export const { updateCartDetails, updateHeaderForCart, updateWishList } =
  CartSlice.actions;

export default CartSlice.reducer;
