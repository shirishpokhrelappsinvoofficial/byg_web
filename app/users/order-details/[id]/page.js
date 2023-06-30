"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderdetail, orderDetail } from "@/redux/store/userSlice";
import { useParams } from "next/navigation";
import calender from "../../../../public/assets/img/calender.png";
import user from "../../../../public/assets/img/customer.png";
import rs_black from "../../../../public/assets/img/rs_black.png";
import shipping from "../../../../public/assets/img/shipping.png";
import locationIcon from "../../../../public/assets/img/location_white.png";
import Image from "next/image";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetail({ id }));
  }, [dispatch, id]);

  const orderDetails = useSelector(orderdetail);

  return (
    <div class="user-right">
      <h4 class="mb-3">Order Details</h4>
      <div class="bg-white p-2">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <div class="order-date-status">
              <span class="position-relative pl-4">
                <Image
                  src={calender}
                  alt={"rs"}
                  height={15}
                  width={15}
                  className="date-icon"
                />{" "}
                <h5>{orderDetails && orderDetails.created_at}</h5>
                <p>ID: {orderDetails && orderDetails.bog_order_id}</p>
              </span>
              {orderDetails.delivery_date && (
                <span class="position-relative pl-4">
                  <Image
                    src={calender}
                    alt={"rs"}
                    height={20}
                    width={20}
                    className="fa-icon-bg"
                  />

                  <h5>delivery date</h5>
                  <p>
                    {" "}
                    {orderDetails && (orderDetails.delivery_date || "N/A")}
                  </p>
                </span>
              )}
            </div>
          </div>

          <div class="col-sm-12 col-md-12 col-lg-12">
            <hr />
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 mb-4">
            <div class="Order-Summary">
              {/* <i class="fa fa-user fa-icon-bg" aria-hidden="true"></i> */}
              <Image
                src={user}
                alt={"rs"}
                height={20}
                width={20}
                className="fa-icon-bg"
              />

              <h5>Customer</h5>
              <p>
                {orderDetails &&
                  orderDetails.customer &&
                  orderDetails.customer.first_name +
                    " " +
                    orderDetails.customer.last_name}
              </p>
              <p>
                {orderDetails &&
                  orderDetails.customer &&
                  (orderDetails.customer.email || "N/A")}
              </p>
              <p>
                {orderDetails &&
                  orderDetails.customer &&
                  (orderDetails.customer.mobile_number || "N/A")}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 mb-4">
            <div class="Order-Summary">
              {/* <i class="fa fa-truck fa-icon-bg" aria-hidden="true"></i> */}
              <Image
                src={shipping}
                alt={"rs"}
                height={20}
                width={20}
                className="fa-icon-bg"
              />

              <h5>shipping </h5>
              <p>
                address:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address.address || "N/A")}
              </p>
              <p>
                city:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.city || "N/A")}
              </p>
              <p>
                state:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.state || "N/A")}
              </p>
              <p>
                state:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.country || "N/A")}
              </p>
              <p>
                Pincode:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.zipcode || "N/A")}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 mb-4">
            <div class="Order-Summary postion-relative">
              {/* <i class="fa fa-map-marker fa-icon-bg" aria-hidden="true"></i> */}
              <div className="locationIconClass">
                <Image
                  src={locationIcon}
                  alt={"rs"}
                  height={5}
                  width={5}
                  className="fa-location-icon-bg"
                />
              </div>

              <h5>delivery </h5>
              <p>
                address:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address.address || "N/A")}
              </p>
              <p>
                city:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.city || "N/A")}
              </p>
              <p>
                state:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.state || "N/A")}
              </p>
              <p>
                state:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.country || "N/A")}
              </p>
              <p>
                Pincode:{" "}
                {orderDetails &&
                  orderDetails.order_address &&
                  (orderDetails.order_address?.zipcode || "N/A")}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12">
            <hr />
          </div>
          <div class="col-lg-12">
            <div class="checkout-style-1 ">
              <div class="checkout-table table-responsive">
                <table class="table text-center">
                  <tbody>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Attachments</th>
                    </tr>
                    {orderDetails &&
                      orderDetails?.order_product?.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td class="checkout-product">
                              <div class="">
                                <div class="product-thumb">
                                  <img
                                    src={
                                      data.images[0].name ||
                                      "assets/img/chocolates-333.png"
                                    }
                                    alt="Product"
                                  />
                                </div>
                              </div>
                            </td>
                            <td class="checkout-product">
                              <div class="">
                                <div class="product-content media-body">
                                  <h5 class="title">
                                    <a href="product-details.html">
                                      {data.product_name}
                                    </a>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td class="checkout-quantity">{data.quantity}</td>
                            <td class="checkout-price">
                              <p class="price">
                                {/* <i class="fa fa-inr" aria-hidden="true"></i>{" "} */}
                                <Image
                                  src={rs_black}
                                  alt={"rs"}
                                  height={12}
                                  width={10}
                                />{" "}
                                {data.product_price - data.product_discount}
                              </p>
                            </td>
                            <td>
                              {data?.order_product_answers?.length > 0
                                ? data?.order_product_answers?.map((data) => {
                                    return (
                                      <div>
                                        <label style={{ fontWeight: "bold" }}>
                                          {data?.product_label?.label || "N/A"}
                                        </label>

                                        <span>: {data.answer}</span>
                                      </div>
                                    );
                                  })
                                : "N/A"}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div class="checkout-coupon-total checkout-coupon-total-2 d-lg-flex justify-content-between">
                <div class="checkout-coupon"></div>
                <div class="checkout-total">
                  <div class="single-total">
                    <p class="value">Subtotal Price:</p>
                    <p class="price">
                      {/* <i class="fa fa-inr" aria-hidden="true"></i>{" "} */}
                      <Image
                        src={rs_black}
                        alt={"rs"}
                        height={12}
                        width={10}
                      />{" "}
                      {""}
                      {orderDetails && orderDetails?.total_price}
                    </p>
                  </div>
                  <div class="single-total">
                    <p class="value">Shipping Cost (+):</p>
                    <p class="price">
                      <Image src={rs_black} alt={"rs"} height={12} width={10} />{" "}
                      0.00
                    </p>
                  </div>
                  <div class="single-total">
                    <p class="value">Discount (-):</p>
                    <p class="price">
                      <Image src={rs_black} alt={"rs"} height={12} width={10} />{" "}
                      {orderDetails && orderDetails?.total_discount}
                    </p>
                  </div>
                  <div class="single-total total-payable">
                    <p class="value">Total Payable:</p>
                    <p class="price">
                      <Image src={rs_black} alt={"rs"} height={12} width={10} />{" "}
                      {orderDetails && orderDetails?.total_payable}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
