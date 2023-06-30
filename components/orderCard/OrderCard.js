import { getPaymentMode } from "@services/helper";
import React from "react";
import rs_black from "../../public/assets/img/rs_black.png";
import Link from "next/link";
import Image from "next/image";

function OrderCard({ data }) {
  return (
    <div className="orderCard shadow card rounded">
      <div className="position-relative">
        <img
          src={
            data?.order_product[0]?.images[0]?.name || "assets/img/earrings.jpg"
          }
          alt="Product"
          className="orderCardImage"
        />
        {data?.order_product?.length - 1 > 0 && (
          <span className="countIcon orderCardCountIcon">
            {`+${data?.order_product?.length - 1}`}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-center mb-3">
          <span className="theme-color">{data?.bog_order_id}</span>
        </p>
        <p className="mb-2 ">
          <span className="theme-color">Product Name: </span>{" "}
          <span
            style={{
              display: "block",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {data?.order_product
              ?.slice(0, 1)
              ?.map((elem) => {
                return elem.product_name;
              })
              ?.join(", ")}
            {data?.order_product?.length > 1
              ? ` (+${data?.order_product?.length - 1} more)`
              : ""}
          </span>
        </p>
        <p className="mb-2 ">
          <span className="theme-color">Payment Type:</span>{" "}
          <span>{getPaymentMode(data?.payment_mode)}</span>
        </p>
        <p className="mb-2 ">
          <span className="theme-color">Quantity:</span>{" "}
          <span>{data?.order_product?.length}</span>
        </p>
        <p className="mb-2 ">
          <span className="theme-color">Price:</span>{" "}
          <span>
            {" "}
            <Image src={rs_black} alt={"rs"} height={12} width={10} />{" "}
            {data?.amount}
          </span>
        </p>
        <p className="mb-2 ">
          <span className="theme-color">Status:</span>{" "}
          <span>{data?.status}</span>
        </p>
      </div>
    </div>
  );
}

export default OrderCard;
