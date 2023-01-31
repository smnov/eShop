import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate()
    const location = useLocation()
    const [keyword, setkeyWord] = useState('')

    const submitHandler = (e) => {
        e?.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(location.pathname)
        }
    }
  return (
    <Form onSubmit={submitHandler} className='mx-2 d-inline-flex' >
        <Form.Control 
            type='text'
            name='q'
            onChange={(e) => setkeyWord(e.target.value)}
            className='mr-sm-2 ml-sm-5'>
        </Form.Control>
        <Button
            type='submit'
            variant='outline-success'
            className='mx-1'
        >Submit</Button>
    </Form>
  )
}

export default Search