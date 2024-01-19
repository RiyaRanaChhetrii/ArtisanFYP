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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { pageNumber } = useParams() || 1;

  //useSelector grave it from the state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList; //pull out what we want

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber)); //Get the products
  }, [dispatch, keyword, pageNumber]);

  //Display
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" variant="dark" className="btn btn-dark">Go back</Link>
      )}
      <h1>Lastest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageOne variant="danger">{error} </MessageOne>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
