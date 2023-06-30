"use client";
import { updateWishList, wishlist } from "@redux/store/cartSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridCard from "@/components/gridcard";

function WishListWrapper({ data }) {
  const dispatch = useDispatch();
  const arr = useSelector(wishlist);
  const list = arr || data.wishlists;
  const total = data.wishlists?.length;

  useEffect(() => {
    if (arr) {
      dispatch(updateWishList(data.wishlists));
    }
  }, []);

  return (
    <section
      className="category-wrapper pt-10"
      style={{ minHeight: "calc(100vh - 543px)" }}
    >
      <div className="container-fluid">
        <div className="row">
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
                  {list && list?.length > 0 ? (
                    list?.map((item, i) => {
                      let data = item?.product;
                      return (
                        <div
                          className="col-6 col-lg-3 col-md-4 col-sm-6 removePaddingInCard"
                          key={i}
                        >
                          <GridCard
                            title={data.name}
                            price={data.price}
                            discountPrice={data.discount_price}
                            data={data.images}
                            cart={data.addedToCart}
                            wishlist={true}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default WishListWrapper;
