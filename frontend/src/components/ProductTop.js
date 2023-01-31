import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { productTop } from '../actions/productActions'
import { localhost } from '../constants/baseConstants'
import Loader from './Loader'
import Message from './Message'

function ProductTop() {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products} = productTopRated

    useEffect(() => {
        dispatch(productTop())
    }, [dispatch])
  return ( loading ? <Loader />
    : error
    ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='bg-dark'>
            {products?.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={`${localhost}/${product.image}`} alt={product.name} fluid/>
                        <Carousel.Caption className='carousel.caption'>
                        <h4>{product.name} (${product.price})</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
      )
    )
    }

export default ProductTop