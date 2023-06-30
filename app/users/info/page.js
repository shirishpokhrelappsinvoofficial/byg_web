"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditInfoModal from "@/components/editinfomodal";
import { getOrders, getUser, user } from "@/redux/store/userSlice";

function UserInfo(props) {
  const userdetails = useSelector(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div class="user-right">
      <div class="user-info-box">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 mb-3">
            <div class="edit-info-btn">
              {userdetails && <EditInfoModal details={userdetails} />}
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
            <div class="user-img">
              <img
                alt=""
                src={
                  userdetails && (userdetails.image || "assets/img/employe.png")
                }
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-8 col-lg-9 mb-3">
            <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">First Name</p>
                <h5 class="text-capitalize">
                  {userdetails && userdetails.first_name}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Last Name</p>
                <h5 class="text-capitalize">
                  {userdetails && userdetails.last_name}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Email Id</p>
                <h5 class="text-capitalize">
                  {userdetails && userdetails.email}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Mobile No.</p>
                <h5 class="text-capitalize">
                  {userdetails && userdetails.mobile_number}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Alternate Mobile No.</p>
                <h5 class="text-capitalize">
                  {userdetails && (userdetails.altername || "N/A")}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Address</p>
                <h5 class="text-capitalize">
                  {userdetails &&
                    userdetails.address &&
                    (userdetails?.address?.address || "N/A")}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">City</p>
                <h5 class="text-capitalize">
                  {userdetails &&
                    userdetails.address &&
                    (userdetails?.address?.city || "N/A")}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Zip Code</p>
                {/* <h5>110019</h5> */}
                <h5>
                  {userdetails &&
                    userdetails.address &&
                    (userdetails?.address?.zipcode || "N/A")}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Region/State</p>
                <h5 class="text-capitalize">
                  {userdetails &&
                    userdetails.address &&
                    (userdetails?.address?.state?.state || "N/A")}
                </h5>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Country</p>
                <h5 class="text-capitalize">
                  {userdetails &&
                    userdetails.address &&
                    (userdetails?.address?.country || "N/A")}
                </h5>
              </div>
              {/* <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                                <p class="text-capitalize">Wallet Amount</p>
                                <h5 class="text-capitalize">{userdetails && (userdetails.wallet || 'N/A')}</h5>

                            </div> */}
              <div class="col-sm-6 col-md-6 col-lg-6 mb-3">
                <p class="text-capitalize">Total Orders</p>
                <h5 class="text-capitalize">
                  {userdetails && (userdetails.total_order || "N/A")}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
