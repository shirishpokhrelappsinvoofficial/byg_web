import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deviceId, getData, postFormData } from "@/services/httphandler";
import { getHomapageData } from "@/redux/store/homepageSlice";

const initialState = {
  isLoading: false,
  filteredProductList: [],
  productList: [],
  productDetails: "",
  filters: {},
  page: 1,
  searchedProduct: [],
};

export const product = (state) => state.product.productList?.products?.data;
export const totalProduct = (state) =>
  state.product.productList?.products?.total;
export const filterProduct = (state) => state.product.filteredProductList;
export const productdetails = (state) => state.product.productDetails?.product;
export const filter = (state) => state.product.filters;
export const searchedProductList = (state) => state.product.searchedProduct;

export const getProduct = createAsyncThunk(
  "getProduct",
  async (
    object = { page: 1, limit: 10, device_id: deviceId },
    { dispatch }
  ) => {
    // dispatch(loading(true));
    let response = await getData("product", { ...object, device_id: deviceId });
    // if (response?.response_code === 200 && response?.success) {
    //   dispatch(loading(false));
    // }
    dispatch(saveFilters({ ...object, device_id: deviceId }));
    return response.data;
  }
);

export const fetchSearchedProduct = createAsyncThunk(
  "fetchSearchedProduct",
  async (object, { dispatch }) => {
    // dispatch(loading(true));
    let response = await getData("homeSearchedProducts", object);
    return response.data;
  }
);

export const viewProduct = createAsyncThunk(
  "product/viewed",
  async (object, { getState, dispatch }) => {
    let formdata = new FormData();
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        formdata.append(key, element);
      }
    }
    let response = await postFormData("productView", formdata);
    if (response && response.response_code === 200) {
      dispatch(getHomapageData());
    }
  }
);

export const getFilteredProduct = createAsyncThunk(
  "getFilteredProduct",
  async (object, { getState }) => {
    if (object)
      return getState().product.productList.products.data.filter(
        (data) =>
          data[Object.keys(object)[0]] === object[Object.keys(object)[0]]
      );
    else {
      return getState().product.productList.products.data;
    }
  }
);

export const productDetails = createAsyncThunk(
  "product/id",
  async (object, { dispatch }) => {
    const { id } = object;
    let response = await getData("productDetail", {
      id: id.replaceAll("-", " "),
      device_id: deviceId,
    });
    if (response && response.response_code === 200) {
      dispatch(
        viewProduct({
          product: response.data.product.id,
        })
      );
      return response.data;
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveFilters(state, action) {
      state.filters = action.payload;
    },
    clearList: (state, action) => {
      state.productList = action.payload;
    },
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
    // setPage: (state, action) => {
    //   state.page = action.payload;
    // },
    saveProductList: (state, action) => {
      state.productList = action.payload;
    },
    updateProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },

  extraReducers: {
    [getProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productList = action.payload;
    },
    [getFilteredProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.filteredProductList = action.payload;
    },
    [productDetails.fulfilled]: (state, action) => {
      state.productDetails = action.payload;
      state.isLoading = false;
    },
    [fetchSearchedProduct.fulfilled]: (state, action) => {
      state.searchedProduct = action.payload;
      state.isLoading = false;
    },
  },
});
export const {
  saveFilters,
  clearList,
  loading,
  saveProductList,
  updateProductDetails,
} = ProductSlice.actions;
export default ProductSlice.reducer;
