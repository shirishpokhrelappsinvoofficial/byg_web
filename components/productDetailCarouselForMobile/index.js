import React from "react";
import { settings } from "@/utils";
import Slider from "react-slick";
function ProductDetailCarouselForMobile({ product, onClick }) {
  return (
    <Slider {...settings}>
      {product?.images?.map((data, index) => {
        return (
          <div key={index} className="single-header-item bg_cover">
            <div className="cardImageHeight">
              <img
                src={
                  data.name?.includes("http")
                    ? data?.name
                    : "/public/assets/img/favicon.png"
                }
                className="object-fit-cover"
                alt={data.name}
                title={data.name}
                onClick={() => {
                  onClick();
                }}
              />
            </div>
          </div>
        );
      })}
    </Slider>
  );
}

export default ProductDetailCarouselForMobile;
