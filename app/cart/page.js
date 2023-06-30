"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { user } from "@/components/loginmodal/userSlice";
import { deviceId, postFormDataWithToken } from "@/services/httphandler";
import {
  cart,
  cartDetails,
  couponApplied,
  deleteCart,
  getCartList,
  updateCart,
} from "@/redux/store/cartSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import AddIcon from "/public/assets/img/plus.png";
import MinusIcon from "/public/assets/img/minus.png";
import DelIcon from "/public/assets/img/delete.png";

import Image from "next/image";
import rs_green from "../../public/assets/img/rs_green.png";
import rs_black from "../../public/assets/img/rs_black.png";

import withAuth from "@/utils/hooks/withAuth.js";

const Cart = () => {
  const history = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const cartList = useSelector(cart);
  const userDetails = useSelector(user);
  const coupon = useSelector(couponApplied);
  const cartdetails = useSelector(cartDetails);
  console.log("cartdetails: ", cartdetails);
  const [state, setstate] = useState("");

  const handleDeleteFromCart = (id) => {
    dispatch(deleteCart({ id }));
  };

  useEffect(() => {
    dispatch(getCartList());
  }, [dispatch]);

  const handleQuantity = (id, quantity, type) => {
    if (type === "add") {
      quantity += 1;
      dispatch(
        updateCart({
          product: id,
          quantity,
        })
      );
    } else {
      if (quantity <= 1) {
        toast.error("Quantity Must be greater than 0.");
      } else {
        quantity -= 1;
        dispatch(
          updateCart({
            product: id,
            quantity,
          })
        );
      }
    }
  };

  const handleRemoveCoupon = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("code", coupon);

    let response = await postFormDataWithToken("removeCoupon", formdata);
    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(getCartList());
    } else {
      toast.error(response.message);
    }
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("code", state);
    formdata.append("device_id", deviceId);
    let response = await postFormDataWithToken("verifyCoupon", formdata);
    if (response && response.response_code === 200) {
      toast.success(response.message);

      dispatch(getCartList());
    } else {
      toast.error(response.message);
    }
  };

  const handleChange = (e) => {
    setstate(e.target.value);
  };

  if (cartList?.length === 0) {
    history.replace("/");
  }

  return (
    <section class="checkout-wrapper pt-50">
      <div class="container">
        <div class="row">
          {userDetails && userDetails.can_share === 1 && (
            <div className="col-lg-12 text-right">
              <CopyToClipboard
                text={`http://3.132.76.65/bookyourgift-api/customer/cart/sharedProduct?product_ids=${cartList?.map(
                  (data) => data.product.id
                )}`}
                onCopy={() => toast.success("Copied to clipboard")}
              >
                <button className="cart-link" style={{ border: "none" }}>
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa fa-solid fa-copy mr-2"
                  ></i>
                  Copy Cart Link
                </button>
              </CopyToClipboard>
            </div>
          )}

          <div class="col-lg-12">
            <div class="checkout-style-1 ">
              <div class="checkout-table table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Size</th>
                      <th>Color</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>

                    {cartList && cartList?.length > 0 ? (
                      cartList?.map((data) => {
                        return (
                          <tr>
                            <td class="checkout-product">
                              <div class="product-cart">
                                <div class="product-thumb">
                                  <img
                                    src={
                                      data.product.images[0].name ||
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
                                      "substract"
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
                            <td>{data.product_size?.size || "Default"}</td>
                            <td>
                              {data.product_colour?.colour_code ? (
                                <span
                                  className="colors"
                                  style={{
                                    background: data.product_colour.colour_code,
                                  }}
                                ></span>
                              ) : (
                                "Default"
                              )}
                            </td>
                            <td class="checkout-price">
                              <p class="price">
                                <Image
                                  src={rs_black}
                                  alt="price"
                                  height={10}
                                  width={10}
                                />
                                {data.product.discount_price?.toFixed(2)}
                              </p>
                            </td>
                            <td>
                              <Link
                                href={pathname}
                                onClick={() => handleDeleteFromCart(data.id)}
                                className="delete"
                              >
                                {/* <i className="fa fa-trash"></i> */}
                                <Image
                                  src={DelIcon}
                                  alt="delicon"
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
                        <td colSpan={5}>No Data Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div class="checkout-coupon-total checkout-coupon-total-2 d-lg-flex justify-content-between">
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
                          onChange={handleChange}
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
                          alt="delicon"
                          width={25}
                          height={25}
                          onClick={handleRemoveCoupon}
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div class="checkout-total">
                  <div class="single-total">
                    <p class="value">Subtotal Price:</p>
                    <p class="price">
                      <Image
                        src={rs_black}
                        alt="price"
                        height={10}
                        width={10}
                      />
                      {cartdetails && cartdetails.sub_total_price}
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
                  {cartdetails && cartdetails.couponDiscount ? (
                    <div class="single-total">
                      <p class="value">Coupon Discount (-):</p>
                      <p class="price">
                        <Image
                          src={rs_black}
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
                  <div class="single-total">
                    <p class="value">Discount (-):</p>
                    <p class="price">
                      <Image
                        src={rs_black}
                        alt="price"
                        height={10}
                        width={10}
                      />{" "}
                      {cartdetails && cartdetails.total_discount?.toFixed(2)}
                    </p>
                  </div>
                  <div class="single-total total-payable">
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
              </div>
              <div class="checkout-btn d-sm-flex justify-content-between">
                <div class="single-btn">
                  <Link href="/" class="main-btn primary-btn-border">
                    continue shopping
                  </Link>
                </div>
                {cartList?.length > 0 && (
                  <div class="single-btn">
                    <button
                      disabled={cartList?.length === 0}
                      class="main-btn primary-btn"
                      onClick={() => {
                        history.push("/address");
                      }}
                    >
                      continue to checkout
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

export default withAuth(Cart);
