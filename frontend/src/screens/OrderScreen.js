import React, { useState, useEffect } from "react";
import axios from "axios"; // For making HTTP req
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import MessageOne from "../components/MessageOne";
import { getOrderDetails, payOrder, deliverOrder } from "../action/orderAction";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { PayPalButton } from "react-paypal-button-v2";


// Functional component for Order Screen
const OrderScreen = () => {
  // Extracting order ID from URL params
  const { id } = useParams();

  // State variables using React hooks
  const [sdkReady, setSdkReady] = useState(false);

  // Redux hooks for state management
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // To get orderdetails from Redux store using useSelector
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // To get orderPay from Redux store using useSelector
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const [khaltiLoading, setKhaltiLoading] = useState(false);

  // To get orderDeliver from Redux store using useSelector
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  // To get userLogin from Redux store using useSelector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    // Redirect to login if user is not logged in
    if (!userInfo) {
      navigate("/login");
    }

    // Function to add PayPal SDK script dynamically
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
    
      // Creating and appending PayPal SDK script to the document
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // Fetch order details when component status change
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET }); // Resetting order payment in the redux store
      dispatch({ type: ORDER_DELIVER_RESET }); // Resetting delivery status in the Redux store
      
      // Fetching updated order details
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      // Add PayPal script if it's not already loaded
      if (!window.paypal) {
        addPayPalScript();
      } else {
        // Set SDK ready state to true if script is already loaded
        setSdkReady(true);
      }
    }
  }, [dispatch, navigate, userInfo, id, successPay, successDeliver, order]);

   // Callback function for PayPal payment success
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  // Function to handle Khalti payment
  const handleKhaltiPayment = async () => {
    setKhaltiLoading(true);

    try {
      // Make a request to your server's Khalti endpoint
      const response = await axios.post("/api/khalti", {
        return_url: "http://localhost:3000/success",
        website_url: "http://localhost:3000",
        amount: parseInt(order.itemsPrice) * 100, // Assuming itemsPrice is the total order amount
        purchase_order_id: order._id,
        purchase_order_name: "Order Payment",
        customer_info: {
          name: order.user.name,
          email: order.user.email,
          phone: "9816503760", // Assuming you have a phone field in the shipping address
        },
      });

      // Handle the response from your server
      if (response.data.success) {
        // Redirect to the Khalti payment page
        window.location.href = response.data.data.payment_url;
      } else {
        console.error("Khalti payment failed:", response.data.message);
        // Handle the case where payment was not successful
      }
    } catch (error) {
      console.error(
        "An error occurred while processing the Khalti payment:",
        error
      );
      // Handle any error that occurs during the API call
    }

    setKhaltiLoading(false);
  };

  //Function to mark the order as Delivered
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

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

              {/* Displaying shipping details  of user*/}
              <h2>Shipping</h2>
              <p>
                {/* Display user name */}
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                {/* Display email name */}
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
                {/* if delivered Display delivered date and time */}
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
                  {/* Display items price,shipping price and total price */}
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
              <ListGroup.Item className="mb-3">
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <>
                    {/* Paypal Button */}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />

                      {/* Khalti Button  */}
                      <Button
                        id="payment-button"
                        type="button"
                        amount={order.totalPrice}
                        onClick={handleKhaltiPayment}
                        disabled={khaltiLoading}
                      >
                        {khaltiLoading ? "Processing..." : "Pay with Khalti"}
                      </Button>
                    </>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className="text-center">

                    {/* Mark As Delivered Button for admin  */}
                    <Button
                      type="button"
                      className="btn btn-block button-rad"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
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
