import React, { Suspense } from "react";
import { getProductDetail } from "@apis/get";
import ProductDetailWrapper from "./ProductDetailWrapper";
import LoadingServerData from "@components/loader/LoadingServerData";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";
export async function generateMetadata({ params }) {
  let cookie =
    cookies().get("Device_id")?.value || headers().get("Device_id") || uuidv4();

  let token = cookies().get("byg_tk")?.value;
  const data = await getProductDetail({ id: params?.id }, token, cookie);

  return {
    title: "BookYourGift | " + data?.product?.name || "",
    description: data?.product?.description || "",
    applicationName: "BookYourGift",
    // referrer: "origin-when-cross-origin",
    keywords: data?.product?.name || "",
    openGraph: {
      title: data?.product?.name || "",
      description: data?.product?.description || "",
      url: data?.product?.name
        ? `https://www.bookyourgift.in/product-details/${
            data?.product?.id
          }/${data?.product?.name
            ?.toLowerCase()
            ?.replace(/[^a-zA-Z0-9]/g, " ")
            ?.replaceAll(" ", "-")}
        `
        : "",
      images: [
        {
          url: data?.product?.images?.[0]?.name || "",
          alt: data?.product?.images?.[0]?.name || "",
          title: data?.product?.name || "",
        },
      ],
    },
    icons: {
      icon: data?.product?.images?.[0]?.name || "",
    },
    twitter: {
      title: data?.product?.name || "",
      siteId: data?.product?.name || "",
      description: data?.product?.description || "",

      images: [data?.product?.images?.[0]?.name],
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    alternates: {
      canonical: `https://www.bookyourgift.in/product-details/${
        data?.product?.id
      }/${data?.product?.name
        ?.toLowerCase()
        ?.replace(/[^a-zA-Z0-9]/g, " ")
        ?.replaceAll(" ", "-")}
        `,
    },
  };
}

async function ProductDetails({ params, searchParams }) {
  let cookie =
    cookies().get("Device_id")?.value || headers().get("Device_id") || uuidv4();
  console.log("cookie in product detail: ", cookie);

  let token = cookies().get("byg_tk")?.value;

  const data = await getProductDetail({ id: params?.id }, token, cookie);
  console.log("data in product details: ", data);

  function makeProductDetailsSchema() {
    const productInfo = data?.product;
    return {
      brand: {
        "@type": "Brand",
        name: "Book Your Gift",
      },
      offers: {
        "@type": "Offer",
        url: `https://www.bookyourgift.in/product-details/${
          productInfo?.id
        }/${productInfo?.name
          ?.toLowerCase()
          ?.replace(/[^a-zA-Z0-9]/g, " ")
          .replaceAll(" ", "-")}`,
        priceCurrency: "INR",
        price: `${productInfo?.discountedPrice}`,
        availability: "InStock",
      },
    };
  }
  function makeProductDetailsSchema2() {
    const productInfo = data?.product;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.bookyourgift.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${productInfo?.name}`,
          item: `https://www.bookyourgift.in/product-details/${
            productInfo?.id
          }/${productInfo?.name
            ?.toLowerCase()
            ?.replace(/[^a-zA-Z0-9]/g, " ")
            .replaceAll(" ", "-")}`,
        },
      ],
    };
  }

  return (
    <Suspense fallback={<LoadingServerData />}>
      {data?.product && (
        <Script
          key="schema-jsonld1"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(makeProductDetailsSchema(), null, "\t"),
          }}
        />
      )}
      {data?.product && (
        <Script
          key="schema-jsonld2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(makeProductDetailsSchema2(), null, "\t"),
          }}
        />
      )}
      <ProductDetailWrapper
        data={data?.product}
        id={params?.id}
        name={params?.name}
      />
    </Suspense>
  );
}
export default ProductDetails;
