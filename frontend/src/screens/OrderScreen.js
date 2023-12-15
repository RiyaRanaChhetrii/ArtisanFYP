import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import MessageOne from "../components/MessageOne";
import { getOrderDetails, payOrder } from "../action/orderAction";
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import {PayPalButton} from "react-paypal-button-v2";

const OrderScreen = () => {
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading:loadingPay, sucess:successPay} = orderPay;

  if (!loading) {
    // Calculates total price of items in shopping cart by multiplying price of each item by its quantity and summing values
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if(!order || successPay) {
      dispatch({type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(id));
    } else if(!order.isPaid) {
      if(!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }

  }, [dispatch, id, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(id, paymentResult))

  }

  return loading ? (
    <Loader />
  ) : error ? (
    <MessageOne variant="danger">{error}</MessageOne>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {/* Accessing address, city, postal Code and country property of shippingAddress object*/}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country},
              </p>

              {order.isDelivered ? (
                <MessageOne variant="success">
                  Delivered on {order.deliveredAt}
                </MessageOne>
              ) : (
                <MessageOne variant="danger">Not Delivered</MessageOne>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {/* Displaying payment method */}
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageOne variant="success">
                  Paid on {order.paidAt}
                </MessageOne>
              ) : (
                <MessageOne variant="danger">Not Paid</MessageOne>
              )}
              
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* When order is empty it display message order is empty */}
              {order.orderItems.length === 0 ? (
                <MessageOne>Order is empty</MessageOne>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loading && <Loader />}
                  {!sdkReady ? <Loader /> :(
                    <PayPalButton amount={order.totalPrice} onSuccess=
                    {successPaymentHandler}/>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
