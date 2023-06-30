"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddAddressModal from "@/components/addAddressModal";
import {
  cart,
  cartDetails,
  couponApplied,
  deleteCart,
  getCartList,
  updateCart,
} from "@/redux/store/cartSlice";
import { addressList, AddressList } from "@/redux/store/addressSlice";
import { deviceId, postFormDataWithToken } from "@/services/httphandler";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import AddIcon from "/public/assets/img/plus.png";
import MinusIcon from "/public/assets/img/minus.png";
import DelIcon from "/public/assets/img/delete.png";
import EditIcon from "/public/assets/img/edit.png";
import Image from "next/image";
import rs_green from "../../public/assets/img/rs_green.png";
import rs_black from "../../public/assets/img/rs_black.png";
import rs_red from "../../public/assets/img/rs_red.png";
import withAuth from "@/utils/hooks/withAuth.js";
const Address = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    dispatch(AddressList());
  }, [dispatch]);

  const [state, setstate] = useState();
  const arr = useSelector(addressList);
  const cartdetails = useSelector(cartDetails);
  console.log(cartdetails, "Cart details");
  const coupon = useSelector(couponApplied);

  const cartlist = useSelector(cart);
  const [isCod, setIsCod] = useState(0);
  const [couponName, setCouponName] = useState("");

  const handleCouponChange = (e) => {
    setCouponName(e.target.value);
  };
  const handleChange = (id) => {
    setstate(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state || (arr && arr.length)) {
      let addressId = state ? state : arr && arr[0].id;

      let formdata = new FormData();

      formdata.append("address_id", addressId);
      formdata.append("cod", isCod);
      formdata.append(
        "amount",
        cartdetails && parseFloat(cartdetails.total_payable_amount).toFixed(2)
      );

      let responseData = await postFormDataWithToken("order/add", formdata);

      if (responseData && responseData?.response_code === 200) {
        toast.success(responseData.message);
        if (isCod === 0) {
          window.open(responseData?.data?.payment_link, "_self");
        } else if (isCod === 1) {
          history.push(
            `/completed-orders/${responseData?.data?.payment_link?.order_id}?cod=true`
          );
        }
        getCart();
      } else {
        toast.error(responseData.message);
      }
    } else {
      toast.error("*Please Select an adress.");
    }
  };

  const getCart = useCallback(() => {
    dispatch(
      getCartList({
        cod: isCod,
        device_id: deviceId,
      })
    );
  }, [dispatch, isCod]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleQuantity = (id, quantity, type, cartId) => {
    if (type === "add") {
      quantity += 1;
      dispatch(
        updateCart({
          product: id,
          quantity,
        })
      ).then(() => {
        getCart();
      });
    } else {
      if (quantity <= 1) {
        handleDeleteFromCart(cartId);
      } else {
        quantity -= 1;
        dispatch(
          updateCart({
            product: id,
            quantity,
          })
        ).then(() => {
          getCart();
        });
      }
    }
  };

  const handleDeleteFromCart = (id) => {
    dispatch(deleteCart({ id })).then(() => {
      getCart();
    });
  };
  const handleRemoveCoupon = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("code", coupon);

    let response = await postFormDataWithToken("removeCoupon", formdata);
    if (response && response.response_code === 200) {
      toast.success(response.message);
      getCart();
    } else {
      toast.error(response.message);
    }
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("code", couponName ? couponName : coupon ? coupon : "");
    formdata.append("device_id", deviceId);
    formdata.append("cod", isCod);
    let response = await postFormDataWithToken("verifyCoupon", formdata);
    if (response && response.response_code === 200) {
      toast.success(response.message);

      getCart();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <section class="checkout-wrapper pt-50">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div className="shipping-methods ">
              <h4 className="fw-bold">Products</h4>
              <div>
                <div class="checkout-table table-responsive">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>

                        <th className="mx-2">Price</th>
                        <th>Action</th>
                      </tr>

                      {cartlist && cartlist?.length > 0 ? (
                        cartlist?.map((data) => {
                          return (
                            <tr>
                              <td class="checkout-product">
                                <div class="product-cart">
                                  <div class="product-thumb">
                                    <img
                                      src={
                                        data.product?.images?.[0].name ||
                                        "assets/img/chocolates-333.png"
                                      }
                                      alt="Product"
                                    />
                                  </div>
                                </div>
                              </td>
                              <td class="checkout-product">
                                <div class="product-cart">
                                  <div class="product-content media-body">
                                    <h5 class="title">
                                      <Link
                                        href={`/product-details/${
                                          data?.id
                                        }/${data.product.name
                                          .toLowerCase()
                                          .replaceAll(/\s/g, "-")}`}
                                      >
                                        {data.product.name}
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td class="checkout-quantity">
                                <div className="product-quantity d-inline-flex">
                                  <button
                                    type="button"
                                    id="sub"
                                    onClick={() =>
                                      handleQuantity(
                                        data.product.id,
                                        data.quantity,
                                        "substract",
                                        data?.id
                                      )
                                    }
                                    className="sub"
                                  >
                                    <Image
                                      src={MinusIcon}
                                      alt="plusicon"
                                      width={20}
                                      height={20}
                                    />
                                  </button>
                                  <input type="text" value={data.quantity} />
                                  <button
                                    type="button"
                                    id="add"
                                    className="add"
                                    onClick={() =>
                                      handleQuantity(
                                        data.product.id,
                                        data.quantity,
                                        "add"
                                      )
                                    }
                                  >
                                    <Image
                                      src={AddIcon}
                                      alt="plusicon"
                                      width={20}
                                      height={20}
                                    />
                                  </button>
                                </div>
                              </td>

                              <td class="checkout-price mx-2">
                                <p class="price">
                                  <Image
                                    src={rs_black}
                                    alt="price"
                                    height={10}
                                    width={10}
                                  />{" "}
                                  {data?.product?.discount_price?.toFixed(2)}
                                </p>
                              </td>
                              <td>
                                <Link
                                  href={pathname}
                                  onClick={() => handleDeleteFromCart(data.id)}
                                  className="delete"
                                >
                                  <Image
                                    src={DelIcon}
                                    alt="plusicon"
                                    width={25}
                                    height={25}
                                  />
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5}>No Product Added.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div class="checkout-coupon">
                  <div class="Apply-Coupons">
                    <span>
                      <img
                        src="assets/img/gift-voucher.png"
                        alt=""
                        class="img-fluid"
                      />{" "}
                      Apply Coupons
                    </span>
                    <button
                      class="main-btn primary-btn-1"
                      data-toggle="modal"
                      data-target="#ApplyCoupons"
                    >
                      Coupons
                    </button>
                  </div>

                  <span>Apply Coupon to get discount!</span>
                  <form class="has-validation-callback">
                    <div class="single-form form-default d-flex">
                      <div class="form-input form">
                        <input
                          type="text"
                          placeholder="Coupon Code"
                          onChange={handleCouponChange}
                        />
                      </div>

                      <button
                        onClick={handleCoupon}
                        class="main-btn primary-btn"
                      >
                        Apply
                      </button>
                    </div>
                  </form>

                  {coupon && (
                    <div>
                      <h5 className="mt-4">Applied Coupon</h5>
                      <div
                        style={{
                          maxWidth: "336px",
                          color: "green",
                          fontWeight: "bold",
                        }}
                        className="d-flex justify-content-between"
                      >
                        {coupon}

                        <Image
                          src={DelIcon}
                          alt="plusicon"
                          width={20}
                          height={20}
                          onClick={handleRemoveCoupon}
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="checkout-steps-form-style-1 mt-20 mb-20">
              <ul id="checkout-steps">
                <li class="vjopt_activeli">
                  <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <AddAddressModal />
                    </div>
                  </div>
                  <h6 class="title">Select Address </h6>
                  <form
                    class="checkout-steps-form-content single-radio"
                    id="addressBox"
                  >
                    <div class="row">
                      {arr && arr.length > 0 ? (
                        arr.map((data) => {
                          return (
                            <div class="col-sm-12 col-md-6 col-lg-6 mt-4">
                              <div class="address-box">
                                <input
                                  type="radio"
                                  defaultChecked={
                                    data.id === arr[0].id ? true : false
                                  }
                                  id={`Address1-${data.id}`}
                                  onChange={() => handleChange(data.id)}
                                  class="radio-input"
                                  name="Address"
                                />
                                <label
                                  htmlFor={`Address1-${data.id}`}
                                  class="radio-label address-b"
                                >
                                  <p>
                                    <span>
                                      {data.first_name + " " + data.last_name}
                                    </span>
                                    <span>{data.resident_type}</span>
                                  </p>
                                  <hr />
                                  <p>{data.address}</p>
                                  <p>Mobile : {data.mobile_number}</p>
                                  <p class="btn-remove-edit justify-content-end">
                                    <Link href="/users/my-address-book">
                                      <Image
                                        src={EditIcon}
                                        alt="plusicon"
                                        width={10}
                                        height={10}
                                        className="mx-1"
                                      />
                                      Edit Address
                                    </Link>
                                  </p>
                                </label>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-md-12">No Address Found</div>
                      )}
                    </div>
                  </form>
                </li>
              </ul>
            </div>

            <div className="paymentMode">
              <label className="fw-bold">Shipping Method</label>
              <div className="paymentCheckbox mt-3">
                <label
                  htmlFor="onlinePayment"
                  className={isCod === 0 ? "paymentLabelBG" : ""}
                >
                  <input
                    id="onlinePayment"
                    type="radio"
                    name="paymentMode"
                    value={isCod}
                    checked={isCod === 0}
                    className="mx-2"
                    onChange={() => {
                      setIsCod(0);
                    }}
                  />
                  <div className="radioOfMode">
                    {" "}
                    {cartdetails?.shipping_label}
                    {cartdetails?.shipping_price
                      ? ` (Rs.${cartdetails?.shipping_price})`
                      : ""}
                  </div>
                </label>
                <label
                  htmlFor="cod"
                  className={isCod === 1 ? "paymentLabelBG" : ""}
                >
                  <input
                    id="cod"
                    type="radio"
                    className="mx-2"
                    name="paymentMode"
                    value={isCod}
                    checked={isCod === 1}
                    onChange={() => {
                      setIsCod(1);
                    }}
                  />
                  <div className="radioOfMode">
                    {cartdetails?.cod_label}
                    {cartdetails?.cod_price
                      ? `( Rs.${cartdetails?.cod_price})`
                      : ""}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="checkout-sidebar  mb-20">
              <div class="checkout-sidebar-price-table shadow">
                <h5 class="title">
                  Price Details ({cartlist && cartlist.length} items)
                </h5>
                <div class="sub-total-price">
                  <div class="total-price">
                    <p class="value">Subtotal Price:</p>
                    <p class="price">
                      <Image
                        src={rs_black}
                        alt="price"
                        height={10}
                        width={10}
                      />{" "}
                      {cartdetails && cartdetails.sub_total_price?.toFixed(2)}
                    </p>
                  </div>
                  <div class="total-price shipping">
                    <p class="value">
                      {isCod === 1
                        ? "COD Charges (+) :"
                        : isCod === 0
                        ? "Shipping Charges (+) :"
                        : ""}{" "}
                    </p>
                    <p class="price">
                      <Image src={rs_red} alt="price" height={10} width={10} />{" "}
                      {isCod === 1
                        ? cartdetails?.cod_price?.toFixed(2)
                        : isCod === 0
                        ? cartdetails?.shipping_price?.toFixed(2)
                        : "0"}
                    </p>
                  </div>
                  {cartdetails && cartdetails.couponDiscount ? (
                    <div class="total-price discount">
                      <p class="value">Coupon Discount (-):</p>
                      <p class="price">
                        <Image
                          src={rs_green}
                          alt="price"
                          height={10}
                          width={10}
                        />{" "}
                        {cartdetails && cartdetails.couponDiscount?.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="total-price discount">
                    <p class="value">Discount (-):</p>
                    <p class="price">
                      <Image
                        src={rs_green}
                        alt="price"
                        height={10}
                        width={10}
                      />{" "}
                      {cartdetails && cartdetails.total_discount?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div class="total-payable">
                  <div class="payable-price">
                    <p class="value">Total Payable:</p>
                    <p class="price">
                      <Image
                        src={rs_black}
                        alt="price"
                        height={10}
                        width={10}
                      />{" "}
                      {cartdetails &&
                        cartdetails.total_payable_amount?.toFixed(2)}
                    </p>
                  </div>
                </div>
                {cartlist?.length > 0 && (
                  <div class="single-btn text-center">
                    <button
                      // href="#"
                      type="button"
                      disabled={cartlist?.length === 0}
                      onClick={handleSubmit}
                      class="main-btn primary-btn"
                    >
                      continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Address);
