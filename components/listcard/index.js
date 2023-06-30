import { Link } from "next/link";
import SingleSlider from "../singleSlider";
import rs_black from "../../public/assets/img/rs_black.png";

const ListCard = ({ title, price, oldPrice, discount, data, cart }) => {
  return (
    <div className="product-style-7 mt-30">
      <div className="product-image">
        <div className="product-active">
          <SingleSlider path={data} />
        </div>
      </div>
      <div className="product-content">
        <h4 className="title">
          <Link to="/product-details">{title}</Link>
        </h4>
        <p>
          <span className="price">
            {" "}
            <Image src={rs_red} alt={"rs"} height={12} width={12} /> {price}
          </span>
          {/* {oldPrice && ( */}
          <span className="price-cut">
            {" "}
            <Image src={rs_red} alt={"rs"} height={12} width={12} />{" "}
            {oldPrice || "200"}
          </span>
          {/* )
                    } */}
          {/* {
                        discount && ( */}
          <span className="price-discount">
            {" "}
            (Discount {discount || "18%"})
          </span>
          {/* )
                    } */}
        </p>
        {cart && <button class="main-btn primary-btn">Add to cart</button>}
      </div>
    </div>
  );
};

export default ListCard;
