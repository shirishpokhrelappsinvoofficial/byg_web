"use client";
import { useDispatch, useSelector } from "react-redux";
import { deviceId } from "@/services/httphandler";
import {
  fetchSearchedProduct,
  filter,
  getProduct,
} from "@/redux/store/prouductSlice";
import {
  addToCart,
  addToWishlist,
  moveOneToCart,
} from "@/redux/store/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddIcon from "/public/assets/img/plus.png";
import MinusIcon from "/public/assets/img/minus.png";
import rs_black from "/public/assets/img/rs_black.png";
import rs_red from "/public/assets/img/rs_red.png";
import rs_green from "/public/assets/img/rs_green.png";
import wishlist_black from "/public/assets/img/wishlist_black.png";
import wishlist_white from "/public/assets/img/wishlist_white.png";
import { loginModalHandler } from "@redux/store/loginModalSlice";
import { useState } from "react";
import SingleSlider from "@components/singleSlider";

const GridCard = ({
  title,
  wishlist,
  wishlist_id,
  price,
  data,
  cart,
  badge,
  id,
  moveToCart,
  description,
  discountPrice,
  unit,
  select = [],
  text = [],
  onSuccess = (msg) => {
    // return toast.success(msg);
    return false;
  },
  searchFilters,
}) => {
  const filterProd = useSelector(filter);
  const dispatch = useDispatch();
  const router = useRouter();
  // const params = useSearchParams();
  // const pathname = usePathname();
  // const key = "12";
  const [wishListToggle, setWishListToggle] = useState(false);
  const isLoggedIn = useSelector((state) => state.profile.isLoggedIn);

  const handleCartClick = async (object) => {
    dispatch(addToCart(object)).then((response) => {
      if (response?.payload?.response_code === 200) {
        dispatch(getProduct(filterProd));
        // if (key) {
        //   // dispatch(fetchSearchedProduct(searchFilters));
        // }
        onSuccess("success");
      }
    });
  };

  const addToPlaylist = () => {
    if (isLoggedIn) {
      dispatch(addToWishlist({ product: id })).then((data) => {
        if (data?.payload?.response_code === 200) {
          dispatch(getProduct(filterProd));
          onSuccess("success");
        }
      });
    } else {
      dispatch(loginModalHandler());
    }
  };

  const handleQuantity = (id, quantity, type) => {
    if (type === "add") {
      quantity += 1;
      dispatch(
        addToCart({
          product: id,
          quantity,
        })
      ).then((data) => {
        if (key) {
          dispatch(fetchSearchedProduct(searchFilters));
        }
      });
    } else {
      quantity -= 1;
      dispatch(
        addToCart({
          product: id,
          quantity,
        })
      ).then((data) => {
        onSuccess("success");
        if (key) {
          // dispatch(fetchSearchedProduct(searchFilters));
        }
      });
    }
  };

  const handleMoveOneToCart = () => {
    dispatch(
      moveOneToCart({
        wishlist_id,
      })
    ).then(() => {
      if (key) {
        dispatch(fetchSearchedProduct(searchFilters));
      }
    });
  };

  return (
    <div className="product-style-1 home-page-img position-relative h-100">
      <span className="badge-topright text-center forDesktop">
        <span
          style={{
            textDecoration:
              discountPrice && discountPrice > 0 ? "line-through" : "",
            color: discountPrice && discountPrice > 0 ? "" : "red",
          }}
        >
          <Image src={rs_black} alt="price" height={10} width={10} /> {price}{" "}
        </span>
        {discountPrice && discountPrice > 0 && (
          <>
            {" "}
            <span style={{ color: "red" }}>
              {" "}
              <Image src={rs_red} alt="price" height={10} width={10} />{" "}
              {parseFloat(price - discountPrice).toFixed(2)}
            </span>
            <p className="discountBadge">{(discountPrice / price) * 100} off</p>
          </>
        )}
      </span>
      <div
        //
        // href={}
        className="product-image"
        style={{ overflow: "hidden", cursor: "pointer" }}
        onClick={() => {
          router.push(
            `/product-details/${id}/${title
              ?.toLowerCase()
              ?.replace(/[^a-zA-Z0-9]/g, " ")
              ?.replaceAll(" ", "-")}
            `
          );
        }}
      >
        {badge && <span className="icon-text text-style-1">best seller</span>}

        <div className="product-active ">
          {data && title && (
            <SingleSlider
              title={title}
              isCard={true}
              path={data?.map((data) => {
                return {
                  name: data.name,
                };
              })}
            />
          )}
          {/* {data && (
            <img
              src={data?.[0]?.name}
              alt="productImage"
              className="object-fit-cover "
            />
          )} */}
        </div>
      </div>
      <div className="product-content text-center">
        {select.length > 0 || text.length > 0 ? null : (
          <p
            className={"wishlist mb-2 " + (wishlist ? "active" : "")}
            onClick={addToPlaylist}
          >
            {/* <i className="fa fa-heart-o"></i> */}
            <Image
              src={wishlist ? wishlist_white : wishlist_black}
              alt="price"
              height={15}
              width={20}
            />{" "}
            Wishlist
          </p>
        )}

        <h4 className="title cardTitle">
          <Link
            className="text-primary"
            href={`/product-details/${id}/${title
              ?.toLowerCase()
              ?.replace(/[^a-zA-Z0-9]/g, " ")
              .replaceAll(" ", "-")}
              `}
            prefetch={true}
          >
            {title}
          </Link>
        </h4>
        <p className=" text-center forMobile">
          <span
            style={{
              textDecoration:
                discountPrice && discountPrice > 0 ? "line-through" : "",
              color: discountPrice && discountPrice > 0 ? "" : "green",
            }}
          >
            <Image
              src={discountPrice > 0 ? rs_black : rs_green}
              alt={"rs"}
              height={15}
              width={15}
            />{" "}
            {price}{" "}
          </span>
          {discountPrice && discountPrice > 0 && (
            <>
              {" "}
              <span style={{ color: "red" }}>
                {" "}
                <Image src={rs_black} alt="price" height={10} width={10} />{" "}
                {discountPrice}
              </span>{" "}
              <span className="discountBadge">
                {(discountPrice / price) * 100} off
              </span>
            </>
          )}
        </p>
        {/* <p className="line-clamp-2">{description}</p> */}
        {select.length > 0 || text.length > 0 ? (
          <Link
            href={`/product-details/${id}/${[
              title
                .toLowerCase()
                ?.replace(/[^a-zA-Z0-9]/g, " ")
                ?.replaceAll(" ", "-"),
            ]}`}
            className="main-btn primary-btn"
            prefetch={true}
          >
            Product Details
          </Link>
        ) : // <p style={{ lineHeight: '40px', background: 'grey', marginTop: '26px', color: '#fff' }} >Details</p>
        unit > 0 ? (
          cart <= 0 ? (
            <p className="text-capitalize text-white">
              <button
                onClick={() =>
                  handleCartClick({
                    product: id,
                    quantity: 1,
                    device_id: deviceId,
                  })
                }
                className="main-btn primary-btn"
              >
                Add to cart
              </button>
            </p>
          ) : (
            <div
              className="product-quantity d-inline-flex"
              style={{ margin: "10px" }}
            >
              <button
                style={{ zIndex: 10 }}
                type="button"
                id="sub"
                onClick={() => handleQuantity(id, cart, "substract")}
                className="sub"
              >
                {/* <i className="fa fa-minus" aria-hidden="true"></i> */}
                <Image src={MinusIcon} alt="plusicon" width={20} height={20} />
              </button>
              <input
                style={{ zIndex: 10 }}
                type="text"
                value={cart}
                onChange={() => {}}
              />
              <button
                style={{ zIndex: 10 }}
                type="button"
                id="add"
                className="add"
                onClick={() => handleQuantity(id, cart, "add")}
              >
                {/* <i className="fa fa-plus" aria-hidden="true"></i> */}
                <Image src={AddIcon} alt="plusicon" width={20} height={20} />
              </button>
            </div>
          )
        ) : (
          <p
            style={{
              lineHeight: "40px",
              background: "grey",
              marginTop: "26px",
              color: "#fff",
            }}
          >
            Out of stock
          </p>
        )}

        {moveToCart && unit > 0 && (
          <p className="text-capitalize text-white">
            <button
              onClick={handleMoveOneToCart}
              className="main-btn primary-btn"
            >
              Move to cart
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default GridCard;
