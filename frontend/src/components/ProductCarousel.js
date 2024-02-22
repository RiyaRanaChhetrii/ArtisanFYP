import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import MessageOne from "./MessageOne";
import { listTopProducts } from "../action/productAction";

// Functional component for a carousel displaying top-rated products
const ProductCarousel = () => {
  const dispatch = useDispatch();

  // Get top-rated products from redux store
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  // Dispatch action to get top-rated products when component mount
  useEffect(() => {
    dispatch(listTopProducts()); 
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <MessageOne variant='danger'>{error}</MessageOne>
  ) : (
    // Display a Carousel component with top-rated products
    <Carousel pause='hover' className='bg' style={{ backgroundColor: "rgba(10, 10, 35, 0.5)" }}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className="d-block">
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
