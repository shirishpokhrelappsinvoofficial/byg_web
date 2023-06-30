import { useDispatch } from "react-redux";
import { DeleteAddress } from "@/redux/store/addressSlice";
import EditAddressModal from "../editAddressModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DelIcon from "../../public/assets/img/delete.png";
import Image from "next/image";
const AddressCard = ({
  name,
  address,
  email,
  mobile,
  place,
  id,
  city,
  state,
  country,
  zipcode,
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleDelete = () => {
    dispatch(DeleteAddress({ id }));
  };
  return (
    <div class="bg-white shadow p-2">
      <h6 class="text-capitalize">name: {name}</h6>
      <p>Address:</p>
      <p>{`${address}, ${city}, ${state}, ${country}, ${zipcode}`}</p>
      <p>Email : {email}</p>
      <p>Mobile : {mobile}</p>
      <p>Place : {place}</p>
      <p class="btn-remove-edit">
        <Link href={pathname} onClick={handleDelete}>
          <Image src={DelIcon} alt="delete" height={20} width={20} /> Remove
        </Link>
        <EditAddressModal id={id} />
      </p>
    </div>
  );
};

export default AddressCard;
