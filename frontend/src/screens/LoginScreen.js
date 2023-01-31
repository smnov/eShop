import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate, createSearchParams } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate({
                pathname: '/',
                search: createSearchParams({

                }).toString()
            })
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e?.preventDefault();
        dispatch(login(email, password))
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button
                className='mt-3'
                type='submit'
                variant='primary'>
                    Sign In
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New customer? 
                <Link to={'/register'}>
                    Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen