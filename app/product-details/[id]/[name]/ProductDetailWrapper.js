"use client";
// imports costs

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import Image from "next/image";

import GridCard from "@/components/gridcard";
import AsNavFor from "@/components/syncslider";
import ProductDetailCarouselForMobile from "@/components/productDetailCarouselForMobile";
import {
  productdetails,
  productDetails,
  updateProductDetails,
} from "@/redux/store/prouductSlice";
import {
  addToCart,
  addToWishlist,
  cart,
  updateCart,
} from "@/redux/store/cartSlice";
import { deviceId, postFormDataWithToken } from "@/services/httphandler";
import { Select } from "antd";
import { Modal } from "react-bootstrap";

import AddIcon from "/public/assets/img/plus.png";
import MinusIcon from "/public/assets/img/minus.png";
import starIcon from "/public/assets/img/star_icon.png";
import rs_black from "../../../../public/assets/img/rs_black.png";
import Upload from "@components/uploadFile";

const ProductDetailWrapper = (props) => {
  const dispatch = useDispatch();
  const { id, data } = props;
  let p = useSelector(productdetails);
  const product = p || data;
  const [state, setstate] = useState(false);
  const [review, setreview] = useState({
    rating: "",
    review_message: "",
  });
  const [object, setobject] = useState([]);
  const [params, setparams] = useState({
    product_answer: [],
  });
  const [imgShow, setImgShow] = useState(false);
  const [img, setImg] = useState("");
  const [arrows, setArrows] = useState(true);

  const [added_images, setAdded_Images] = useState([]);
  const [addon_image, setAddon_image] = useState([]);

  useEffect(() => {
    if (!p) dispatch(updateProductDetails(data));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(updateProductDetails(null));
    };
  }, []);

  const cartItems = useSelector(cart);

  useEffect(() => {
    if (data) {
      setparams({
        ...params,
        size: data?.sizes?.length > 0 ? data?.sizes?.[0] : "",
      });
      setAddon_image(product?.addon_images);
    }
  }, [data]);

  useEffect(() => {
    if (product && product?.addedToCart) {
      let data = cartItems?.filter((data) => data.product_id === product?.id);
      setparams({
        ...params,
        product_answer: data?.[0]?.product_answers || [],
      });
      setAdded_Images(data?.[0]?.product_addon_images || []);
    } else {
      setparams({
        ...params,
        product_answer: [],
      });
    }
  }, [product]);

  const handleImageChange = (image, id) => {
    setobject([
      {
        id,
        name: image,
      },
    ]);
    setparams({
      ...params,
      colour: id,
    });
  };

  const handleSizeChange = (id) => {
    setparams({
      ...params,
      size: id,
    });
  };

  const AddCart = (qua = 1) => {
    var data2 = true;
    product?.product_label?.map((elem) => {
      if (
        params.product_answer.findIndex((data) => data.label_id === elem.id) < 0
      ) {
        data2 = false;
      }
    });

    if (data2) {
      dispatch(
        addToCart({
          product: product && product?.id,
          ...params,
          product_answer: JSON.stringify(params?.product_answer),
          quantity: qua,
          device_id: deviceId,
          added_images: JSON.stringify(added_images),
        })
      ).then((data) => {
        if (data.payload.response_code === 200) {
          dispatch(productDetails({ id }));
        }
      });
    } else {
      toast.error("*Please fill the form.");
    }
  };

  const handleAddCart = (color, sizes) => {
    if (color > 0 && sizes > 0) {
      if (params?.colour && params?.size) {
        AddCart();
      } else toast.error("*Color & size is required");
    } else if (color > 0) {
      if (params?.colour) {
        AddCart();
      } else toast.error("*Color is required");
    } else if (sizes > 0) {
      if (params?.size) {
        AddCart();
      } else toast.error("*Size is required");
    } else {
      AddCart();
    }
  };

  const ratingChanged = (newRating) => {
    setreview({
      ...review,
      rating: newRating,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setreview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (review?.rating !== "" && review?.review_message !== "") {
      let formdata = new FormData();
      formdata.append("product_id", product?.id);
      for (const key in review) {
        if (Object.hasOwnProperty.call(review, key)) {
          const element = review[key];
          formdata.append(key, element);
        }
      }
      let response = await postFormDataWithToken("review/add", formdata);
      if (response && response?.response_code === 200) {
        toast.success(response?.message);
        dispatch(productDetails({ id }));
        setreview({
          ...review,
          review_message: "",
        });
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error("*Please fill all the fields.");
    }
  };

  const handleQuantity = (id, quantity, type) => {
    if (type === "add") {
      quantity += 1;

      AddCart(quantity);
    } else {
      quantity -= 1;
      AddCart(quantity);
    }
  };

  const onSuccess = (val) => {
    if (val === "success") {
      dispatch(productDetails({ id }));
    }
  };

  const addToPlaylist = () => {
    var data2 = true;
    product?.product_label?.map((elem) => {
      if (
        params?.product_answer?.findIndex((data) => data.label_id === elem.id) <
        0
      ) {
        data2 = false;
      }
    });

    if (data2) {
      dispatch(addToWishlist({ product: product?.id })).then((data) => {
        if (data?.payload?.response_code === 200) {
          dispatch(productDetails({ id }));
        }
      });
    } else {
      toast.error("*Please fill all the fields.");
    }
  };

  const handleSelect = (val, id, label, type) => {
    let arr = [...params?.product_answer];

    if (arr && arr.length < 1) {
      arr.push({
        label_id: label,
        answer: val,
        selected_id: id,
      });
    } else {
      const found = arr.findIndex((item) => item.label_id === label);

      if (found !== -1) {
        arr[found] = {
          label_id: label,
          answer: val,
          selected_id: id,
        };
      } else {
        arr.push({
          label_id: label,
          answer: val,
          selected_id: id,
        });
      }
    }
    setparams({ ...params, product_answer: [...arr] });
  };

  const handleInput = (val, id) => {
    let arr = [...params?.product_answer];

    if (arr && arr.length < 1) {
      arr.push({
        label_id: id,
        answer: val,
        selected_id: "",
      });
    } else {
      const found = arr.findIndex((item) => item.label_id === id);
      if (found !== -1) {
        arr[found] = {
          label_id: id,
          answer: val,
          selected_id: "",
        };
      } else {
        arr.push({
          label_id: id,
          answer: val,
          selected_id: "",
        });
      }
    }
    setparams({ ...params, product_answer: [...arr] });
  };

  const handleSelectValue = (id) => {
    return params?.product_answer[
      params?.product_answer?.findIndex((data) => data.label_id === id)
    ]?.answer;
  };

  const handleSelectInput = (id) => {
    return params?.product_answer[
      params?.product_answer?.findIndex((data) => data.label_id === id)
    ]?.answer;
  };
  const handleSelectImage = (id, i) => {
    return added_images[
      added_images?.findIndex((data) => data.product_addon_image_id === id)
    ]?.image;
  };
  const updateCartCall = () => {
    dispatch(
      updateCart({
        product: product && product?.id,
        ...params,
        quantity: product?.addedToCart,
        product_answer: JSON.stringify(params?.product_answer),
      })
    ).then((data) => {
      if (data?.payload?.response_code === 200) {
        dispatch(productDetails({ id }));
      }
    });
  };

  const handleAddedImage = (item, i, data) => {
    let arr = [...added_images];

    if (arr && arr.length < 1) {
      arr.push({
        product_addon_id: item?.id,
        label: item?.label,
        image: data?.location,
      });
    } else {
      const found = arr.findIndex((item) => item.product_addon_id === id);
      if (found !== -1) {
        arr[found] = {
          product_addon_id: item?.id,
          label: item?.label,
          image: data?.location,
        };
      } else {
        arr.push({
          product_addon_id: item?.id,
          label: item?.label,
          image: data?.location,
        });
      }
    }

    setAdded_images(arr);
  };
  return (
    <div>
      <section className="product-details-wrapper pt-3 pb-3">
        <div className="container-fluid">
          <div className="product-details-style-1">
            <div className="row">
              <div className="col-lg-6">
                <div className="productDetailCarouselForMobile mb-3">
                  {product && object?.length <= 0 && product?.images && (
                    <ProductDetailCarouselForMobile
                      product={product}
                      onClick={() => {
                        setImg(data?.name);
                        setImgShow(!imgShow);
                      }}
                    />
                  )}
                </div>
                <div className="product-details-image productDetailSliderParent ">
                  {product && object.length <= 0 && product?.images ? (
                    <AsNavFor images={product?.images} />
                  ) : (
                    <AsNavFor images={object} />
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-details-content">
                  <h2 className="title text-capitalize">
                    {product && product?.name}
                  </h2>

                  <div className="product-price">
                    <p className="regular-price mr-2">
                      <Image src={rs_black} alt={"rs"} height={20} width={20} />
                      {product && parseFloat(product?.price).toFixed(2)}{" "}
                    </p>
                    <p className="sale-price">
                      <Image src={rs_black} alt={"rs"} height={20} width={20} />
                      {product &&
                        parseFloat(
                          product?.price - product?.discountedPrice
                        ).toFixed(2)}{" "}
                    </p>
                    <p className="d-inline text-success h5">
                      {product && product?.discount}% OFF
                    </p>
                    <p>
                      <small>inclusive of all taxes</small>
                    </p>
                    <br />
                    <ul>
                      {product && product?.colours?.length > 0 && (
                        <li>
                          Colors :
                          {product?.colours?.map((data) => {
                            return (
                              <span>
                                <input
                                  defaultChecked={false}
                                  className="colors-input d-none"
                                  onChange={() =>
                                    handleImageChange(data.image, data.id)
                                  }
                                  id={`color-${data.id}`}
                                  type="radio"
                                  name="colors"
                                />
                                <label
                                  htmlFor={`color-${data.id}`}
                                  className="colors position-relative"
                                  style={{
                                    background: data.colour_code,
                                    cursor: "pointer",
                                  }}
                                >
                                  {/* {data.colour_code} */}
                                </label>
                              </span>
                            );
                          })}
                        </li>
                      )}
                      {product && product?.sizes?.length > 0 && (
                        <li>
                          Sizes :
                          <div
                            className="single-radio"
                            style={{
                              display: "inline-block",
                              margin: " 0px 10px",
                            }}
                          >
                            {product?.sizes?.map((data, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <input
                                    type="radio"
                                    id={data.size}
                                    className="radio-input"
                                    name="Weight"
                                    defaultChecked={false}
                                    checked={
                                      params?.size.toString() ===
                                      data?.id?.toString()
                                    }
                                    onChange={() => handleSizeChange(data.id)}
                                  />
                                  <label
                                    for={data.size}
                                    className="radio-label"
                                  >
                                    {" "}
                                    <span className="radio-border"></span>{" "}
                                    {data.size}{" "}
                                  </label>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="product-btn pt-2">
                    {product && product?.unit > 0 ? (
                      product?.addedToCart <= 0 ? (
                        <button
                          onClick={() =>
                            handleAddCart(
                              product?.colours?.length,
                              product?.sizes?.length
                            )
                          }
                          className="main-btn primary-btn"
                        >
                          Add to cart
                        </button>
                      ) : (
                        <div className="d-inline-flex align-items-center mr-3">
                          <span>Quantity: </span>
                          <div className="product-quantity d-inline-flex">
                            <button
                              style={{ zIndex: 10 }}
                              type="button"
                              id="sub"
                              onClick={() =>
                                handleQuantity(
                                  product?.id,
                                  product?.addedToCart,
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
                            <input
                              style={{ zIndex: 10 }}
                              type="text"
                              value={product?.addedToCart}
                            />
                            <button
                              style={{ zIndex: 10 }}
                              type="button"
                              id="add"
                              className="add"
                              onClick={() =>
                                handleQuantity(
                                  product?.id,
                                  product?.addedToCart,
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
                        </div>
                      )
                    ) : (
                      <p
                        className="main-btn primary-btn"
                        style={{
                          display: "inline-block",
                          cursor: "no-drop",
                          background: "grey",
                        }}
                      >
                        Out of stock
                      </p>
                    )}
                    {product && !product?.product_label?.length > 0 && (
                      <div style={{ display: "inline-block" }}>
                        {product && product?.addedToWishlist ? (
                          <button
                            onClick={addToPlaylist}
                            className="main-btn primary-btn"
                          >
                            Added to wishlist
                          </button>
                        ) : (
                          <button
                            onClick={addToPlaylist}
                            className="main-btn primary-btn"
                          >
                            Add to wishlist
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    {product &&
                      product?.product_label &&
                      product?.product_label?.map((item, i) => {
                        return (
                          <div
                            className="col-sm-12 col-md-12 col-lg-12 mt-3"
                            key={i}
                          >
                            <div class="position-relative">
                              <label>{item.label}</label>
                              {item.label_type === "text" ? (
                                <input
                                  value={handleSelectInput(item.id)}
                                  type="text"
                                  style={{ paddingLeft: "24px" }}
                                  id="phone"
                                  class="form-control"
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    handleInput(value, item.id);
                                  }}
                                  name="mobile_number"
                                  placeholder=""
                                  required
                                />
                              ) : (
                                <Select
                                  className="form-control"
                                  dropdownStyle={{
                                    border: "none",
                                  }}
                                  value={handleSelectValue(item.id)}
                                  onChange={(val, option) => {
                                    handleSelect(
                                      val,
                                      option.id,
                                      item.id,
                                      "select"
                                    );
                                  }}
                                  allowClear={true}
                                >
                                  {item?.options?.map((opt, index) => {
                                    return (
                                      <option id={opt.id} value={opt.option}>
                                        {opt.option}
                                      </option>
                                    );
                                  })}
                                </Select>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    <div className="row">
                      {addon_image?.map((item, i) => {
                        return (
                          <div className="col-sm-12 col-md-6 col-lg-6 mt-3 text-center">
                            <div>{item?.label}</div>
                            <Upload
                              dataHandler={(data) => {
                                handleAddedImage(item, i, data);
                              }}
                              imager={handleSelectImage(item?.id) || ""}
                              hideText={true}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {product && product?.addedToCart && (
                      <div className="mt-2 text-right">
                        <button
                          onClick={() => updateCartCall()}
                          className="main-btn primary-btn "
                        >
                          Update Cart
                        </button>
                      </div>
                    )}

                    {product && product?.features && (
                      <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                        <div class="accordion faqs" id="accordionExample">
                          <Accordion defaultActiveKey="0">
                            <div class="">
                              <Accordion.Item eventKey="0">
                                <div class="card-header" id="headingOne">
                                  <Accordion.Header className="detailsPage">
                                    <span>Feature and Details</span>
                                  </Accordion.Header>
                                </div>

                                <Accordion.Body
                                  eventKey="0"
                                  onEntered={() => {
                                    setArrows(!arrows);
                                  }}
                                  onExit={() => {
                                    setArrows(!arrows);
                                  }}
                                >
                                  <div
                                    class="card-body"
                                    dangerouslySetInnerHTML={{
                                      __html: product && product?.features,
                                    }}
                                  ></div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </div>
                          </Accordion>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-wrapper pt-5 pb-2">
        <div className="container">
          <div className="reviews-style">
            <div className="reviews-menu">
              <ul
                className="breadcrumb-list-grid nav nav-tabs border-0"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className={!state ? "active" : ""}
                    onClick={() => setstate(false)}
                    id="Details-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="Details"
                    aria-selected="true"
                  >
                    Details
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    id="Reviews-tab"
                    onClick={() => setstate(true)}
                    className={state ? "active" : ""}
                    data-toggle="tab"
                    role="tab"
                    aria-controls="Reviews"
                    aria-selected="false"
                  >
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content" id="myTabContent">
              <div
                className={"tab-pane fade " + (!state ? "show active" : "")}
                id="Details"
                role="tabpanel"
                aria-labelledby="Details-tab"
              >
                <div className="details-wrapper">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="reviews-title">
                        <h4 className="title">Product Description:</h4>
                      </div>
                      {/* <p className="mb-3 pt-30">Highlights:</p> */}
                      {product && product?.description}
                      <div className="row">
                        {product &&
                          product?.description_images &&
                          product?.description_images?.length > 0 &&
                          product?.description_images?.map((data) => {
                            return (
                              <div
                                key={data.id}
                                className="col-sm-6 col-md-4 col-lg-3 col-xl-2"
                              >
                                <div className="points_icon text-center">
                                  <img
                                    src={data.image || "assets/img/free.png"}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <p>{data.name}</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"tab-pane fade " + (state ? "show active" : "")}
                id="Reviews"
                role="tabpanel"
                aria-labelledby="Reviews-tab"
              >
                <div className="review-wrapper">
                  <div className="reviews-title">
                    <h4 className="title">
                      Customer Reviews ({product && product?.reviews?.length})
                    </h4>
                  </div>

                  <div className="reviews-rating-wrapper flex-wrap">
                    <div className="reviews-rating-star">
                      <p className="rating-review">
                        {/* <i className="fa fa-star"></i>{" "} */}
                        <Image
                          src={starIcon}
                          alt={"down arrow"}
                          height={20}
                          width={20}
                          className=""
                          style={{
                            lineHeight: "1",
                          }}
                        />
                        <span className="pl-1">
                          {product && product?.avg_review}
                        </span>{" "}
                        of 5
                      </p>

                      <div className="reviews-rating-bar">
                        <div className="single-reviews-rating-bar">
                          <p className="value">5 Star</p>
                          <div className="rating-bar-inner">
                            <div
                              className="bar-inner"
                              style={{
                                width: `${
                                  product && product?.review_percentage?.[0]
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="percent">
                            {product &&
                              product?.review_percentage?.[0]?.toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="reviews-rating-bar">
                        <div className="single-reviews-rating-bar">
                          <p className="value">4 Star</p>
                          <div className="rating-bar-inner">
                            <div
                              className="bar-inner"
                              style={{
                                width: `${
                                  product && product?.review_percentage?.[1]
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="percent">
                            {product &&
                              product?.review_percentage?.[1]?.toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="reviews-rating-bar">
                        <div className="single-reviews-rating-bar">
                          <p className="value">3 Star</p>
                          <div className="rating-bar-inner">
                            <div
                              className="bar-inner"
                              style={{
                                width: `${
                                  product && product?.review_percentage?.[2]
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="percent">
                            {product &&
                              product?.review_percentage?.[2]?.toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="reviews-rating-bar">
                        <div className="single-reviews-rating-bar">
                          <p className="value">2 Star</p>
                          <div className="rating-bar-inner">
                            <div
                              className="bar-inner"
                              style={{
                                width: `${
                                  product && product?.review_percentage?.[3]
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="percent">
                            {product &&
                              product?.review_percentage?.[3]?.toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="reviews-rating-bar">
                        <div className="single-reviews-rating-bar">
                          <p className="value">1 Star</p>
                          <div className="rating-bar-inner">
                            <div
                              className="bar-inner"
                              style={{
                                width: `${
                                  product && product?.review_percentage?.[4]
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="percent">
                            {product &&
                              product?.review_percentage?.[4]?.toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                    </div>

                    {product && product?.isPurchase && (
                      <div className="reviews-rating-form">
                        <div className="rating-star">
                          <p>Click on star to review</p>
                          <ul id="stars" className="stars">
                            <ReactStars
                              count={5}
                              onChange={ratingChanged}
                              size={24}
                              value={review.rating}
                              edit={true}
                              activeColor="#ffd700"
                            />
                            ,
                          </ul>
                        </div>
                        <div className="rating-form">
                          <form action="#">
                            <div className="single-form form-default">
                              <label>Write your Review</label>
                              <div className="form-input">
                                <textarea
                                  placeholder="Your review here"
                                  name="review_message"
                                  onChange={handleChange}
                                  value={review.review_message}
                                ></textarea>
                                <i className="fa fa-message-text-outline"></i>
                              </div>
                            </div>
                            <div className="single-rating-form flex-wrap">
                              <div className="rating-form-btn">
                                <button
                                  onClick={handleSubmitReview}
                                  className="main-btn primary-btn"
                                >
                                  write a Review
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="reviews-comment">
                    <ul className="comment-items">
                      {product && product?.reviews?.length > 0 ? (
                        product?.reviews?.map((data) => {
                          return (
                            <li key={data?.id}>
                              <div className="single-review-comment">
                                <div className="comment-user-info">
                                  <div className="comment-author image-wrapper">
                                    <img
                                      className="object-fit-cover"
                                      src={
                                        data?.user_type === 2 &&
                                        data?.reviwed_by?.image?.includes(
                                          "http"
                                        )
                                          ? data?.reviwed_by?.image
                                          : data?.image
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="comment-content">
                                    <h6 className="name">
                                      {data?.user_type === 2
                                        ? data?.reviwed_by?.first_name +
                                          " " +
                                          data?.reviwed_by?.last_name
                                        : data?.name}
                                    </h6>

                                    <p>
                                      <Image
                                        src={starIcon}
                                        alt={"down arrow"}
                                        height={20}
                                        width={20}
                                        className=""
                                        style={{
                                          lineHeight: "1",
                                        }}
                                      />
                                      <span className="rating mr-2">
                                        <strong>{data?.rating}</strong> of{" "}
                                        <strong>5</strong>
                                      </span>
                                      <span className="da te">
                                        {data?.created_at}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li>No Reviews Found</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {product && product?.recommended_items?.length > 0 && (
        <section className="clients-logo-section pt-2 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h4 className="heading-1 font-weight-700">
                  Recommended Products
                </h4>
              </div>
            </div>
            <div className="client-logo-active">
              <div className="row recommended">
                {product &&
                  product?.recommended_items?.map((data, i) => {
                    return (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 mb-5 col-6"
                        key={i}
                      >
                        <GridCard
                          title={data.name}
                          onSuccess={(val) => onSuccess(val)}
                          price={data.price}
                          discountPrice={data.discountedPrice || 0}
                          data={data.images}
                          cart={data.addedToCart}
                          unit={data.unit}
                          id={data.id}
                          quantity={data.quantity}
                          description={data.description}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
      <Modal
        show={imgShow}
        onHide={() => {
          setImgShow(!imgShow);
        }}
        size="lg"
        centered
        dialogClassName="modal-xl"
      >
        <Modal.Body>
          <div>
            <div className="modal-content">
              <div className="modal-body p-0">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setImg("");
                    setImgShow(!imgShow);
                  }}
                ></button>
                <div className="mt-3">
                  <img src={img} alt="productImage" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetailWrapper;
