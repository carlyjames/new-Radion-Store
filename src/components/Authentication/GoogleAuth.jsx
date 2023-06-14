import React from 'react'
import { Button } from 'react-bootstrap'
import { signInWithGoogle } from '../firebase'

export default function GoogleAuth() {
    
  return (
    <>
        <Button onClick={signInWithGoogle}>Sign up with google</Button>
    </>
  )
}
