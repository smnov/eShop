import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate, createSearchParams, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success} = userUpdate

    useEffect(() => {
        if (success) {
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
        if (!user.name || user._id !== Number(id) ) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        }
    }, [id, user, success, navigate])

    const submitHandler = (e) => {
        e?.preventDefault();
        dispatch(
            updateUser({_id: user._id, name, email, isAdmin})
        )
    }
  return (
    <div>
    <Link to='/admin/userlist'>Go Back</Link>
    <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='username'
                    placeholder='enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isadmin'>
                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}>
                </Form.Check>
            </Form.Group>
                <Button type='submit'>Update</Button>
        </Form>

        )}
    </FormContainer>
    </div>
  )
}

export default UserEditScreen