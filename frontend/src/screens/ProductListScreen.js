import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../action/productAction";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";

// This screen for managing products in an admin panel
const ProductListScreen = ({ match }) => {
  // Extracting 'pageNumber' from URL parameters using React Router
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get product list from Redux state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  
  //Extract product delete form redux state
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

   // Extract product create from redux state
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  // Extract user info from redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Dispatch action to list users when the component mounts
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login"); //if not admin redirect to the login
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`); // Redirect after creating a new product
    } else {
      dispatch(listProducts('', pageNumber)); // Fetch product list
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

   // Handler to delete a product
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

   // Handler to create a new product
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          {/* Create product  */}
          <Button className="my-3 button-rad" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <MessageOne variant="danger">{errorDelete}</MessageOne>}
      {loadingCreate && <Loader />}
      {errorCreate && <MessageOne variant="danger">{errorCreate}</MessageOne>}
      {loading ? (
        // Show loader while data is being fetched
        <Loader />
      ) : error ? (
        // Show error message if there's an issue fetching data
        <MessageOne variant="danger">{error}</MessageOne>
      ) : (
        // Display Product list in a table
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {/* Product list button */}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>  
      )}
    </>
  );
};

export default ProductListScreen;
