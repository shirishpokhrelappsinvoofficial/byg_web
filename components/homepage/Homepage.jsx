"use client";
import GridCard from "@/components/gridcard";
import SingleSlider from "@/components/singleSlider";
import { clearList } from "@/redux/store/prouductSlice";
import { updateId } from "@/redux/store/categorySlice";
import Link from "next/link";
import CustomCarousel from "@components/carousel";
import {
  banners,
  categories,
  coupons,
  homepageDatas,
  recent,
  updateHomepageData,
} from "@redux/store/homepageSlice";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import Loader from "@components/loader";
const Homepage = (props) => {
  const dispatch = useDispatch();
  let homeD = useSelector(homepageDatas);
  useEffect(() => {
    if (!homeD && props?.data) dispatch(updateHomepageData(props?.data));
  }, []);

  const couponList = useSelector(coupons) || props?.data?.coupons;
  const banner = useSelector(banners) || props?.data?.banner;
  const category = useSelector(categories) || props?.data?.category;
  const recentViews = useSelector(recent) || props?.data?.recent;

  return (
    <div className="homepage-warpper">
      <section className="header-style-1">
        <div className="header-big homepage">
          <Suspense fallback={<Loader />}>
            {banner && (
              <div className="webView">
                <SingleSlider
                  height="calc(100vh - 70px)"
                  dots={true}
                  page="homepage"
                  path={banner?.map((data) => {
                    return {
                      name: data.web_images[0].name,
                    };
                  })}
                />
              </div>
            )}
            {banner && (
              <div className="tabletView">
                <SingleSlider
                  height="calc(100vh - 70px)"
                  dots={true}
                  page="homepage"
                  path={banner?.map((data) => {
                    return {
                      name: data.ipad_image[0].name,
                    };
                  })}
                />
              </div>
            )}
            {banner && (
              <div className="mobileView">
                <SingleSlider
                  height="calc(100vh - 70px)"
                  dots={true}
                  page="homepage"
                  path={banner?.map((data) => {
                    return {
                      name: data.mobile_image[0].name,
                    };
                  })}
                />
              </div>
            )}
          </Suspense>
        </div>
      </section>

      {couponList?.length > 0 && (
        <section className="sec-bg product-wrapper pt-20 pb-70">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="mb-10 text-center">
                  <h1 className="heading-1 font-weight-700">
                    Deal of the day{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <CustomCarousel list={couponList} />
            </div>
          </div>
        </section>
      )}
      {category &&
        category?.length > 0 &&
        category?.map((data) => {
          return (
            <section
              key={data.id}
              className="sec-bg product-wrapper pt-20 pb-70"
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="mb-10">
                      <h1 className="heading-1 font-weight-700">
                        BestSeller {data.name}
                      </h1>
                    </div>
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="view-ntb mb-10">
                      <Link
                        className="view-all"
                        href={`/${data.name
                          .toLowerCase()
                          .replaceAll(/\s/g, "-")}`}
                        prefetch={false}
                        onClick={() => {
                          dispatch(clearList([]));
                          (async () => {
                            await localStorage.setItem("category", data?.id);
                            await localStorage.setItem("sub_category_id", "");
                          })();
                          dispatch(updateId({ s_id: "", id: data?.id }));
                        }}
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {data?.products?.length > 0 &&
                    data?.products?.map((elem) => {
                      return (
                        <div
                          key={elem.id}
                          className="col-6 col-lg-3 col-md-4 col-sm-6 col-xl-3 removePaddingInCard"
                        >
                          <GridCard
                            title={elem.name}
                            price={elem.price}
                            discountPrice={elem.discountedPrice}
                            data={elem.images}
                            cart={elem.addedToCart}
                            unit={elem.unit}
                            wishlist={elem.addedToWishlist}
                            // badge={true}
                            id={elem.id}
                            select={elem.select}
                            text={elem.text}
                            quantity={elem.quantity}
                            description={elem.description}
                            // onClick={handleCartClick}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          );
        })}

      {recentViews?.length > 0 && (
        <section className="sec-bg product-wrapper pt-20 pb-70">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="mb-10 text-center">
                  <h3 className="heading-1 font-weight-700">
                    Recently Viewed Products
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              {recentViews &&
                recentViews?.length > 0 &&
                recentViews?.map((elem) => {
                  return (
                    <div
                      key={elem.id}
                      className="col-6 col-lg-3 col-md-4 col-sm-6 col-xl-3 mb-5"
                    >
                      <GridCard
                        title={elem.name}
                        price={elem.price}
                        discountPrice={elem.discountedPrice}
                        data={elem.images}
                        cart={elem.addedToCart}
                        unit={elem.unit}
                        // badge={true}
                        select={elem.select}
                        text={elem.text}
                        id={elem.id}
                        quantity={elem.quantity}
                        description={elem.description}
                        // onClick={handleCartClick}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Homepage;
