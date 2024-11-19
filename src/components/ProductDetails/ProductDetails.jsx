import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import ProductRating from "../ProductReviews/ProductRating";
import PriceComponent from "./PriceComponent/PriceComponent";
import Counter from "./Counter/Counter";
import ImageCarousel from "./ImageCarousel/ImageCarousel";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [discountedPrice, setDiscountedPrice] = useState(selectedProduct.price);
  const [price, setPrice] = useState(0);
  const [selectedItemSize, setSelectedItemSize] = useState(0);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component loads
    setPrice(selectedItemSize ? selectedItemSize.price : selectedProduct.price);
    let calcDiscountedPrice = price - price * (selectedProduct.discount / 100);
    setDiscountedPrice(calcDiscountedPrice);
  }, [selectedProduct]);

  const handleSizeSelection = (item) => {
    const newPrice = item.price; // Set price based on the clicked item
    const newDiscountedPrice =
      newPrice - newPrice * (selectedProduct.discount / 100); // Calculate discounted price

    // Update state for both price and selected size
    setPrice(newPrice);
    setDiscountedPrice(newDiscountedPrice);
    setSelectedItemSize(item); // Track the selected item
  };

  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="selected-image-container">
              <ImageCarousel images={selectedProduct?.image} />
            </div>
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.title}</h2>
            <div className="rate">
              <ProductRating rating={selectedProduct?.rating} />
              <span>{selectedProduct?.rating} ratings</span>
            </div>
            <div className="info">
              <div className="price-section">
                {/* Original Price (slashed price above) */}
                <span className=" original-price">${price.toFixed(2)}</span>

                {/* Discounted Price (displayed below original price) */}
                <span className="  discounted-price">
                  ${discountedPrice.toFixed(2)}
                </span>
              </div>
              <span className="discount-info">
                Save {selectedProduct.discount}%!
              </span>
            </div>
            <p>{selectedProduct?.description}</p>
            {/* <p><span>Category: {selectedProduct?.category}</span></p> */}
            <div className="price-container">
              <p>
                <span> Sizes: </span>{" "}
              </p>
              {selectedProduct?.sizes.map((item, index) => (
                <PriceComponent
                  key={index}
                  item={item}
                  isSelected={price === item.price}
                  onClick={() => handleSizeSelection(item)}
                />
              ))}
            </div>
            <div className="counter">
              <Counter count={quantity} setCount={setQuantity} />
            </div>
            <div className="button-container">
              <button
                aria-label="Add"
                type="submit"
                className="add"
                onClick={() => handelAdd(selectedProduct, quantity)}
              >
                Add To Cart
              </button>
              <button
                aria-label="Add"
                type="submit"
                className="add"
                onClick={() => handelAdd(selectedProduct, quantity)}
              >
                Buy Now
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
