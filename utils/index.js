import Cookies from "js-cookie";
import Image from "next/image";
let isServer = typeof window === "undefined";

export const contact_details = {
  type: "contact",
  from_time: "10:00:00",
  to_time: "20:00:00",
  phone: "+91 9896620010",
  email: "bookyourgift21@gmail.com",
  content:
    "No.105/5, Ground Floor 60 feet road  Doddanekundi, Kartik Nagar, Marathahalli  Bangalore - 560036 Opposite to State Bank Of India, Karnataka, India,",
};
export const contact_number_data = {
  contactNumber: { type: "call", phone: "9971531430" },
};
export const getToken = () => {
  return !isServer && localStorage.getItem("bookyourgift-token")
    ? localStorage.getItem("bookyourgift-token")
    : null;
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const SampleNextArrow = () => {
  return (
    <Image
      src={"/public/assets/img/arrow_down.png"}
      alt={"down arrow"}
      height={20}
      width={20}
    />
  );
};
export const SamplePrevArrow = () => {
  return (
    <Image
      src={"/public/assets/img/arrow_up.png"}
      alt={"down arrow"}
      height={20}
      width={20}
    />
  );
};

export const settings = {
  dots: true,
  autoplay: false,
  autoplaySpeed: 2000,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  speed: 500,
  arrows: false,
  adaptiveHeight: true,
  // appendDots: (dots) => <ul>{dots}</ul>,
  // customPaging: (i) => <p></p>,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
};
