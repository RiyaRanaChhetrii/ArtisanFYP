import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import Link, useParams, and useNavigate
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductsDetails,
  createProductReview,
} from "../action/productAction";
import Loader from "../components/Loader";
import MessageOne from "../components/MessageOne";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

// Dispaly product information including its details and reviews 
const ProductScreen = () => {
  
  // For Handling and updating the component
  const [qty, setQty] = useState(1); // Manage state for quantity
  const [rating, setRating] = useState(0); // To manage state for rating
  const [comment, setComment] = useState(""); // To manage state for comment

  const { id } = useParams();
  // State management library from react-redux and react router dom
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Extract the product details using useSelector
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails; // To extract the loading, error, and product 

  // Extract the userLogin state from Redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // Destructuring to extract the userInfo

  // Extract the productReviewCreate 
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {

    // Handle successProductReview changes
    if(successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET}) // Reset for next time operation
    }
     // Fetch product details
    dispatch(listProductsDetails(id));
  }, [dispatch, id, successProductReview]);

  // Handlers
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`); // Use navigate for navigation
  };

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
    {/* Back arrow */}
      <Link to="/">
        <i className="fa-solid fa-arrow-left fa-xl py-4"></i>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageOne variant="danger">{error}</MessageOne>
      ) : (
        <>
          <Row>
            <Col md={5}>
            {/* Product Image */}
              <Image src={product.image} alt={product.name} fluid /> 
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.describe}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {console.log(product.countInStock)}

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="text-center">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block button-rad"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                // Display a message when there are no reviews for the product
                <MessageOne>No Reviews</MessageOne>
              )}
              <ListGroup variant="flush">
                {/* Iterate over each review for the product */}
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                     {/* Display the rating using 'Rating' component */}
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>  {/* Display the review's creation date */}
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                   {/* Section for writing a new customer review */}
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <MessageOne variant="danger">
                      {errorProductReview}
                    </MessageOne>
                  )}
                  {userInfo ? ( // Check if user logged in 
                    <Form onSubmit={submitHandler}>

                      {/* Form group for selecting the rating */}
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      {/* Form group for entering the review comment */}
                      <Form.Group controlId="comment" className="mb-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                        {/* Submit Button for review */}
                      <Button
                        className="button-rad"
                        // disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  // If the user is not logged in, display a message to sign in
                  ) : (
                    <MessageOne>
                      {" "}
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </MessageOne>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
