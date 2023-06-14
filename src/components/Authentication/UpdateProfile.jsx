import React from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getAuth, updateEmail } from 'firebase/auth'
const auth = getAuth()

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
//   const { currentUser, UpdateEmail, UpdatePassword } = UseAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    updateEmail(auth.currentUser, emailRef.current.value).then(() => {
        // Email updated!
        // ...
        alert('email updated')
      }).catch((error) => {
        // An error occurred
        // ...
        setError("failed to update profile")
      });

    // const promises = []
    // if (  emailRef.current.value !== currentUser.email ){
    //     promises.push(UpdateEmail(emailRef.current.value))
    // }
    // if(  passwordRef.current.value ){
    //     promises.push(UpdatePassword(passwordRef.current.value))
    // }

    // Promise.all(promises).then(() => {
    //     history("/");
    // })
    // .catch(() => {
    //     setError("failed to update profile")
    // })
    // .finally(() => {
    //     setLoading(false)
    // })


    
    try {
      setError("");
      setLoading(true);
    //   await Signup(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* {currentUser && currentUser.displayName} */}
          {/* <img src={currentUser && currentUser.photoURL} alt="" /> */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}  />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}  placeholder="Leave blank to keep same"/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep same"/>
            </Form.Group>
            <Button disabled={loading} variant='contained' type="submit" className="w-100 mt-2">
              Update Profile
            </Button>
            <p className="text-center mt-2">or</p>


          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">cancel</Link>
      </div>
    </>
  );
}
