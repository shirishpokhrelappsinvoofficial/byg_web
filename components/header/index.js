"use client";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// Slices
import { loginModalHandler } from "@/redux/store/loginModalSlice";
import { clearList } from "@/redux/store/prouductSlice";
import { addUserData, user, userCount } from "@/redux/store/userSlice";
import {
  addToWishlist,
  cart,
  cartDetails,
  deleteCart,
  getCartList,
  updateCart,
  updateHeaderForCart,
  wishlist,
} from "@/redux/store/cartSlice";
import { toast } from "react-toastify";
import { getProductBySearch, searchProd } from "@/redux/store/homepageSlice";

// utlity functions

import useSticky from "@/services/helper/customHooks";
import { clientPhoneNumber } from "@/services/helper";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import CallIcon from "/public/assets/img/call.png";
import AddIcon from "/public/assets/img/plus.png";
import MinusIcon from "/public/assets/img/minus.png";
import logo from "/public/assets/img/logo.png";
import delIcon from "/public/assets/img/delete.png";
import searchIcon from "/public/assets/img/search.png";
import userIcon from "/public/assets/img/login.png";
import rs_black from "/public/assets/img/rs_black.png";
import rs_red from "/public/assets/img/rs_red.png";
import whatsappIcon from "/public/assets/img/whatsappIcon.png";
import HeaderCategoryItem from "./HeaderCategoryItem";
import LoadingServerData from "@components/loader/LoadingServerData";
import Cookies from "js-cookie";
import { getUser } from "@apis/get";

