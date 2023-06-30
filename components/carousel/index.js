"use client";
import { responsive } from "@services/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CustomCarousel(props) {
  return (
    <Carousel
      responsive={responsive}
      dotListClass="custom-dot-list-style"
      itemClass="pb-5 px-3"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass="carousel-container"
      showDots={true}
      arrows={false}
      swipeable={true}
      draggable={true}
    >
      {props.list &&
        props.list?.length > 0 &&
        props.list?.map((data) => {
          return (
            <div key={data.id} className="">
              <div className="product-style-1 home-page-img mt-30">
                <div className="product-image">
                  <div className="product-active">
                    <div
                      className="product-item active "
                      style={{
                        height: "215px",
                      }}
                    >
                      <div
                        className="position-relative"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      >
                        <Image
                          fill={true}
                          priority={true}
                          src={data.image}
                          alt={data?.name}
                          title={data?.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="product-content text-center"
                  style={{ padding: "20px" }}
                >
                  <h4 className="title text-left mb-1">
                    <Link style={{ fontSize: "17px" }} href="#">
                      Get upto {data.discount} % of discount.
                    </Link>
                  </h4>
                  <p
                    style={{
                      color: "#38c438",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="text-left"
                  >
                    {data.code}
                    <CopyToClipboard
                      text={data.code}
                      onCopy={() => toast.success("Copied to clipboard")}
                    >
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                        }}
                      >
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-solid fa-copy ml-3"
                        ></i>
                      </button>
                    </CopyToClipboard>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </Carousel>
  );
}

export default CustomCarousel;
