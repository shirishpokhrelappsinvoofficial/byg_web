import { updateId } from "@redux/store/categorySlice";
import { clearList } from "@redux/store/prouductSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

function HeaderCategoryItem({ data, setActivesidebar }) {
  const dispatch = useDispatch();
  return (
    <li className="position-static menu-item-has-children px-3">
      <Link
        prefetch={true}
        href={{
          pathname: `/${data?.name?.toLowerCase()?.replaceAll(/\s/g, "-")}`,
          // query: { cat_id: data?.id },
        }}
        as={`/${data?.name?.toLowerCase()?.replaceAll(/\s/g, "-")}`}
        onClick={() => {
          Cookies.set("cat_i", data?.id);
        }}
        className="d-flex flex-column align-items-center cursor-pointer"
      >
        <label
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgb(237 225 225)",
            cursor: "pointer",
          }}
        >
          <div
            className="position-relative"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          >
            <Image
              // className="object-fit-cover"
              src={data?.image}
              alt={data?.name}
              title={data?.name}
              fill={true}
              priority={true}
              onClick={() => {
                let cat = Cookies.get("category");
                if (data?.id?.toString() !== cat?.toString()) {
                  dispatch(clearList([]));
                  // dispatch(setPage(1));
                }
                setActivesidebar(false);
                (async () => {
                  await localStorage.setItem("category", data?.id);

                  Cookies.set("category", data?.id);
                })();
                dispatch(updateId({ s_id: "", id: data?.id }));
              }}
            />
          </div>
        </label>

        {data.name}
      </Link>
    </li>
  );
}

export default HeaderCategoryItem;
