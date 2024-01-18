import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import { listProducts } from "../action/productAction";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams()


  //useSelector grave it from the state 
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList; //pull out what we want

  useEffect(() => {
    dispatch(listProducts(keyword)); //Get the products
  }, [dispatch, keyword]);

  //Display
  return (
    <>
      <h1>Lastest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageOne variant='danger'>{error} </MessageOne>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
