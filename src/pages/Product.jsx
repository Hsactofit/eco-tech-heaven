import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import {constants} from "../utils/constants";
const Product = () => {
  const { id } = useParams(); // Get product ID from URL
  const [selectedProduct, setSelectedProduct] = useState(null); // Initialize as null to indicate no product is loaded yet
   const [relatedProducts, setRelatedProducts] = useState([]); // Uncomment when needed

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component loads
    // Fetch product details by product ID
    axios
      .get(constants.GET_PRODUCT+`${id}`)
      .then((response) => {
        setSelectedProduct(response.data.product); // Set the product data in state
      })
      .catch((error) => {
        console.error("Error fetching product:", error); // Handle the error appropriately
      });
  }, [id]); // Run this effect when the `id` changes

  // Fetch related products once when the component mounts
  useEffect(() => {
    // Fetch related products (this API call should only run once)
    axios
      .get(`${constants.GET_RELATED_PRODUCTS_BASE}${id}${constants.GET_RELATED_PRODUCTS_SUFFIX}`) // Assuming the related products API doesn't depend on the current product
      .then((response) => {
        console.log(response);
        setRelatedProducts(response.data.related_products); // Set related products data
      })
      .catch((error) => {
        console.error("Error fetching related products:", error); // Handle errors appropriately
      });
  }, [id]); // Empty dependency array to ensure this runs only once


  // If the product is not yet loaded, show a loading message
  if (!selectedProduct) {
    return <div>Loading...</div>;
  }   
  return (
    <Fragment>
      <Banner title={selectedProduct.title} /> {/* Display product name in banner */}
      <ProductDetails selectedProduct={selectedProduct} /> {/* Pass the product details */}
      {/* <ProductReviews selectedProduct={selectedProduct} /> Pass the product for reviews */}
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
         {/* Related products logic can be added here  */}
         <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
