import React from 'react'
import { useParams } from 'react-router-dom';

// card api
import Grid from "@mui/material/Grid";
import { Grow } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Favorite } from "@mui/icons-material";

import Category from "./Categories/Category";
import NewArrivalData from "./NewArrivals/NewArrivals";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllCategories = ({ onBuyNow, cartItems }) => {
  const [cart, setCart] = useState(0)
  const { catId } = useParams();
  const categories = Category.find((categories) => categories.name === catId)

  const addToCart = () => {
    setCart(cart + 1)
  }

  const handleBuyNowClick = (item) => {
    onBuyNow(item);
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.id === itemId);
  };



  return (
    <div className="container pb-2 mt-4 new-arrival-container mt-4">
      <div className="new-arrival-header w-100  p-2">
        New Arrivals
      </div>
      <Grow in className="mt-4 pt-4 px-4">
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {categories.map((cat) => (
            <Grid key={cat.id} item xs={2} sm={4} md={3}>
              <Card className="new-arrival-card shadow-none px-1" sx={{ maxWidth: 345 }}>
                <div className="new-arrival-card-discount-holder d-flex  w-100  px-2 p-3">
                  <div className="new-arrival-likes d-flex text-muted">
                    <Favorite className="" />
                    <span className="mx-1">{cat.likes}</span>
                  </div>
                  <div className="new-arrival-discount">
                    <span class="badge new-arrival-badge  text-white ">New Collection</span>
                  </div>
                </div>
                <CardMedia
                  sx={{ height: 200, width: 200 }}
                  image={cat.image}
                  title={cat.name}
                  className="new-arrival-image "
                  style={{ objectFit: 'contain' }}

                >
                  <span class="badge new-arrival-discount-badge  text-white m-2 mt-4">-{cat.discountRate}</span>

                </CardMedia>
                <CardContent>
                  <div className="text-start ">
                    <Typography gutterBottom variant="h6" className="">
                      {cat.name}
                      <p className="text-gray-500">{cat.tag}</p>
                    </Typography >
                    <h1>${cat.price}</h1>
                    <h1 className="text-gray-400 line-through">${cat.formerPrice}</h1>
                  </div>

                </CardContent>
                <CardActions className=" flex items-center justify-around">
                  <Link to={`/item/${cat.name}`}>
                    <Button variant="contained" size="small" className="new-arrival-buy-button">Buy now</Button>
                  </Link>
                  <Button disabled={isItemInCart(cat.id)} size="small" className="new-arrival-addToCart-button p-5" onClick={() => handleBuyNowClick(cat)} >
                    <ShoppingCart />
                    {isItemInCart(cat.id) ? 'Item in Cart' : 'Add to Cart'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

        </Grid>
      </Grow>

      <div className="card">
        <div className="card-image"></div>
      </div>
    </div>
  );
}

export default AllCategories