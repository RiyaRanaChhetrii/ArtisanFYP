import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../action/productAction";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

// Functional component for the home screen
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams(); // Extracting the 'keyword' parameter from the URL

  const { pageNumber } = useParams() || 1; // Extracting the 'pageNumber' parameter or defaulting to 1

  // useSelector retrieves data from the Redux store
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList; // Destructure data from productList

  useEffect(() => {
    // Dispatching the action to get the products when the component mounts or 'keyword' or 'pageNumber' changes
    dispatch(listProducts(keyword, pageNumber)); //Get the products
  }, [dispatch, keyword, pageNumber]);

  //Display
  return (
    <>
      {!keyword ? (
        // Display a carousel if there is no 'keyword'
        <ProductCarousel /> 
      ) : (
        <Link to="/" variant="dark" className="btn btn-dark button-rad">Go back</Link>
      )}
      <h1>Lastest Products</h1>
      {loading ? (
        <Loader /> // Display a loader while products are being fetched
      ) : error ? (
        <MessageOne variant="danger">{error} </MessageOne>
      ) : (
        <>
          <Row>
          {/* using the map function to iterate over the products array. */}
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} /> {/* Render individual Product components for each product */}
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""} //   Render pagination component based on total pages and current page 
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
