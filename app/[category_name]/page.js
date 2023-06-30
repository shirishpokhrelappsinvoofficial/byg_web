import React, { Suspense } from "react";
import { getCategory, getProduct } from "@apis/get";
import ProductListWrapper from "./ProductListWrapper";
import LoadingServerData from "@components/loader/LoadingServerData";
import { metaTagsObject } from "@services/helper";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";

export async function generateMetadata({ params }) {
  let metaObject = metaTagsObject?.find((it, i) => {
    return it?.path?.includes(params?.category_name);
  });

  return {
    // metadataBase: new URL("https://www.bookyourgift.in"),
    title: metaObject?.title || "",
    description: metaObject?.description || "",
    alternates: {
      canonical: metaObject?.link_url?.href || "",
      // languages: {
      //   "en-US": "/en-US",
      //   "de-DE": "/de-DE",
      // },
    },
    // generator: "Next.js",
    applicationName: "BookYourGift",
    // referrer: "origin-when-cross-origin",
    keywords:
      metaObject?.meta
        ?.find((it) => it?.name === "keywords")
        ?.content?.split(", ") || "",
    // authors: [{ name: "Seb" }, { name: "Josh", url: "https://nextjs.org" }],
    // colorScheme: "dark",
    // creator: "Jiachi Liu",
    // publisher: "Sebastian Markbåge",
    // formatDetection: {
    //   email: false,
    //   address: false,
    //   telephone: false,
    // },
    openGraph: {
      title: metaObject?.title || "",
      description:
        metaObject?.meta?.find((it) => it?.property === "og:description")
          ?.content || "",
      url:
        metaObject?.meta?.find((it) => it?.property === "og:url")?.content ||
        "",
      // type: "article",
      // publishedTime: "2023-01-01T00:00:00.000Z",
      // authors: ["Seb", "Josh"],
      images: [
        {
          url:
            metaObject?.meta?.find((it) => it?.property === "og:image")
              ?.content || "",
          // width: 800,
          // height: 600,
          alt:
            metaObject?.meta?.find((it) => it?.property === "og:image:alt")
              ?.content || "",
          title:
            metaObject?.meta?.find((it) => it?.property === "og:image:title")
              ?.content || "",
        },
      ],
      // locale: "en-US",
      // type: "website",
    },
    icons: {
      icon:
        metaObject?.meta?.find((it) => it?.property === "og:image")?.content ||
        "",
      // shortcut: "/shortcut-icon.png",
      // apple: "/apple-icon.png",
      // other: {
      //   rel: "apple-touch-icon-precomposed",
      //   url: "/apple-touch-icon-precomposed.png",
      // },
    },
    twitter: {
      // card: "summary_large_image",
      title:
        metaObject?.meta?.find((it) => it?.property === "twitter:title")
          ?.content || "",
      siteId:
        metaObject?.meta?.find((it) => it?.property === "twitter:site")
          ?.content || "",
      description:
        metaObject?.meta?.find((it) => it?.property === "og:description")
          ?.content || "",
      // siteId: "1467726470533754880",
      // creator: "@nextjs",
      // creatorId: "1467726470533754880",
      images: [
        metaObject?.meta?.find((it) => it?.property === "og:image")?.content ||
          "",
      ],
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    // robots: {
    //   index: true,
    //   follow: true,
    //   // nocache: true,
    //   googleBot: {
    //     index: true,
    //     follow: true,
    //     // noimageindex: true,
    //     // "max-video-preview": -1,
    //     // "max-image-preview": "large",
    //     // "max-snippet": -1,
    //   },
    // },
  };
}

async function ProductList(props) {
  console.log(props, "Props in category page");
  let cookie =
    cookies().get("Device_id")?.value || headers().get("Device_id") || uuidv4();
  let token = cookies().get("byg_tk");

  const decodedURL = props.params?.category_name
    ?.replaceAll("-", " ")
    ?.toLowerCase();

  let page = props?.searchParams?.p;
  let search = props?.searchParams?.search;

  const categoriesList = await getCategory({ page: 1 }, token, cookie);

  let id = categoriesList?.find((item, i) => {
    return item?.name?.toLowerCase() === decodedURL;
  });

  const productListing = await getProduct(
    {
      page: page ? page : 1,
      limit: 10,
      search: search ? search : "",
      category_id: id?.id ? id?.id : "",
    },
    token,
    cookie
  );

  function makeCategorySchema() {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: { "@id": "https://www.bookyourgift.in/", name: "Home" },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": `https://www.bookyourgift.in/${props.params?.category_name
              ?.replaceAll(" ", "-")
              ?.toLowerCase()}`,
            name: `${id?.name}`,
          },
        },
      ],
    };
  }

  return (
    <>
      {props.params?.category_name && (
        <Script
          key="schema-jsonld21"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(makeCategorySchema(), null, "\t"),
          }}
        />
      )}

      <ProductListWrapper data={productListing} id={id?.id ? id?.id : ""} />
    </>
  );
}

export default ProductList;
