"use client";
import React, { useState } from "react";
import {
  clientEmail,
  clientPhoneNumber,
  getPaymentMode,
} from "@/services/helper";
import { getData } from "@/services/httphandler";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loader from "@components/loader";

const CompletedOrders = () => {
  const { data } = useParams();
  const cod = useSearchParams().get("cod");

  const [state, setstate] = React.useState(null);
  const [loading, setLoading] = useState(false);

  const getDetails = async (id) => {
    // const state = {}
    setLoading(true);
    let response = await getData(`completedOrders`, {
      id,
    });

    setstate(response.data);
    setLoading(false);
  };
  React.useEffect(() => {
    if (
      data.toLowerCase() !== "cancelled" &&
      data?.toLowerCase() !== "failed"
    ) {
      getDetails(data);
    }
  }, [data]);

  return (
    <section class="checkout-wrapper pt-50">
      <div class="container">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {(data?.toLowerCase() === "cancelled" ||
              data.toLowerCase() === "failed") && (
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
                  <h3 class="mb-3">Transaction {data?.toLowerCase()}</h3>
                  <p class="mb-3">
                    Your transaction{" "}
                    {data?.toLowerCase() === "failed"
                      ? `${data?.toLowerCase()} due to an error, please try again
                    after sometimes.`
                      : data?.toLowerCase() === "cancelled"
                      ? "was cancelled. Please try again."
                      : ""}
                  </p>
                  <p class="mb-3">
                    For any queries, you can call us at {clientPhoneNumber}{" "}
                    between 10 AM to 8 PM IST or you can mail us at{" "}
                    <a href={`mailto:${clientEmail}`}>{clientEmail}</a>
                  </p>
                </div>
              </div>
            )}
            {state?.transaction_status === "SUCCESS" &&
              state?.payment_mode?.toLowerCase() !== "cod" && (
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
                    <h3 class="mb-3">Thank you for your order!</h3>
                    <p class="mb-3">
                      Your order has been placed and is being processed. You
                      will be notified on your registered email address when
                      your order get delivered
                    </p>
                    <p class="mb-3">
                      For any queries, you can call us at {clientPhoneNumber}{" "}
                      between 10 AM to 8 PM IST or you can mail us at{" "}
                      <a href={`mailto:${clientEmail}`}>{clientEmail}</a>
                    </p>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
                    <div class="Order-Summary">
                      <h4 class="">Order Summary</h4>
                      <hr />
                      <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6 mb-2">
                          <h6>
                            Order Id : <b>{state && state?.bog_order_id}</b>
                          </h6>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-6 mb-2">
                          <p>
                            Total : <b>Rs {state && state?.total}</b>
                          </p>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-6 mb-2">
                          <p>
                            Amount Paid : <b>Rs {state && state?.total}</b>{" "}
                            <i>
                              through{" "}
                              {state &&
                                state?.payment_mode &&
                                getPaymentMode(state?.payment_mode)}
                            </i>
                          </p>
                        </div>
                      </div>

                      <h4 class="">Delivery Address</h4>
                      <hr />
                      <p>
                        <b>
                          {state &&
                            state?.deliveryAddress?.first_name +
                              " " +
                              state?.deliveryAddress?.last_name}
                        </b>
                      </p>
                      <p>{state && state?.deliveryAddress?.address}</p>
                      <p>
                        {state && state?.deliveryAddress?.city}, -{" "}
                        {state && state?.deliveryAddress?.zipcode}
                      </p>
                      <p>
                        Mobile :{" "}
                        {state && state?.deliveryAddress?.mobile_number}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            {cod && (
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
                  <h3 class="mb-3">Thank you for your order!</h3>
                  <p class="mb-3">
                    Your order has been placed and is being processed. You will
                    be notified on your registered email address when your order
                    get delivered
                  </p>
                  <p class="mb-3">
                    For any queries, you can call us at {clientPhoneNumber}{" "}
                    between 10 AM to 8 PM IST or you can mail us at{" "}
                    <a href={`mailto:${clientEmail}`}>{clientEmail}</a>
                  </p>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
                  <div class="Order-Summary">
                    <h4 class="">Order Summary</h4>
                    <hr />
                    <div class="row">
                      <div class="col-sm-12 col-md-12 col-lg-6 mb-2">
                        <h6>
                          Order Id : <b>{state && state?.bog_order_id}</b>
                        </h6>
                      </div>
                      <div class="col-sm-12 col-md-12 col-lg-6 mb-2">
                        <p>
                          Total : <b>Rs {state && state?.total}</b>
                        </p>
                      </div>
                      <div class="col-sm-12 col-md-12 col-lg-6 mb-2">
                        <p>
                          Amount : <b>Rs {state && state?.total}</b>{" "}
                          <i>
                            through{" "}
                            {state &&
                              state?.payment_mode &&
                              getPaymentMode(state?.payment_mode)}
                          </i>
                        </p>
                        <p>
                          Transaction Status :{" "}
                          <b>{state?.transaction_status}</b>
                        </p>
                      </div>
                    </div>

                    <h4 class="">Delivery Address</h4>
                    <hr />
                    <p>
                      <b>
                        {state &&
                          state?.deliveryAddress?.first_name +
                            " " +
                            state?.deliveryAddress?.last_name}
                      </b>
                    </p>
                    <p>{state && state?.deliveryAddress?.address}</p>
                    <p>
                      {state && state?.deliveryAddress?.city}, -{" "}
                      {state && state?.deliveryAddress?.zipcode}
                    </p>
                    <p>
                      Mobile : {state && state?.deliveryAddress?.mobile_number}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompletedOrders;
