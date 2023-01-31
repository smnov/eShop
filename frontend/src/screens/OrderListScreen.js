import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { listOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function OrderListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const allOrders = useSelector(state => state.allOrders)
    const { loading, error, orders } = allOrders

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])


  return (
    <div>
        <h1>Orders</h1>
        {loading 
        ? <Loader/>
        : error 
            ? (<Message variant='danger'>{error}</Message>)
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map(order => (
                            (<tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? (
                                    <div>
                                    <i className='fas fa-check'
                                    style={{color: 'green'}}></i>
                                    {order.paidAt.substring(0, 10)}
                                    </div>
                                ) : (
                                    <i 
                                    className='fas fa-times'
                                    data-bs-placement='top' 
                                    title='Not paid' 
                                    style={{color: 'red'}}></i>
                                )}</td>
                                <td>{order.isDelivered ? (
                                    <div>
                                    <i className='fas fa-check'
                                    style={{color: 'green'}}></i>
                                    {order.deliveredAt.substring(0, 10)}
                                    </div>
                                ) : (
                                    <i 
                                    className='fas fa-times' 
                                    data-bs-placement='top' 
                                    title='Not Delivered' 
                                    style={{color: 'red'}}></i>
                                )}</td>
                                    <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>

                                </td>
                            </tr>)
                        ))}
                    </tbody>
                </Table>
            )}
    </div>
  )
}

export default OrderListScreen