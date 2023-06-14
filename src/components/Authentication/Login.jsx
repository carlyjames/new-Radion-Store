import React from "react";
import "../../Styles/Signup.css";
import { Card, Form } from "react-bootstrap";
import { useRef } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

import Button from "@mui/material/Button";
import {Alert} from "@mui/material";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { login } = UseAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <section className="main-container container-fluid">
      <div className="">
        <div className="  form-holder shadow-lg">


          <div className="form-item shadow-lg  ">
            <div className="sideImage">

              <div className="sideImageOverlay ">
                <div className="innerSideImageOverlay">
                  <h1 className="">Login</h1>
                  <div className="signUpLine"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-item form p-4 lg:w-[400px]">
            {error && <Stack> <Alert severity='error'>Login Failed</Alert> </Stack>}
            
            <Form onSubmit={handleSubmit} className='m-2 flex flex-col gap-4'>
              <Form.Group id='email' className='flex flex-col my-1'>
                <Form.Label>Email</Form.Label>
                <TextField type='email' inputRef={emailRef} error={error ? true : false} required />
              </Form.Group>
              <Form.Group id='password' className='flex flex-col my-1'>
                <Form.Label>Password</Form.Label>
                <TextField type='password' inputRef={passwordRef} error={error ? true : false} required />
              </Form.Group>
              <Button disabled={loading} className='p-4' variant='contained' type='submit'>Submit</Button>
            </Form>
            <div>
              Don't have an account? <Link to='/signup'>Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
