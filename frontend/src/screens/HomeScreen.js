import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts, productTop } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductTop from '../components/ProductTop'

function HomeScreen() {

    const location = useLocation()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = location.search

  useEffect(() => {
    dispatch(listProducts(keyword))
    }, [dispatch, keyword])


  return (
    <div>
      <div className='mt-2'>
      {!keyword && <ProductTop />}
      </div>
        <h1 className='mt-3'>Latest products</h1>
        {loading ? <Loader />
                 : error ? <Message variant='danger'>{error}</Message>
                 :
              <div>
              <Row>
            {products?.map((p) => {
                return <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={p} />
                </Col>
            })}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword}/>
        </div>
                  }
    </div>
  )
}

export default HomeScreen