import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import ProductRating from "../ProductReviews/ProductRating";
import "./product-card.css";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleNavigate = () => {
    router(`/shop/${productItem._id}`);
  };

  const handleAddToCart = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Added to cart!");
  };

  return (
    <Col md={3} sm={5} xs={10} className="product-card">
      {title === "Big Discount" && (
        <span className="product-discount">{productItem.discount}% Off</span>
      )}
      <div className="product-image" onClick={handleNavigate}>
        <img
          loading="lazy"
          src={productItem.image[0]}
          alt={productItem.title}
        />
        <div className="product-like">
          <ion-icon name="heart-outline"></ion-icon>
        </div>
      </div>
      <div className="product-details">
        <h3 className="product-title" onClick={handleNavigate}>
          {productItem.title}
        </h3>
        <ProductRating rating={productItem.rating} />
        <div className="product-price">
          <h4>${productItem.price}</h4>
          <button
            aria-label="Add"
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
