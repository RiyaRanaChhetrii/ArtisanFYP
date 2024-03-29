import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import MessageOne from "../components/MessageOne.js";
import Loader from "../components/Loader.js";
import { listProductsDetails, updateProduct } from "../action/productAction";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

// Product Edit Screen in admin panel 
const ProductEditScreen = () => {
  // Extracting productId from the route parameters
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables to manage form fields and uploading state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [describe, setDescribe] = useState("");
  const [uploading, setUploading] = useState(false);

  // Redux state product details
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // Redux state for product update
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  // Fetch product details on component mount
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET }); //reset for next operation
      navigate("/admin/productlist"); //navigate to admin product list screen
    } else {
      // Fetch product details if not already loaded
      if (!product || product._id !== productId) {
        dispatch(listProductsDetails(productId));
      } else {
        // Check if product exists and has the necessary properties
        if (product.name !== undefined && product._id !== undefined) {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescribe(product.describe);
        }
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  // Function to handle file upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        describe,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3 button-rad">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {/* Display loader while updating */}
        {loadingUpdate && <Loader />}
        {/* Display error message if update fails */}
        {errorUpdate && <MessageOne variant="danger">{errorUpdate}</MessageOne>}
        {loading ? (
           // Show loader while fetching product details
          <Loader />
        ) : error ? (
          <MessageOne variant="danger">{error}</MessageOne>
        ) : (

           // Display the form for updating the product
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="image-file">Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                id="image-file"
                type="file"
                label="Choose File"
                custom='true'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="describe">
              <Form.Label>Describe</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              ></Form.Control>
            </Form.Group>

             {/* Button for updating the product */}
            <Button className="button-rad" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
