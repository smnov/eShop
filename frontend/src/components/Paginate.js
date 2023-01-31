import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate ({pages, page, keyword='', isAdmin=false}) {

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
  return (
    pages > 1 && (
        <Pagination>
            {
                [...Array(pages).keys()].map((x) => (
                    <LinkContainer 
                    key={x + 1} // Plus 1 because array starts with 0, and we don't want 0 page.
                    to={!isAdmin ?{
                        pathname: "/",
                        search: 
                        `/?keyword=${keyword}&page=${x+1}`} 
                    : {
                        pathname: "/admin/productlist/",
                        search: 
                        `/?keyword=${keyword}&page=${x+1}`} 
                    }
                    >
                        <Pagination.Item key={x+1} disabled={x + 1 === page}>{x+1}</Pagination.Item>
                    </LinkContainer>
                ))
            }
        </Pagination>
    )
  )
}

export default Paginate