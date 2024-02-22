import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


// Functional component for Search box
const SearchBox = () => {

  // State for the search keyword
  const [keyword, setKeyword] = useState("");

   // Navigation hook from React Router
  const navigate = useNavigate();

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`); // Navigate to the search page with the provided keyword
    } else {
      navigate("/"); // If key word is empty, navigate to home
    }
  };

  return (
    <Form onSubmit={submitHandler} >
      <Row className="align-items-center">
        <Col sm={8} md={10}>
          
          {/* Input field for the search keyword */}
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="mr-sm-2 ml-sm-5"
            style={{ color: "black", height: "35px", borderRadius: '10px' }}
          />
        </Col>
        <Col sm={4} md={2} className="mt-2 mt-sm-0">
          {/* Button for search form */}
          <Button
            type="submit"
            variant="light"
            className="p-2 d-flex align-items-center button-rad"
            style={{ height: "30px", borderRadius: '10px' }}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
