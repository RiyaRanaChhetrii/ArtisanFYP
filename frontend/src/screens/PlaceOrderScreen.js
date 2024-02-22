import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import MessageOne from "../components/MessageOne";
import { createOrder } from "../action/orderAction";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch() //Redux hooks for dispatching action 
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart);

   // Function to round and fix decimals for price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // Calculating prices based on items in the cart
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  // Redux state for order creation
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  // Navigate to the order detail page after successful ordered
  useEffect(() => {
    if(success) {
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
    
  }, [navigate, success, order])

  // handler to place the order
  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    }))
  };

  return (
    <>
      {/* Component for rendering checkout steps */}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {/* Order details layout */}
              <h2><b>Shipping</b></h2>
              <p>
                <strong><b>Address:</b> </strong>
                {/* Accessing address, city, postal Code and country property of shippingAddress object*/}
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country},
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2><b>Payment Method</b></h2>
              <strong><b>Method:</b> </strong>
              {/* Displaying payment method */}
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2><b>Order Items</b></h2>
              {/* When cart is empty it display message cart is empty */}
              {cart.cartItems.length === 0 ? (
                <MessageOne>Your cart is empty</MessageOne>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        {/* display cart */}
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
                {/* order Summary */}
                <h2><b>Order Summary</b></h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="mb-3">
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <MessageOne variant='danger'>{error}</MessageOne>}
              </ListGroup.Item>

              <ListGroup.Item className="text-center">
                {/* Place order button */}
                <Button
                  type="button"
                  className="btn-block button-rad"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
