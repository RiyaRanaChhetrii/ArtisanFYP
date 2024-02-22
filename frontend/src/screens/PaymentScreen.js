import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../action/cartAction";

// Functional component for PaymentScreen
const PaymentScreen = () => {
  // React Router hook for navigation
  const navigate = useNavigate();

  // To get shipping address from cart Redux state using Selector
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

   // If shipping address is not available, redirect to the shipping screen
  if (!shippingAddress) {
    navigate("/shipping");
  }

  // State to manage selected payment method
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();  // Redux dispatch hook to dispatch actions

  //Event handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    
    // Dispatch action to save selected payment method
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment Method input form
  return (
    <FormContainer>
      {/* Display Checkout steps */}
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group>
          
        <Form.Label as="legend">Select Method</Form.Label>
        <Col>
        {/* PayPal radio selector button */}
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type="radio"
            label="CashOnDelivery"
            id="CashOnDelivery"
            name="paymentMethod"
            value="CashOnDelivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type="radio"
            label="Khalti"
            id="Khalti"
            name="paymentMethod"
            value="Khalti"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          
        </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="button-rad mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
