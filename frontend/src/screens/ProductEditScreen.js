// import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageOne from '../components/MessageOne'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductsDetails, updateProduct } from "../action/productAction";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants' 

const ProductEditScreen = () => {
//   const productId = match.params.id
const { productId } = useParams();

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [describe, setDescribe] = useState('')
//   const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

useEffect(() => {
  if(successUpdate) {
    dispatch({ type: PRODUCT_UPDATE_RESET})
    navigate('/admin/productlist')
  } else {
    if (!product || product._id !== productId || loading || !productId) {
      // Check if productId is defined before dispatching the action
      if (productId) {
        dispatch(listProductsDetails(productId));
      }
    } else {
      setName(product.name); 
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescribe(product.describe);
    }
  }
  }, [dispatch, productId, product, successUpdate, loading]);

//   const uploadFileHandler = async (e) => {
//     const file = e.target.files[0]
//     const formData = new FormData()
//     formData.append('image', file)
//     setUploading(true)

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }

//       const { data } = await axios.post('/api/upload', formData, config)

//       setImage(data)
//       setUploading(false)
//     } catch (error) {
//       console.error(error)
//       setUploading(false)
//     }
//   }

  const submitHandler = (e) => {
    e.preventDefault()
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
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <MessageOne variant='danger'>{errorUpdate}</MessageOne>}
        {loading ? (
          <Loader />
        ) : error ? (
          <MessageOne variant='danger'>{error}</MessageOne>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {/* <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />} */}
            </Form.Group>

            {/* <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='describe'>
              <Form.Label>Describe</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
