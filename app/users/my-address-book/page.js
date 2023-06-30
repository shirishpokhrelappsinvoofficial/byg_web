"use client";
import AddressCard from "@/components/addresscard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressList, AddressList } from "@/redux/store/addressSlice";
import AddAddressModal from "@/components/addAddressModal";

const MyAddressBook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AddressList());
  }, [dispatch]);

  const arr = useSelector(addressList);
  return (
    <div class="user-right">
      <div className="text-right">
        <AddAddressModal />
      </div>
      <div class="row mt-5">
        {arr &&
          arr.map((data) => {
            return (
              <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <AddressCard
                  name={data.first_name + data.last_name}
                  address={data.address}
                  email={data.email}
                  mobile={data.mobile_number}
                  place={data.resident_type}
                  id={data.id}
                  country={data?.country}
                  city={data?.city}
                  state={data?.state}
                  zipcode={data?.zipcode}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyAddressBook;
