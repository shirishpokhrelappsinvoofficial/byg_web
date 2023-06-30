import { getCookie } from "@utils";

// import { BrowserFingerprint } from "browser_fingerprint";
const URI = "https://bookyourgift.in";

// const fingerPrinter = new BrowserFingerprint({
//   cookieKey: "__browser_fingerprint",
//   toSetCookie: true,
//   onlyStaticElements: true,
//   settings: {
//     path: "/",
//     expires: 3600000,
//     httpOnly: null,
//   },
// });

export const authHeader = () => {
  let token = localStorage.getItem("bookyourgift-token");
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      Device_id: getCookie("Device_id"),
      // Device_id: fingerPrinter?.savedHashedHostName,
    };
  } else
    return {
      Accept: "application/json",
      Device_id: getCookie("Device_id"),
      // Device_id: fingerPrinter?.savedHashedHostName,
    };
};

export const getPaymentMode = (value) => {
  switch (value) {
    case "CREDIT_CARD":
      return "Credit Card";

    case "NET_BANKING":
      return "Net Banking";

    default:
      return value || "N/A";
  }
};

export const clientPhoneNumber = "+919896620010";
export const clientEmail = "bookyourgift21@gmail.com";
export const baseUrl = URI;
export const metaTagsObject = [
  {
    path: baseUrl + "/quirky-wall-hanging",
    title:
      "BookYourGift : Buy Quirky Wall Hanging Online, Quirky Wall Hanging For Living Room at Best Price",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Quirky Wall Hanging Online, Quirky Wall Hanging For Living Room at Best Price",
      },
      {
        name: "description",
        content:
          "BookYourGift is Leading Perfect Items for Quirky Wall Hanging, Buy Quirky Wall Hanging Online, Buy Quirky Wall Hanging Items, Buy Quirky Wall Hanging Product, Best Price Wall Hanging For Living Room, Buy Latest Quirky Wall Hanging, Buy Wall Hangings Home Decor, Quirky Wall Hanging For Living Room.",
      },
      {
        property: "og:description",
        content:
          "BookYourGift is Leading Perfect Items for Quirky Wall Hanging, Buy Quirky Wall Hanging Online, Buy Quirky Wall Hanging Items, Buy Quirky Wall Hanging Product, Best Price Wall Hanging For Living Room, Buy Latest Quirky Wall Hanging, Buy Wall Hangings Home Decor, Quirky Wall Hanging For Living Room.",
      },
      {
        name: "keywords",
        content:
          "Quirky Wall Hanging, Buy Quirky Wall Hanging Online, Buy Quirky Wall Hanging Items, Buy Quirky Wall Hanging Product, Best Price Wall Hanging For Living Room, Buy Latest Quirky Wall Hanging, Buy Wall Hangings Home Decor, Quirky Wall Hanging For Living Room",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/quirky-wall-hanging",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/Q3.jpg",
      },
      {
        property: "og:image:alt",
        content: "BookYourGift : Buy Quirky Wall Hanging Online ",
      },
      {
        property: "og:image:title",
        content: "BookYourGift : Buy Quirky Wall Hanging Online ",
      },
      {
        name: "twitter:title",
        content: "BookYourGift : Buy Quirky Wall Hanging Online",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/quirky-wall-hanging",
    },
    footer: "",
  },

  {
    path: baseUrl + "/6-layer-hanging",
    title:
      "BookYourGift - Buy 6 Layer Wall Hanging Home Decor, Buy 6 Layer Wall Hanging Item for Living Room",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift - Buy 6 Layer Wall Hanging Home Decor, Buy 6 Layer Wall Hanging Item for Living Room",
      },
      {
        name: "description",
        content:
          "BookYourGift is Affordable Price for  6 Layer Wall Hanging for Living Room, Buy 6 Layer Wall Hanging Home Decor, Buy 6 Layer Wall Hanging Online, Buy 6 Layer Wall Hanging Online, Buy 6 Layer Wall Hanging Item, Buy 6 Layer Wall Hanging Product, Buy 6 Layer Hanging.",
      },
      {
        property: "og:description",
        content:
          "BookYourGift is Affordable Price for  6 Layer Wall Hanging for Living Room, Buy 6 Layer Wall Hanging Home Decor, Buy 6 Layer Wall Hanging Online, Buy 6 Layer Wall Hanging Online, Buy 6 Layer Wall Hanging Item, Buy 6 Layer Wall Hanging Product, Buy 6 Layer Hanging.",
      },
      {
        name: "keywords",
        content:
          "Buy 6 Layer Wall Hanging Home Decor, Buy 6 Layer Wall Hanging, Buy 6 Layer Wall Hanging Online, Buy 6 Layer Wall Hanging Online, Buy 6 Layer Wall Hanging Item, Buy 6 Layer Wall Hanging Product, Affordable Price  6 Layer Wall Hanging for Living Room, Buy 6 Layer Hanging",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/6-layer-hanging",
      },
      {
        property: "og:image",
        content:
          "https://bookyour-gift-media.s3.amazonaws.com/BYG_WH_012_1.jpg ",
      },
      {
        property: "og:image:alt",
        content: "BookYourGift - Buy 6 Layer Wall Hanging Home Decor ",
      },
      {
        property: "og:image:title",
        content: "BookYourGift - Buy 6 Layer Wall Hanging Home Decor ",
      },
      {
        name: "twitter:title",
        content: "BookYourGift - Buy 6 Layer Wall Hanging Home Decor",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/6-layer-hanging",
    },
    footer: "",
  },

  {
    path: baseUrl + "/3-layer-hanging",
    title:
      "BookYourGift - Buy 3 Layer Wall Hanging Home Decor, Buy 3 Layer Wall Hanging Item for Living Room",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift - Buy 3 Layer Wall Hanging Home Decor, Buy 3 Layer Wall Hanging Item for Living Room",
      },
      {
        name: "description",
        content:
          "BookYourGift is Affordable Price for 3 Layer Wall Hanging for Living Room, Buy 3 Layer Wall Hanging Home Decor, Buy 3 Layer Wall Hanging Online, Buy 3 Layer Wall Hanging Online, Buy 3 Layer Wall Hanging Item, Buy 3 Layer Wall Hanging Product, Buy 3 Layer Hanging.",
      },
      {
        property: "og:description",
        content:
          "BookYourGift is Affordable Price for 3 Layer Wall Hanging for Living Room, Buy 3 Layer Wall Hanging Home Decor, Buy 3 Layer Wall Hanging Online, Buy 3 Layer Wall Hanging Online, Buy 3 Layer Wall Hanging Item, Buy 3 Layer Wall Hanging Product, Buy 3 Layer Hanging.",
      },
      {
        name: "keywords",
        content:
          "Buy 3 Layer Wall Hanging Home Decor, Buy 3 Layer Wall Hanging, Buy 3 Layer Wall Hanging Online, Buy 3 Layer Wall Hanging Online, Buy 3 Layer Wall Hanging Item, Buy 3 Layer Wall Hanging Product, Affordable Price  3 Layer Wall Hanging for Living Room, Buy 3 Layer Hanging          ",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/3-layer-hanging",
      },
      {
        property: "og:image",
        content:
          "https://bookyour-gift-media.s3.amazonaws.com/BYG_3LH_001_v2.jpg ",
      },
      {
        property: "og:image:alt",
        content: "BookYourGift - Buy 3 Layer Wall Hanging Home Decor ",
      },
      {
        property: "og:image:title",
        content: "BookYourGift - Buy 3 Layer Wall Hanging Home Decor ",
      },
      {
        name: "twitter:title",
        content: "BookYourGift - Buy 3 Layer Wall Hanging Home Decor",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/3-layer-hanging",
    },
    footer: "",
  },

  {
    path: baseUrl + "/wooden-plates",
    title: "BookYourGift : Buy Wooden Plates Online at Best Price in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India",
      },
      {
        name: "description",
        content:
          "Bookyourgift Is Affordable Price For Buy Wooden Plate Online, Wooden Plates, Wooden Plates Online At Discounted Prices, Online Store For Wooden Plates, Shop Online For Wooden Plates, Online Shopping For Wooden Plate, Buy Latest Wooden Plates Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Wooden Plates Items Online In India.",
      },
      {
        property: "og:description",
        content:
          "Bookyourgift Is Affordable Price For Buy Wooden Plate Online, Wooden Plates, Wooden Plates Online At Discounted Prices, Online Store For Wooden Plates, Shop Online For Wooden Plates, Online Shopping For Wooden Plate, Buy Latest Wooden Plates Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Wooden Plates Items Online In India.",
      },
      {
        name: "keywords",
        content:
          "Buy Wooden Plate Online, Wooden Plates, Wooden Plates Online At Discounted Prices, Online Store For Wooden Plates, Shop Online For Wooden Plates, Online Shopping For Wooden Plate, Buy Latest Wooden Plates Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Wooden Plates Items Online In India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/wooden-plates",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/30.jpg ",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India ",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India ",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/wooden-plates",
    },
    footer: "",
  },

  {
    path: baseUrl + "/wooden-plates",
    title: "BookYourGift : Buy Wooden Plates Online at Best Price in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India",
      },
      {
        name: "description",
        content:
          "Bookyourgift Is Affordable Price For Buy Wooden Plate Online, Wooden Plates, Wooden Plates Online At Discounted Prices, Online Store For Wooden Plates, Shop Online For Wooden Plates, Online Shopping For Wooden Plate, Buy Latest Wooden Plates Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Wooden Plates Items Online In India.",
      },
      {
        property: "og:description",
        content:
          "Bookyourgift Is Affordable Price For Buy Wooden Plate Online, Wooden Plates, Wooden Plates Online At Discounted Prices, Online Store For Wooden Plates, Shop Online For Wooden Plates, Online Shopping For Wooden Plate, Buy Latest Wooden Plates Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Wooden Plates Items Online In India.",
      },
      {
        name: "keywords",
        content:
          "Buy Wooden Plate Online, Wooden Plates, Wooden Plates Online At Discounted Prices, Online Store For Wooden Plates, Shop Online For Wooden Plates, Online Shopping For Wooden Plate, Buy Latest Wooden Plates Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Wooden Plates Items Online In India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/wooden-plates",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/30.jpg ",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India ",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India ",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Wooden Plates Online at Best Price in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/wooden-plates",
    },
    footer: "",
  },

  {
    path: baseUrl + "/key-holders",
    title: "BookYourGift : Buy Key Holders Online at Best Prices in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Key Holders Online at Best Prices in India",
      },
      {
        name: "description",
        content:
          "BookYourGift is Leading Top Buy Key Holders For Wall, Unique Key Holder For Wall, Key Holder For Wall, Modern Key Holder For Wall, Buy Key Holder Online In India, Buy Key Holder Online, Buy Keychain Holders Online At Best Prices In India.",
      },
      {
        property: "og:description",
        content:
          "BookYourGift is Leading Top Buy Key Holders For Wall, Unique Key Holder For Wall, Key Holder For Wall, Modern Key Holder For Wall, Buy Key Holder Online In India, Buy Key Holder Online, Buy Keychain Holders Online At Best Prices In India.",
      },
      {
        name: "keywords",
        content:
          "Buy Key Holders For Wall, Unique Key Holder For Wall, Key Holder For Wall, Modern Key Holder For Wall, Buy Key Holder Online In India, Buy Key Holder Online, Buy Keychain Holders Online At Best Prices In India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/key-holders",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/KYC002.2.jpg ",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Key Holders Online at Best Prices in India ",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Key Holders Online at Best Prices in India ",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Key Holders Online at Best Prices in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/key-holders",
    },
    footer: "",
  },

  {
    path: baseUrl + "/coasters-set",
    title: "BookYourGift : Buy Coasters Set Online at Best Price in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Coasters Set Online at Best Price in India",
      },
      {
        name: "description",
        content:
          "Book Your Gift is Affordable Price For Buy Coasters Set Online, Coasters Set, Coasters Set Online At Discounted Prices, Online Store For Coasters Set, Shop Online For Coasters Set, Online Shopping For Wooden Plate, Buy Latest Coasters Set Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Coasters Set Items Online In India.",
      },
      {
        property: "og:description",
        content:
          "Book Your Gift is Affordable Price For Buy Coasters Set Online, Coasters Set, Coasters Set Online At Discounted Prices, Online Store For Coasters Set, Shop Online For Coasters Set, Online Shopping For Wooden Plate, Buy Latest Coasters Set Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Coasters Set Items Online In India.",
      },
      {
        name: "keywords",
        content:
          "Buy Wooden Plate Online, Coasters Set, Coasters Set Online At Discounted Prices, Online Store For Coasters Set, Shop Online For Coasters Set, Online Shopping For Wooden Plate, Buy Latest Coasters Set Products Online In India, Buy Latest Wooden Plate Items Online In Noida, Buy Coasters Set Items Online In India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/coasters-set",
      },
      {
        property: "og:image",
        content:
          "https://bookyour-gift-media.s3.amazonaws.com/%E2%80%9CAll-you-need-is-love-3.jpg ",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Coasters Set Online at Best Price in India ",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Coasters Set Online at Best Price in India ",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Coasters Set Online at Best Price in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/coasters-set",
    },
    footer: "",
  },

  {
    path: baseUrl + "/fridge-magnet",
    title: "BookYourGift : Buy Fridge Magnets Online at Best Price in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Fridge Magnets Online at Best Price in India",
      },
      {
        name: "description",
        content:
          "Book Your Gift Is Best Quality & Affordable Price For Unique Fridge Magnets, Custom Fridge Magnets Online, Fridge Magnets Online, Best Fridge Magnets Online, Fridge Magnets Refrigerator",
      },
      {
        property: "og:description",
        content:
          "Book Your Gift Is Best Quality & Affordable Price For Unique Fridge Magnets, Custom Fridge Magnets Online, Fridge Magnets Online, Best Fridge Magnets Online, Fridge Magnets Refrigerator",
      },
      {
        name: "keywords",
        content:
          "Unique Fridge Magnets, Custom Fridge Magnets Online, Fridge Magnets Online, Fridge Magnets Bookyourgift India, Best Fridge Magnets Online, Fridge Magnets Refrigerator, Buy Fridge Magnets Online At Best Price In India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/fridge-magnet",
      },
      {
        property: "og:image",
        content:
          "https://bookyour-gift-media.s3-ap-south-1.amazonaws.com/ef81c9d1-40a9-4b71-a1da-adaf4a62f40d.jpeg ",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Fridge Magnets Online at Best Price in India ",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Fridge Magnets Online at Best Price in India",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Fridge Magnets Online at Best Price in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/fridge-magnet",
    },
    footer: "",
  },

  {
    path: baseUrl + "/decor-huts",
    title:
      "BookYourGift : Buy Decor Hut Online, Best Wooden Wall Hanging Hut Online at Low Price in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Decor Hut Online, Best Wooden Wall Hanging Hut Online at Low Price in India",
      },
      {
        name: "description",
        content:
          "Bookyourgift is leading of Home Decor and Decorative Accessories Online in India for Best Wooden Wall Hanging Hut Online at Low Price in India, Buy Decor Hut Online, Buy Latest Decor Hut Products Online in Noida, Buy Decor Hut Items Online, Buy Best Decor Hut Online, Buy Decor Hut in India.",
      },
      {
        property: "og:description",
        content:
          "Bookyourgift is leading of Home Decor and Decorative Accessories Online in India for Best Wooden Wall Hanging Hut Online at Low Price in India, Buy Decor Hut Online, Buy Latest Decor Hut Products Online in Noida, Buy Decor Hut Items Online, Buy Best Decor Hut Online, Buy Decor Hut in India.",
      },
      {
        name: "keywords",
        content:
          "Best Wooden Wall Hanging Hut Online at Low Price in India, Buy Decor Hut Online, Buy Latest Decor Hut Products Online in Noida, Buy Decor Hut Items Online, Buy Best Decor Hut Online, Buy Decor Hut in India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/decor-huts",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/19.jpg ",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Decor Hut Online, Best Wooden Wall Hanging Hut Online at Low Price in India ",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Decor Hut Online, Best Wooden Wall Hanging Hut Online at Low Price in India",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Decor Hut Online, Best Wooden Wall Hanging Hut Online at Low Price in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/decor-huts",
    },
    footer: "",
  },

  {
    path: baseUrl + "/decor-combo",
    title:
      "BookYourGift : Buy Decor Combo Online, Best Wooden Décor Combo at Low Price in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Decor Combo Online, Best Wooden Décor Combo at Low Price in India",
      },
      {
        name: "description",
        content:
          "Bookyourgift is leading of Home Decor and Decorative Accessories Online in India for Best Wooden Wall Hanging Hut Online at Low Price in India, Buy Decor Hut Online, Buy Latest Decor Hut Products Online in Noida, Buy Decor Hut Items Online, Buy Best Decor Hut Online, Buy Decor Hut in India.",
      },
      {
        property: "og:description",
        content:
          "Bookyourgift is leading of Home Decor and Decorative Accessories Online in India for Best Wooden Wall Hanging Hut Online at Low Price in India, Buy Decor Hut Online, Buy Latest Decor Hut Products Online in Noida, Buy Decor Hut Items Online, Buy Best Decor Hut Online, Buy Decor Hut in India.",
      },
      {
        name: "keywords",
        content:
          "Best Wooden Wall Hanging Hut Online at Low Price in India, Buy Decor Hut Online, Buy Latest Decor Hut Products Online in Noida, Buy Decor Hut Items Online, Buy Best Decor Hut Online, Buy Decor Hut in India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/decor-combo",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/3.jpg",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Decor Combo Online, Best Wooden Décor Combo at Low Price in India",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Decor Combo Online, Best Wooden Décor Combo at Low Price in India",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Decor Combo Online, Best Wooden Décor Combo at Low Price in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/decor-combo",
    },
    footer: "",
  },

  {
    path: baseUrl + "/beer-glass",
    title:
      "BookYourGift : Buy Beer Glasses and Beer Mugs Online in Best Prices in India",
    meta: [
      {
        property: "og-title",
        content:
          "BookYourGift : Buy Beer Glasses and Beer Mugs Online in Best Prices in India",
      },
      {
        name: "description",
        content:
          "Booksyourgift Is India's Leading Online Store For Beer Glass Choose From A Variety Of Options. Get The Latest Collection Of Beer Glass And Enjoy ✓lowest Prices For Beer Glass, Buy Beer Glasses Online, Buy Beer Mugs Online In India, Buy Beer Glasses And Mugs Online, Buy Unique Beer Mugs, Buy Unique Beer Glasses, Buy Wine Glasses Online, Buy Beer Glasses Online At Best Prices In India.",
      },
      {
        property: "og:description",
        content:
          "Booksyourgift Is India's Leading Online Store For Beer Glass Choose From A Variety Of Options. Get The Latest Collection Of Beer Glass And Enjoy ✓lowest Prices For Beer Glass, Buy Beer Glasses Online, Buy Beer Mugs Online In India, Buy Beer Glasses And Mugs Online, Buy Unique Beer Mugs, Buy Unique Beer Glasses, Buy Wine Glasses Online, Buy Beer Glasses Online At Best Prices In India.",
      },
      {
        name: "keywords",
        content:
          "Beer Glass Choose From A Variety Of Options. Get The Latest Collection Of Beer Glass And Enjoy ✓lowest Prices For Beer Glass, Buy Beer Glasses Online, Buy Beer Mugs Online In India, Buy Beer Glasses And Mugs Online, Buy Unique Beer Mugs, Buy Unique Beer Glasses, Buy Wine Glasses Online, Buy Beer Glasses Online At Best Prices In India",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/beer-glass",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/BYG_BM_028.jpg",
      },
      {
        property: "og:image:alt",
        content:
          "BookYourGift : Buy Beer Glasses and Beer Mugs Online in Best Prices in India",
      },
      {
        property: "og:image:title",
        content:
          "BookYourGift : Buy Beer Glasses and Beer Mugs Online in Best Prices in India",
      },
      {
        name: "twitter:title",
        content:
          "BookYourGift : Buy Beer Glasses and Beer Mugs Online in Best Prices in India",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/beer-glass",
    },
    footer: "",
  },
  {
    path: baseUrl + "/wallet-combo",
    title:
      "Buy Wallets Combo for Men and Women Online @ Upto 50% OFF, Wallets Combo for Men and Women Online in India - BookYourGift",
    meta: [
      {
        property: "og-title",
        content:
          "Buy Wallets Combo for Men and Women Online @ Upto 50% OFF, Wallets Combo for Men and Women Online in India - BookYourGift",
      },
      {
        name: "description",
        content:
          "Book Your Gift is leading for Buy Wallets Combo for Men and Women @ Upto 50% OFF, Buy Wallets Combo for Men Online in India, Buy Wallets Combo For Men online at best prices in India, Buy stylish wallets Combo for men online at best prices in India, Buy Wallets Combo For Women Online at Best Prices In India, Low Price Offer on Wallets Combo for Women, Buy Wallets Combo for Women Online in India, Buy Wallets Combo For Girls online at best prices in India, Buy Wallets Combo For Women Online at Best Prices In India, Buy Latest Wallets Combo For Women Online, Buy Women Wallets Combo Online, Low Price Offer on Wallets Combo for Men, Upto 50% OFF on Wallets Combo for Men and Women Online.",
      },
      {
        property: "og:description",
        content:
          "Book Your Gift is leading for Buy Wallets Combo for Men and Women @ Upto 50% OFF, Buy Wallets Combo for Men Online in India, Buy Wallets Combo For Men online at best prices in India, Buy stylish wallets Combo for men online at best prices in India, Buy Wallets Combo For Women Online at Best Prices In India, Low Price Offer on Wallets Combo for Women, Buy Wallets Combo for Women Online in India, Buy Wallets Combo For Girls online at best prices in India, Buy Wallets Combo For Women Online at Best Prices In India, Buy Latest Wallets Combo For Women Online, Buy Women Wallets Combo Online, Low Price Offer on Wallets Combo for Men, Upto 50% OFF on Wallets Combo for Men and Women Online.",
      },
      {
        name: "keywords",
        content:
          "Men and Women @ Upto 50% OFF, Buy Wallets Combo for Men Online in India, Buy Wallets Combo For Men online at best prices in India, Buy stylish wallets Combo for men online at best prices in India, Buy Wallets Combo For Women Online at Best Prices In India, Low Price Offer on Wallets Combo for Women, Buy Wallets Combo for Women Online in India, Buy Wallets Combo For Girls online at best prices in India, Buy Wallets Combo For Women Online at Best Prices In India, Buy Latest Wallets Combo For Women Online, Buy Women Wallets Combo Online, Low Price Offer on Wallets Combo for Men, Upto 50% OFF on Wallets Combo for Men and Women Online",
      },
      {
        property: "og:url",
        content: "https://www.bookyourgift.in/wallet-combo",
      },
      {
        property: "og:image",
        content: "https://bookyour-gift-media.s3.amazonaws.com/3.jpg",
      },
      {
        property: "og:image:alt",
        content:
          "Buy Wallet Combo for Men and Women Online @ Upto 50% OFF, Wallet Combo for Men and Women Online in India - BookYourGift",
      },
      {
        property: "og:image:title",
        content:
          "Buy Wallet Combo for Men and Women Online @ Upto 50% OFF, Wallets for Men and Women Online in India - BookYourGift",
      },
      {
        name: "twitter:title",
        content:
          "Buy Wallet Combo for Men and Women Online @ Upto 50% OFF, Wallets for Men and Women Online in India - BookYourGift",
      },

      {
        name: "robots",
        content: "index, follow",
      },
      {
        "http-equiv": "robots",
        "Content-Type": "index, follow",
        content: "text/html; charset=utf-8",
      },
      {
        name: "author",
        content: "BookYourGift",
      },
      {
        name: "language",
        content: "English",
      },
      {
        name: "twitter:site",
        content: "@Bookyourgift",
      },
    ],
    link_url: {
      rel: "canonical",
      href: "https://www.bookyourgift.in/wallet-combo",
    },
    footer: "",
  },
];
