import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { orderListMyOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile 

    const myOrderList = useSelector(state => state.myOrderList)
    const {loading:loadingOrders, error:errorOrders, orders} = myOrderList

    useEffect(() => {
        if (!userInfo) {
            navigate({
                pathname: '/login',
            })
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
                dispatch(getUserDetails('profile'))
                dispatch(orderListMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, userInfo, user, success, dispatch])

    const submitHandler = (e) => {
        e?.preventDefault();
        if (password !== password2) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password
        }))
        }
    }
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='username'
                    placeholder='enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
                </Form.Group>
            <Form.Group controlId='password2'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm password'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}>
                </Form.Control>
                </Form.Group>
                <Button className='mt-2' type='submit'>Update</Button>
        </Form>
        </Col>

        <Col md={9}>
            <h2>My orders</h2>
            { loadingOrders ? (
                <Loader />
            ) : (
                errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) :
             (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map(order=>{
                            return (<tr>
                                <td>{order._id}</td>
                                <td>{order.createdAt?.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? 
                                    <div>
                                    <i className='fas fa-check'
                                        style={{color: 'green'}}></i>    
                                    {order.paidAt.substring(0,10)} 
                                    </div>
                                    : (
                                    <i 
                                    className='fas fa-times' 
                                    style={{color:'red'}}></i>
                                )}</td>
                                <td>{order.isDelivered ? 
                                    <div>
                                    <i className='fas fa-check'
                                        style={{color: 'green'}}></i>    
                                    {order.deliveredAt.substring(0,10)} 
                                    </div>
                                    : (
                                    <i className='fas fa-times' 
                                        style={{color:'red'}}></i>
                                )
                                }</td>
                                <td><Link to={`/order/${order._id}`}>
                                    <Button className='btn-sm'>Details</Button>
                                    </Link></td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            ))}
        </Col>
    </Row>
  )
}

export default ProfileScreen