"use client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { orders, totalOrder, getOrders } from "@/redux/store/userSlice";
import { getPaymentMode } from "@/services/helper";
import { putEncodedData } from "@/services/httphandler";
import Link from "next/link";
import { useEffect } from "react";
import rs_black from "../../../public/assets/img/rs_black.png";
import Image from "next/image";
import OrderCard from "@/components/orderCard/OrderCard";

const Orders = () => {
  const dispatch = useDispatch();
  const orderList = useSelector(orders);
  const total = useSelector(totalOrder);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div class="user-right scrollingDiv">
      <h4 class="mb-3">My Orders</h4>

      <div className="row">
        {orderList?.length > 0 ? (
          orderList?.map((item, i) => {
            return (
              <div
                key={i}
                className="col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4"
              >
                <OrderCard data={item} />
              </div>
            );
          })
        ) : (
          <div>No product added to wishlist.</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
