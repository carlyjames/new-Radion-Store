import React, { useState, useEffect } from 'react'
import Banner from './Banner/materialUi.banner'
import Categories from './Categories/Categories'
import NewArrival from './NewArrival'
import PopularProducts from './PopularProducts'
import { TopProduct } from './Top-Product/Top-Product'
import NavItem from './Nav'
import Footer from './Footer'
import { UseAuth } from './contexts/AuthContext'
import { useLocation } from 'react-router-dom';


export default function Home() {
  const { currentUser } = UseAuth();
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


  return (
    <>    
      <NavItem totalItems={totalItems}  />
      <Banner />
      <Categories />
      <NewArrival onBuyNow={handleBuyNow} cartItems={cartItems} />
      <TopProduct />
      <PopularProducts onBuyNow={handleBuyNow} cartItems={cartItems}  />
      <Footer />
    </>
  )
}