const Header = ({ data }) => {
  const dispatch = useDispatch();
  const history = useRouter();
  const pathname = usePathname();

  const wrapperRef = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [activeSidebar, setActivesidebar] = useState(false);
  const { sticky, stickyRef } = useSticky();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.profile.isLoggedIn);

  useEffect(() => {
    dispatch(userCount());
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setActivesidebar(false);
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const cartList = useSelector(cart) || data?.cartList;
  const categoryList = data?.categories || [];
  const cartdetails = useSelector(cartDetails) || data?.cartdetails;
  const searchProds = useSelector(searchProd) || data?.searchProducts;
  let b = useSelector(cartDetails);
  let a = useSelector(cart);
  let cookie = Cookies.get("Device_id");
  let token = Cookies.get("byg_tk");

  let userdetails = useCallback(async () => {
    let response = await getUser({}, token, cookie);
    return response;
  }, []);

  useEffect(() => {
    userdetails();
  }, [userdetails]);

  useEffect(() => {
    dispatch(getCartList({}));
  }, [dispatch]);

  useEffect(() => {
    if (a?.length === 0) {
      setTimeout(() => {
        dispatch(
          updateHeaderForCart({
            cart: data?.cartList,
            cartDetails: data?.cartdetails,
          })
        );
        dispatch(addUserData({ recent: data?.recent, user: userdetails() }));
      }, 100);
    }
  }, []);

  const handleDeleteFromCart = (id) => {
    dispatch(deleteCart({ id }));
  };
  const throttling = useRef(false);

  // const addToPlaylist = (id) => {
  //   dispatch(addToWishlist({ product: id })).then((data) => {
  //     if (data?.payload?.response_code === 200) {
  //       // dispatch(getProduct(filterProd))
  //       // onSuccess('success')
  //     }
  //   });
  // };
  const handleQuantity = (id, quantity, type, delId) => {
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
        handleDeleteFromCart(delId);
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

  const handleSearch = (e) => {
    if (throttling.current) {
      return;
    }
    setIsVisible(true);
    throttling.current = true;

    setTimeout(() => {
      throttling.current = false;
      setLoading(true);
      dispatch(
        getProductBySearch({
          search: e.target.value,
        })
      ).then((res) => {
        setLoading(false);
      });
    }, 1000);
  };

  const excludeStickyIn = [
    "/terms-conditions",
    "/refund-cancellation-policy",
    "/privacy-policy",
    "/about",
    "/shipping-and-delivery-policy",
    "/access",
  ];

  return (
    <div>
      <div className="call-icon">
        <a href={`tel:${clientPhoneNumber}`}>
          {/* <i className="fa fa-phone"></i> */}
          <Image src={CallIcon} alt="whatsapp" height={80} width={80} />
        </a>{" "}
        <a href={`https://wa.me/${clientPhoneNumber}`} className="whatsAppIcon">
          <Image src={whatsappIcon} height={80} width={80} alt="whatsapp" />
        </a>
      </div>
      <div
        className={
          "navigation " +
          (sticky && excludeStickyIn.findIndex((it) => it === pathname) === -1
            ? "sticky"
            : "")
        }
        ref={stickyRef}
      >
        <header className="navbar-style-7 position-relative">
          <div className="container-fluid">
            <div className="navbar-mobile">
              <div className="row align-items-center">
                <div className="col-2">
                  <div className="">
                    <Link href={"/"} prefetch={true}>
                      <img
                        src={"/assets/img/logo.png"}
                        alt=""
                        className="img-fluid"
                        style={{
                          maxWidth: "155%",
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-7">
                  <div
                    className="navbar-search search-style-5"
                    ref={wrapperRef}
                  >
                    <div className="search-input">
                      <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search for gift"
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            setIsVisible(false);
                            dispatch(clearList([]));
                            history.push(`/search/${e.target.value}`);
                          }
                        }}
                      />
                    </div>
                    <div className="search-btn">
                      <button>
                        <Image
                          src={searchIcon}
                          alt={"searchIcon"}
                          height={15}
                          width={15}
                        />
                      </button>
                    </div>
                    {isVisible &&
                      (searchProds && searchProds.length > 0 ? (
                        <div className="search-box">
                          {loading ? (
                            <div className="text-center">Loading...</div>
                          ) : (
                            <ul>
                              {searchProds?.map((data) => {
                                return (
                                  <li key={data.id} className="border-1 ">
                                    <Link
                                      prefetch={false}
                                      onClick={() => setIsVisible(false)}
                                      href={`/product-details/${
                                        data?.id
                                      }/${data.name
                                        .toLowerCase()
                                        .replaceAll(/\s/g, "-")
                                        .replaceAll("/", "-")}`}
                                      className="d-flex align-items-center gap-5"
                                    >
                                      <img
                                        src={
                                          data?.images?.length > 0 &&
                                          data?.images?.[0]?.name?.includes(
                                            "http"
                                          )
                                            ? `${data?.images?.[0]?.name}`
                                            : logo
                                        }
                                        alt={`${data?.name}`}
                                        className="searchImageOptions"
                                      />
                                      {data.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <div className="search-box p-2 text-center">
                          No Data Found
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-3 d-flex justify-content-end align-items-center gap-5">
                  {isLoggedIn && (
                    <div className="prud-mm profile-drop">
                      <span
                        className="profileLinks"
                        onClick={() => {
                          setActivesidebar(!activeSidebar);
                          history.push("/wishlist");
                        }}
                      >
                        <Image
                          alt=""
                          src="/assets/img/wishlist.png"
                          height={20}
                          width={20}
                        />{" "}
                        <span className="myProfileSmallMobile">WishList</span>
                      </span>
                    </div>
                  )}
                  <div
                    className="prud-mm navbar-cart profile-drop"
                    ref={profileRef}
                  >
                    <span
                      className="profileLinks"
                      onClick={() => {
                        setActivesidebar(!activeSidebar);
                      }}
                    >
                      <Image
                        alt=""
                        src="/assets/img/profile.png"
                        height={20}
                        width={20}
                      />{" "}
                      <span className="myProfileSmallMobile">profile</span>
                    </span>
                    <div
                      className={
                        activeSidebar
                          ? "navbar-cart-dropdown shadow showProfileDrop my-profile"
                          : "navbar-cart-dropdown shadow  my-profile"
                      }
                    >
                      <h6>Welcome</h6>
                      <p>To access account and manage orders</p>
                      {!isLoggedIn && (
                        <p>
                          <button
                            onClick={() => {
                              setActivesidebar(false);
                              dispatch(loginModalHandler());
                            }}
                            className="btn-login d-flex-center"
                            data-toggle="modal"
                            data-target="#loginsignup"
                          >
                            <Image
                              src={userIcon}
                              alt={"rs"}
                              height={15}
                              width={13}
                            />{" "}
                            Login
                          </button>
                        </p>
                      )}

                      {isLoggedIn && (
                        <>
                          <p>
                            <span
                              className="profileListLink"
                              onClick={() => {
                                setActivesidebar(false);
                                history.push("/users/info");
                              }}
                            >
                              My Profile
                            </span>
                          </p>
                          <p>
                            <span
                              className="profileListLink"
                              onClick={() => {
                                setActivesidebar(false);
                                history.push("/users/orders");
                              }}
                            >
                              My Orders
                            </span>
                          </p>
                          <p>
                            <span
                              className="profileListLink"
                              onClick={() => {
                                setActivesidebar(false);
                                history.push("/users/my-address-book");
                              }}
                            >
                              My Address Book
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="navbar-cart" ref={cartRef}>
                    <div className="cart-items homeNavBar position-relative cursor-pointer prud-mm">
                      <span
                        className="profileLinks"
                        onClick={() => {
                          setIsCartVisible(!isCartVisible);
                        }}
                      >
                        <Image
                          alt=""
                          src="/assets/img/cart.png"
                          height={20}
                          width={20}
                        />
                        <span className="myProfileSmallMobile">Cart</span>
                        {cartList?.length > 0 && (
                          <span className="notiCount">
                            {cartList && cartList?.length}
                          </span>
                        )}
                      </span>
                    </div>

                    <div
                      className={
                        isCartVisible
                          ? "navbar-cart-dropdown showProfileDrop shadow"
                          : "navbar-cart-dropdown  shadow"
                      }
                    >
                      <div className="checkout-style-2">
                        <div className="checkout-header text-center py-3">
                          <h6 className="title">Your Cart</h6>
                          {cartList?.length < 1 && <hr />}
                        </div>

                        <div
                          className={
                            cartList?.length > 0
                              ? "checkout-table cart-height"
                              : "checkout-table"
                          }
                        >
                          <table className="table">
                            <tbody>
                              {cartList && cartList?.length > 0 ? (
                                cartList?.map((data, i) => {
                                  return (
                                    <tr key={i}>
                                      <td className="checkout-product">
                                        <div className="product-cart">
                                          <div className="product-thumb">
                                            <img
                                              src={
                                                data?.product?.images?.[0]?.name?.includes(
                                                  "http"
                                                )
                                                  ? data?.product?.images?.[0]
                                                      ?.name
                                                  : "assets/img/chocolates-333.png"
                                              }
                                              alt="Product"
                                            />
                                          </div>
                                          <div className="product-content media-body">
                                            <h5 className="title">
                                              <Link
                                                prefetch={false}
                                                href={`/product-details/${
                                                  data?.id
                                                }/${data?.product?.name
                                                  .toLowerCase()
                                                  .replaceAll(/\s/g, "-")}`}
                                              >
                                                {data?.product?.name}
                                              </Link>
                                            </h5>
                                            <p className="price">
                                              <Image
                                                src={rs_black}
                                                alt={"rs"}
                                                height={10}
                                                width={10}
                                              />{" "}
                                              {parseFloat(
                                                data?.product?.discount_price
                                              ).toFixed(2)}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="checkout-quantity">
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
                                          <input
                                            type="text"
                                            value={data?.quantity}
                                            onChange={() => {}}
                                          />
                                          <button
                                            type="button"
                                            id="add"
                                            className="add"
                                            onClick={() =>
                                              handleQuantity(
                                                data?.product.id,
                                                data?.quantity,
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
                                      <td>
                                        <Link
                                          href={pathname}
                                          prefetch={false}
                                          onClick={() =>
                                            handleDeleteFromCart(data.id)
                                          }
                                          className="delete"
                                        >
                                          {/* <i className="fa fa-trash"></i>
                                           */}
                                          <Image
                                            src={delIcon}
                                            alt="plusicon"
                                            width={30}
                                            height={30}
                                          />
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr className="text-center">
                                  <td colSpan={4}>No Items In Cart</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {cartList?.length > 0 && (
                          <div className="checkout-footer px-2">
                            <div className="checkout-sub-total d-flex justify-content-between">
                              <p className="value">Subtotal Price:</p>
                              <p className="price d-flex-center">
                                <Image
                                  src={rs_red}
                                  alt={"rs"}
                                  height={12}
                                  width={12}
                                />{" "}
                                {cartdetails &&
                                  cartdetails.total_payable_amount?.toFixed(2)}
                              </p>
                            </div>

                            <div className="checkout-btn my-2">
                              <Link
                                prefetch={false}
                                href="/address"
                                onClick={() => {
                                  setIsCartVisible(false);
                                }}
                                className="main-btn primary-btn"
                              >
                                Checkout
                              </Link>
                              {/* <Link
                                prefetch={false}
                                href="/cart"
                                onClick={() => {
                                  setIsCartVisible(false);
                                }}
                                className="main-btn primary-btn-border"
                              >
                                View Cart
                              </Link> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="navbarContainer">
                <nav className="main-navbar d-lg-flex justify-content-between align-items-center">
                  <div className="navbar-menu">
                    <ul className="main-menu m-0 pt-2">
                      <Suspense fallback={<LoadingServerData />}>
                        {categoryList &&
                          categoryList.map((data, i) => {
                            return (
                              <HeaderCategoryItem
                                key={i}
                                data={data}
                                setActivesidebar={setActivesidebar}
                              />
                            );
                          })}
                      </Suspense>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
export default Header;
