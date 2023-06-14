import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../firebase'

const AuthContext = React.createContext()

export function UseAuth(params) {
  return useContext(AuthContext)
}


export function AuthProvider({children}){

  const [ currentUser, setCurrentUser ] = useState()
  const [ loading, setLoading ] = useState(true)

  function signup(email, password) { 
    return auth.createUserWithEmailAndPassword(email, password)
  }


  function login(email, password) { 
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unSubscribe =  auth.onAuthStateChanged( user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unSubscribe
  }, []) 
  


  const value = {
    currentUser,
    signup,
    login
  }


  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}

