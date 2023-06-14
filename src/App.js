import React, { useState, useEffect } from "react";
import "./App.css";

import NavItem from './components/Nav'
import ItemsDetails from "./components/ItemsDetails";
import Home from "./components/Home";
// import Categories from "./components/Categories";
// import Categories from "./components/Categori/es";
import AllCategories from "./components/Categories";

// auth
import { AuthProvider } from "./components/contexts/AuthContext";
import Signup from './components/Authentication/Signup';
import Dashboard from './components/Dashboard';
import Login from './components/Authentication/Login';
import ForgotPassword from './components/Authentication/ForgotPassword';
import UpdateProfile from './components/Authentication/UpdateProfile';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [totalItems, setTotalItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
      setTotalItems(storedCartItems.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setTotalItems(cartItems.length);
  }, [cartItems]);


  const handleBuyNow = (cat) => {
    const itemAlreadyInCart = cartItems.find((cartItem) => cartItem.id === cat.id);
    if (itemAlreadyInCart) {
      return; // Item already exists in the cart, do not add again
    }

    const newCartItems = [...cartItems, cat];
    setCartItems(newCartItems);
  };

  const totalItemSold = 10;


  return (
    <AuthProvider>
        <>
          <div >
            <NavItem totalItems={totalItems} />
            <Routes>
              <Route exact path='/' element={<Home />}  />
              <Route path="/item/:itemId" element={<ItemsDetails totalItemSold={totalItemSold} onBuyNow={handleBuyNow} cartItems={cartItems} />} />
              <Route path="/wines/:category" element={<AllCategories onBuyNow={handleBuyNow} cartItems={cartItems}  />} />
              
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/update-profile' element={<UpdateProfile />} />
            </Routes>
          </div>
        </>
      </AuthProvider>
  );
}

export default App;
