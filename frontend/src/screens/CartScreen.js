import React, { useEffect } from 'react'
import { localhost } from "../constants/baseConstants"
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'

function CartScreen({location}) {
    const { id } = useParams()
    const [qty, setQty] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, Number(qty.get('qty'))))
        }
    }, [dispatch, id, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }

  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message variant='info'>
                    Your cart is empty <Link to='/'>Go back</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={`${localhost}/${item.image}`} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value))) }>
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                      </Form.Control>

                                </Col>
                        <Col md={1}>
                            <Button
                            type='button'
                            variant='light'
                            onClick={() => removeFromCartHandler(item.product)}>
                                <i className='fas fa-trash'></i>
                            </Button>
                        </Col>
                            </Row>
                        </ListGroup.Item>
                    ) )}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush' className='my-3'>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0 )}) items
                            </h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                    <Button
                        disabled={cartItems.length === 0}
                        type='button'
                        className='btn-block'
                        onClick={checkoutHandler}>
                        Proceed To Checkout
                    </Button>
                </ListGroup.Item>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen