import { getData } from "@apis";
import { getProduct } from "@apis/get";
import { cookies, headers } from "next/headers";

export default async function sitemap() {
  let links = [];
  let categoryList = [];
  const URL = "https://www.bookyourgift.in";

  // List of posts
  let token = cookies().get("byg_tk")?.value;
  let cookie =
    cookies().get("Device_id")?.value || headers().get("Device_id") || uuidv4();

  const getCategories = await getData("category", {}, token, cookie);
  const allProductDetails = await getData("product", {}, token, cookie);

  const fields =
    getCategories?.data?.categories?.map((item) => {
      let catLink = `${URL}/${item.name
        ?.toLowerCase()
        ?.replaceAll(" ", "-")
        ?.replaceAll("/", "-")}`;

      return {
        url: catLink,
        lastModified: item?.updatedAt || new Date().toISOString(),
      };
    }) ?? [];

  const productsList =
    allProductDetails?.data?.products?.map((prod) => {
      let prodLink = `${URL}/product-details/${prod?.id}/${prod?.name
        ?.toLowerCase()
        ?.replace(/[^a-zA-Z ]/g, "")
        ?.replaceAll(" ", "-")}`;

      return {
        url: prodLink,
        lastModified: prod?.updatedAt || new Date().toISOString(),
      };
    }) ?? [];

  console.log(productsList, "Product list in sitemap");

  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    ...fields,
    ...productsList,
  ];
}
