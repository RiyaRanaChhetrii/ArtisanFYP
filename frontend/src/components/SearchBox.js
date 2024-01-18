import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
  
    const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
        navigate(`/search/${keyword}`)
      } else {
        navigate('/')
      }
    }   

  return (
    <Form onSubmit={submitHandler}>
            <Row className="align-items-center">
        <Col sm={8} md={10}>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="mr-sm-2 ml-sm-5"
            style={{ color: 'black'}}
          />
        </Col>
        <Col sm={4} md={2} className="mt-2 mt-sm-0">
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBox;
