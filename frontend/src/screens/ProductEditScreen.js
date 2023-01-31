import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { BASE_URL, PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

function ProductEditScreen() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:updateLoading, error:updateError, success:updateSuccess} = productUpdate
    
    useEffect(() => {
        if (updateSuccess) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if (!product?.name || product?._id !== Number(id) ) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setDescription(product.description)
            }
        }
    }, [id, product, navigate, dispatch, updateSuccess])

    const submitHandler = (e) => {
        e?.preventDefault();
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
    }))
    }

    const uploadFileHander = async (e) => {
        const file = e.target.files[0] // get the name of a file
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', id)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post(
                BASE_URL + 'products/upload/',
                formData,
                config
            )
            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

  return (
    <div>
    <Link to='/admin/productlist'>Go Back</Link>
    <FormContainer>
        <h1>Edit Product</h1>

        {updateLoading && <Loader/>}
        {updateError && <Message variant='danger'>{updateError}</Message>}

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

            <Form.Group controlId='price'>
                <Form.Label>price</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='enter image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}>
                </Form.Control>

                <Form.Control
                    type='file'
                    label='Choose file'
                    custom
                    onChange={uploadFileHander}
                >
                </Form.Control>
                {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='enter stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </Form.Control>

            </Form.Group>
                <Button type='submit'>Update</Button>
        </Form>

        )}
    </FormContainer>
    </div>
  )
}

export default ProductEditScreen