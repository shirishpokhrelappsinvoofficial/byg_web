"use client";
import Image from "next/image";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const SingleSlider = ({ path, height, dots, page, isCard, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "red" }}
  //       onClick={onClick}
  //     />
  //     <div onClick={onClick} className="slickArrowsRight">
  //       <i class="fa-light fa-circle-arrow-left"></i>
  //     </div>
  //   );
  // }

  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "green" }}
  //       onClick={onClick}
  //     />
  //     <div className="slickArrowsLeft">
  //       <i class="fa-light fa-circle-arrow-left fa-xl"></i>
  //     </div>
  //   );
  // }
  const settings = {
    dots: dots || false,
    autoplay: isCard && isHovered ? true : false,
    autoplaySpeed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 800,
    arrows: page === "homepage" ? true : false,
    adaptiveHeight: isCard ? false : true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => <p></p>,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  function play() {
    ref.current.slickPlay();
  }
  function pause() {
    ref.current.slickPause();
  }

  return (
    <Slider ref={ref} {...settings}>
      {path.map((data, index) => {
        if (isCard) {
          return (
            <div
              key={index}
              onMouseEnter={() => {
                play();
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                pause();
              }}
            >
              <div className="position-relative gridImageContainer">
                <Image
                  src={data?.name}
                  alt={title}
                  title={title}
                  priority={true}
                  fill={true}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="single-header-item bg_cover">
              <div className="gridImageContainer cardImageHeight position-relative ">
                <Image
                  src={data?.name}
                  alt={title}
                  title={title}
                  priority={true}
                  fill={true}
                />
              </div>
            </div>
          );
        }
      })}
    </Slider>
  );
};

export default SingleSlider;
