import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import MessageOne from "../components/MessageOne";
import { addToCart, removeFromCart } from "../action/cartAction";

// Functional component for the shopping cart screen
const CartScreen = () => {
  // Extract parameters and location from React Router
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract productId and quantity from the URL query string
  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch(); // Initialize useDispatch hook

  // Access the cart state from the Redux store using useSelector
  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart; // Provide an empty array as a default value

 
 // Effect to add a product to the cart when the component mounts 
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty)); // Add a product to cart
    }
  }, [dispatch, productId, qty]);

  // Handler to remove an item from the cart
  const removeFromCardHandler = (id) => {
    console.log("remove");
    dispatch(removeFromCart(id))
  };

   // Handler to navigate to the login or shipping page during checkout
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
    // if (userInfo) {
    //   // User is logged in, navigate to the shipping page
    //   navigate('/shipping');
    // } else {
    //   // User is not logged in, navigate to the login page with redirect to shipping
    //   navigate('/login?redirect=shipping');
    // }
  };
  

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageOne className="button-rad">
            Your cart is empty <Link to="/">Go Back</Link>
          </MessageOne>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  {/* Displaying product details */}
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    {/* Dropdown for selecting quantity */}
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    {/* Button to remove item from cart */}
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCardHandler(item.product)}
                    >
                      <i className="fas fa-trash "></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

       {/* Right column displaying subtotal and checkout button */}
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              ${cartItems.reduce(
                (acc, item) => acc + item.qty * item.price,
                0
              ).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
               {/* Button to proceed to checkout */}
              <Button
                type="button"
                className="btn-block button-rad"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
