import Loader from "@components/loader";
import React, { Suspense } from "react";
import ProductListWrapper from "@/app/[category_name]/ProductListWrapper";
import { getHomeSearchedProducts } from "@apis/get";
import { cookies, headers } from "next/headers";
async function SearchPage({ params, searchParams }) {
  let cookie = cookies().get("Device_id")?.value || headers().get("Device_id");

  let token = cookies().get("byg_tk")?.value;
  const productListing = await getHomeSearchedProducts(
    {
      page: searchParams?.p ? searchParams?.p : 1,
      search: params?.search ? params?.search : "",
    },
    token,
    cookie
  );
  return (
    <Suspense fallback={<Loader />}>
      <ProductListWrapper data={productListing} search={params?.search} />
    </Suspense>
  );
}

export default SearchPage;
