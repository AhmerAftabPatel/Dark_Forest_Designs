import { Link } from "react-router-dom";

const DiscountBanner = () => (
  <div className="discount-section">
    <div className="discount">
      <div className="discount__overlay"></div>
      <div className="discount__content container-div">
        <h2>Latest & Hand Crafted</h2>

        <Link to="/shop">
          <button className="button">Shop Now</button>
        </Link>
      </div>
    </div>
  </div>
);

export default DiscountBanner;
