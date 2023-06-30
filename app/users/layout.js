"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import withAuth from "../../utils/hooks/withAuth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/store/userSlice";
import { updateIsLoggedIn } from "@redux/store/profileModalSlice";

function UserLayout({ children }) {
  const pathname = usePathname();
  const history = useRouter();
  const dispatch = useDispatch();
  return (
    <section class="customer-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 m-0 p-0">
            <div class="d-lg-flex">
              <div class="user-left">
                <ul class="user-list">
                  <li>
                    <Link
                      className={pathname === "/users/info" ? "active" : ""}
                      href="/users/info"
                    >
                      <span>
                        {
                          <img
                            src={
                              pathname === "/users/info"
                                ? "/public/assets/img/myProfileWhite.png"
                                : "/public/assets/img/myProfileRed.png"
                            }
                            alt="profile"
                          />
                        }
                      </span>
                      <span class="text ">my Profile</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/users/orders"
                      className={
                        pathname === "/users/orders" ||
                        pathname?.includes("/users/order-details")
                          ? "active"
                          : ""
                      }
                    >
                      <span>
                        {
                          <img
                            src={
                              pathname === "/users/orders" ||
                              pathname?.includes("/users/order-details")
                                ? "/public/assets/img/myOrderWhite.png"
                                : "/public/assets/img/myOrderRed.png"
                            }
                            alt="profile"
                          />
                        }
                      </span>
                      <span class="text">my order</span>
                    </Link>
                  </li>

                  {/* <li><Link href="set-password" className={pathname === '/users/set-password' ? 'active' : ''}><span></span><span class="text">Set Password</span></Link></li> */}

                  <li>
                    <Link
                      href="/users/my-address-book"
                      className={
                        pathname === "/users/my-address-book" ? "active" : ""
                      }
                    >
                      <span>
                        {
                          <img
                            src={
                              pathname === "/users/my-address-book"
                                ? "/public/assets/img/addressWhite.png"
                                : "/public/assets/img/addressRed.png"
                            }
                            alt="address"
                          />
                        }
                      </span>
                      <span class="text">My Address Book</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/"
                      onClick={() => {
                        (async () => {
                          await localStorage.removeItem("bookyourgift");
                          await localStorage.removeItem("bookyourgift-token");
                        })();
                        dispatch(updateIsLoggedIn(false));
                        dispatch(clearUser());
                      }}
                    >
                      <span className="logout">
                        {/* <img src="/public/assets/img/logout.png" alt="" /> */}
                        {
                          <img
                            src={"/public/assets/img/logoutRed.png"}
                            alt="profile"
                          />
                        }
                      </span>
                      <span className="text">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withAuth(UserLayout);
