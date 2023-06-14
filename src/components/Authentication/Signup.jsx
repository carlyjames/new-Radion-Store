// import { FormControl } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { UseAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

import { Form, Card } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


// mui
import Alert from '@mui/material/Alert';
import { Stack } from "@mui/material";



export const UPPERCASE_REGEX = new RegExp(/.*[A-Z]/);
export const NUMBER_REGEX = new RegExp(/.*\d /);
export const LENGTH_REGEX = new RegExp(/.{8,}$/);
export const SPECIAL_CHARS_REGEX = new RegExp(/.*[!@#$%^&*()_+{}":?><.,/';]/);

export const PASSWORD_VALIDATE_REGEX = new RegExp(
  `^(?=${[
    LENGTH_REGEX.source,
    UPPERCASE_REGEX.source,
    NUMBER_REGEX.source,
    SPECIAL_CHARS_REGEX.source
  ].join(")(?=")}).*$`
)

const Signup = (props, PasswordInputProps) => {
  const history = useNavigate();
  const { signup, currentUser } = UseAuth()
  const firstNameRef = useRef()
  const lastFirstNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('');


  async function handleSubmit(e) {
    e.preventDefault()
    console.log(
      'Email:', emailRef.current.value,
      'Password:', passwordRef.current.value
    );

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("passwords do not match")
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, firstNameRef, lastFirstNameRef)
      setUsername(firstNameRef.current.value);
      history('/');
    }
    catch {
      setError('failed to create account')
    }
    setLoading(false)
  }

  return (
    <section className="main-container container-fluid">
      <div className="">
        <div className="  form-holder shadow-lg">


          <div className="form-item shadow-lg  ">
            <div className="sideImage">

              <div className="sideImageOverlay ">
                <div className="innerSideImageOverlay">
                  <h1 className="">Sign up</h1>
                  <div className="signUpLine"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-item form p-4">
            {error && <Stack> <Alert severity='warning'>Account not created</Alert> </Stack>}
            <Stack> <Alert severity='success'>Account successfully created for {currentUser.email}</Alert> </Stack>
            <Form onSubmit={handleSubmit} className='m-2 flex flex-col '>
              <div className='grid grid-cols-2 gap-2'>
                <Form.Group id='email' className='flex flex-col my-1'>
                  <Form.Label>First Name</Form.Label>
                  <TextField type='text' inputRef={firstNameRef} error={!error && false} required />
                </Form.Group>
                <Form.Group id='password' className='flex flex-col my-1'>
                  <Form.Label>Last Name</Form.Label>
                  <TextField type='text' inputRef={lastFirstNameRef} required />
                </Form.Group>
              </div>
              <Form.Group id='email' className='flex flex-col my-1'>
                <Form.Label>Email</Form.Label>
                <TextField type='email' inputRef={emailRef} required />
              </Form.Group>
              <Form.Group id='password' className='flex flex-col my-1'>
                <Form.Label>Password</Form.Label>
                <TextField type='password' inputRef={passwordRef} error={error ? true : false} required />
              </Form.Group>
              <Form.Group id='password-confirm' className='flex flex-col my-1'>
                <Form.Label>Confirm Password</Form.Label>
                <TextField type='password' inputRef={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className='p-4' variant='contained' type='submit'>Submit</Button>
            </Form>
            <div>
              Already have an account? <Link to='/login'>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
