import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deliverOrder, getOrderDetails, payOrder } from "../actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/orderConstants";
import { localhost } from "../constants/baseConstants";


function OrderScreen() {
    const { id } = useParams() 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        }
    }, [order, id, dispatch, successPay, successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const payHandler = () => {
        dispatch(payOrder(order._id))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p><strong>Email:</strong></p>
                            <p>
                                <strong>Shipping:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {"    "}
                                {order.shippingAddress.postalCode},{"    "}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not delivered</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {order?.orderItems?.length === 0 ? (
                                <Message variant="info ">Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order?.orderItems?.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = $
                                                    {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </ListGroup.Item>
                        </ListGroup>
                        {loadingDeliver && <Loader />}
                        {userInfo && (userInfo._id === order.user._id) && !order.isPaid &&
                        <ListGroup.Item>
                            <Button className="w-25"
                                    onClick={payHandler}>
                                Pay
                                </Button>
                            </ListGroup.Item>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}>
                                    Mark as delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;
