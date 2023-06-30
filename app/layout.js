import "./globals.css";
import "../public/assets/css/plugin.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@redux/Providers";
import { cookies, headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getCartList, getHomapageData, getUser } from "@apis/get";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Script from "next/script";
import { contact_details, contact_number_data } from "@utils";

export const GA_TRACKING_ID = "G-5S1HV73SHW";

export const metadata = {
  title: "Buy Home Decor Items Online in India @ Upto 50% OFF | BookYourGift",
  description:
    "Bookyourgift is Leading Online ✯Free Shipping ✯COD ✯Easy Returns and Exchanges for Buy Home Decor Items Online in India @ Upto 50% OFF, Buy Home Decor Products Online, Home Decor Items in Low Price, Buy Decorative Items for Home Online, Home Decoration Items Online, Cheapest Home Decor Online in India, Cheap Home Decor Items Online, Buy Home Decor Gift Items Online, Luxury Home Decor at Best Price.",
  keywords: [
    "Buy Home Decor Items Online in India @ Upto 50% OFF",
    "Buy Home Decor Products Online",
    "Home Decor Items in Low Price",
    "Buy Decorative Items for Home Online",
    "Home Decoration Items Online",
    "Cheapest Home Decor Online in India",
    "Cheap Home Decor Items Online",
    "Buy Home Decor Gift Items Online",
    "Luxury Home Decor at Best Price",
  ],
  openGraph: {
    title: "Buy Home Decor Items Online in India @ Upto 50% OFF | BookYourGift",
    description:
      "Bookyourgift is Leading Online ✯Free Shipping ✯COD ✯Easy Returns and Exchanges for Buy Home Decor Items Online in India @ Upto 50% OFF, Buy Home Decor Products Online, Home Decor Items in Low Price, Buy Decorative Items for Home Online, Home Decoration Items Online, Cheapest Home Decor Online in India, Cheap Home Decor Items Online, Buy Home Decor Gift Items Online, Luxury Home Decor at Best Price.",
    url: "https://www.bookyourgift.in",
    siteName: "BookYourGift",
    images: [
      {
        url: "https://bookyour-gift-media.s3.amazonaws.com/Web-banner-v2-Stylish-Home-decor%20(1).jpg",
        width: 800,
        height: 600,
        alt: "Buy Home Decor Items Online in India @ Upto 50% OFF | BookYourGift",
        title:
          "Buy Home Decor Items Online in India @ Upto 50% OFF | BookYourGift",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Buy Home Decor Items Online in India @ Upto 50% OFF | BookYourGift",
    description:
      "Bookyourgift is Leading Online ✯Free Shipping ✯COD ✯Easy Returns and Exchanges for Buy Home Decor Items Online in India @ Upto 50% OFF, Buy Home Decor Products Online, Home Decor Items in Low Price, Buy Decorative Items for Home Online, Home Decoration Items Online, Cheapest Home Decor Online in India, Cheap Home Decor Items Online, Buy Home Decor Gift Items Online, Luxury Home Decor at Best Price.",

    images: [
      "https://bookyour-gift-media.s3.amazonaws.com/Web-banner-v2-Stylish-Home-decor%20(1).jpg",
    ],
  },
  alternates: {
    canonical: "https://www.bookyourgift.in",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const byg_schema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Book Your Gift",
    url: "https://www.bookyourgift.in",
  };
};
const byg_social_schema = () => {
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Book Your Gift",
    url: "https://www.bookyourgift.in",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9896620010",
        contactType: "WhatsApp on",
      },
    ],
    sameAs: [
      "https://www.facebook.com/bookyourgift",
      "https://instagram.com/bookyourgift",
      "https://in.pinterest.com/bookyourgift/",
    ],
    logo: "https://www.bookyourgift.in/assets/img/logo.png",
  };
};

export default async function RootLayout({ children }) {
  let token = cookies().get("byg_tk");
  let cookie =
    cookies().get("Device_id")?.value || headers().get("Device_id") || uuidv4();

  const cartList = await getCartList({}, token, cookie);
  const getHomepageData = await getHomapageData({ page: 1 }, token, cookie);
  const categories = getHomepageData?.categories;
  const recent = getHomepageData?.recent_viewes;
  let coupons = getHomepageData?.coupons;
  const contact_us = contact_details;
  const contact_number = contact_number_data;
  let cartDetails = {
    couponDiscount: 0,
    cod_price: 0,
  };

  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={GA_TRACKING_ID} />
      <Script
        id="bookyourgiftSchema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(byg_schema(), null, "\t"),
        }}
      />
      <Script
        id="bookyourgiftSocialSchema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(byg_social_schema(), null, "\t"),
        }}
      />
      <body>
        <Providers
          data={{
            coupons,
            categories,
            cartList,
            contact_us,
            contact_number,
            cartDetails,
            recent,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
