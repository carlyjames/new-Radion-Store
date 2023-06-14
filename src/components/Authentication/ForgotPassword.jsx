import React from "react";
// import '../../Styles/'


import { Card, Form, Alert } from "react-bootstrap";
import { useRef } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const { Signup, currentUser, ForgotPassword } = UseAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await ForgotPassword(emailRef.current.value);
      setMessage("check your inbox for further instruction");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div className=" shadow-lg row g-3">
        <h2 className="py-2">Reset password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <div class="col-12">
              <TextField
                type="email"
                ref={emailRef}
                className="form-control"
                required
                id="standard"
                label="Email"
              />
            </div>
          </Form.Group>

          <Button
            disabled={loading}
            variant="contained"
            type="submit"
            className="w-100 mt-2 p-2"
          >
            Reset Password
          </Button>
        </Form>
        <div className="w-100 text-center mt-3">
          <Link to="/login">Login</Link>
        </div>

        <div className="w-100 text-center m-2">
          No account yet <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
}
