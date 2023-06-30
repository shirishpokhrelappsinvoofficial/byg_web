import React, { Suspense } from "react";
import WishListWrapper from "./WishListWrapper";
import { cookies } from "next/headers";
import { fetchWishlist } from "@apis/get";
import Loader from "@/components/loader";
async function WishList() {
  let token = cookies().get("byg_tk");
  let cookie = cookies().get("Device_id")?.value || headers().get("Device_id");
  const wishListdata = await fetchWishlist({}, token, cookie);

  return (
    <Suspense fallback={<Loader />}>
      <WishListWrapper data={wishListdata} />
    </Suspense>
  );
}

export default WishList;
