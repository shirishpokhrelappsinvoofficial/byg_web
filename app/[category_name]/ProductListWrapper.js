"use client";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useRouter } from "next/navigation";
import GridCard from "@components/gridcard";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  product,
  saveFilters,
  totalProduct,
} from "@redux/store/prouductSlice";
import { deviceId } from "@services/httphandler";
import Error from "./error";

function ProductListWrapper(props) {
  let category_id = props.id;
  const router = useRouter();
  const dispatch = useDispatch();
  const totals = useSelector(totalProduct);
  const total = totals || props?.data?.total;
  const productListings = useSelector(product);
  const page = useSelector((state) => state.product.page);
  let listing = productListings || props?.data?.data;

  const [filters, setfilters] = useState({
    page: page ? page : 1,
    limit: 12,
    search: props.search,
  });

  useEffect(() => {
    dispatch(
      saveFilters({
        ...filters,
        page: page,
        search: props?.search ? props?.search : "",
        device_id: deviceId,
        category_id: props?.search ? "" : props.id,
      })
    );
  }, [dispatch, props.id]);

  useEffect(() => {
    setfilters({
      ...filters,
      page: page,
      search: props?.search ? props?.search : "",
    });
  }, [category_id]);

  useEffect(() => {
    dispatch(
      getProduct({
        ...filters,
        search: props?.search ? props?.search : "",
        category_id: props?.search ? "" : category_id,
      })
    );
  }, [dispatch, filters, category_id, props.search]);

  const handlePageChange = (pageNumber) => {
    setfilters({
      ...filters,
      page: pageNumber,
      search: props?.search ? props?.search : "",
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <section
      className="category-wrapper pt-10"
      style={{ minHeight: "calc(100vh - 543px)" }}
    >
      <div className="container-fluid">
        <div className="row">
          {!category_id && !props.search ? (
            <Error
              error="Unfortunately, the page you are looking for has been relocated or deleted."
              reset={() => {
                router.push("/");
              }}
            />
          ) : (
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumbs-style breadcrumbs-style-1 d-md-flex justify-content-between align-items-center">
                    <div className="breadcrumb-left">
                      <p className="text-capitalize">
                        Product ({total && total} Results)
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    {listing && listing?.length > 0 ? (
                      listing?.map((data, i) => {
                        return (
                          <div
                            className="col-6 col-lg-3 col-md-4 col-sm-6 col-xl-3 removePaddingInCard"
                            key={i}
                          >
                            <GridCard
                              title={data.name}
                              price={data.price}
                              discountPrice={data.discountedPrice}
                              data={data.images}
                              cart={data.addedToCart}
                              wishlist={data.addedToWishlist}
                              // badge={true}
                              unit={data.unit}
                              select={data.select}
                              text={data.text}
                              id={data.id}
                              quantity={data.quantity}
                              description={data.description}
                              // onClick={handleCartClick}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-sm-12 vertical-center-20vh">
                        No Data Found
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-12 ">
                  {total && total > filters.limit ? (
                    <div className="">
                      <Pagination
                        activePage={filters.page}
                        itemsCountPerPage={filters.limit}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductListWrapper;
