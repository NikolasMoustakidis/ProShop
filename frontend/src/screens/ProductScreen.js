import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearProductDetails,
  listProductDetails,
} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(params.id))

    return () => {
      dispatch(clearProductDetails())
    }
  }, [dispatch, params])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}/?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3> {product.name} </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: ${product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
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
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <FormControl
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
