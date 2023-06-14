import React from 'react'
import { useEffect, useState } from 'react';
import { countries } from 'countries-list';
import { useParams } from 'react-router-dom';
import NewArrivalData from './NewArrivals/NewArrivals'
import NavItem from './Nav';

// icons
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextField from "@mui/material/TextField";
import { Button, Divider, MenuItem, Stack } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const ItemsDetails = ({ onBuyNow, cartItems }) => {

  const { itemId } = useParams();
  const item = NewArrivalData.find((item) => item.name === itemId);
  
  const [Year, setYear] = React.useState(0);
  const [count, setCount] = useState(0);
  const [availableMaterials, setAvailableMaterials] = useState(10); // Total number of available materials
  const [showWarning, setShowWarning] = useState(false);
  


  const handleYearChanged = (event) => {
    setYear(event.target.value);
  };

  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    const countryData = Object.values(countries);
    const countryNames = countryData.map((country) => country.name);
    setCountryNames(countryNames);
  }, []);
  
  
  if (!item) {
    return <div>Item not found bro</div>;
  }

  const handleIncrement = () => {
    if (count < availableMaterials) {
      setCount(count + 1);

      if(count +1 === availableMaterials){
        setShowWarning(true)
      }
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
    if(showWarning){
      setShowWarning(false)
    }
  };


  const handleBuyNowClick = (item) => {
    onBuyNow(item);
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.id === itemId);
  };



  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 h-screen  py-8 lg:p-16 p-4 mt-8'>
      {/* cart item */}
      <div className='col-span-3 grid lg:grid-cols-2   flex'>
        {/* images */}
        <div className='px-4'>
          <div className='h-[400px] lg:w-[400px] border p-4 rounded-2xl shadow-xl bg-slate-200'>
            <img src={item.image} alt={item.name} className='h-[100%]' />
          </div>
          <div >
            <div className='flex items-center gap-2 justify-around mt-4 '>
              {item.otherImages.map((img, index) => (
                <div className='border-solid border-[1px] hover:border-[#230605] ease-in cursor-pointer shadow rounded-2xl h-[100px] w-[100px] p-1'>
                  <img key={index} src={img} alt={item.name} className=' h-[100%] w-[100%]  object-contain' />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* details */}
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-semibold'>{item.header}</h1>
          <div className='flex items-center gap-3'>
            <div className='star-rating p-1 px-2 rounded-full flex items-center gap-2 justify-center text-white'>
              <StarIcon />
              {item.starRate}
            </div>
            <span className='text-gray-400 text-medium'> | {item.totalSold}</span>
          </div>
          <h3 className='text-gray-600 font-medium'>{item.Description}</h3>
          <div className='flex  items-center gap-8'>
            <div className='flex gap-1 items-center justify-center text-red-900'>
              <CancelIcon className='' />
              <p>-{item.discountRate}</p>
            </div>
            <p className='font-bold text-xl'>${item.price}</p>
          </div>
          <p className='text-gray-600'>Was : ${item.formerPrice}</p>
          <h1 className='font-bold text-xl'>Brand</h1>
          <div className='border-solid rounded-xl p-2 text-medium px-3 border-[2px] border-[#230605] w-max'>{item.brand}</div>
          <div>
            <h1 className='font-bold text-xl'>About This Item</h1>
            <div className='flex flex-col gap-2 mt-2'>
              {item.aboutItem.map((abt, index) => (
                <div key={index} className='flex gap-1'>
                  <CheckCircleIcon className='text-[#230605]' />
                  <p>{abt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* side nav */}
      <div className='border flex flex-col gap-4 rounded-2xl shadow p-4 lg:sticky top-0'>
        <h1 className='font-bold text-medium'>Deliver</h1>
        <div className='p-2'>
          <TextField
            className="w-full "
            maxRows={4}
            variant="filled"
            select
            value={Year}
            onChange={handleYearChanged}
            helperText='Choose Location'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon />
                </InputAdornment>
              ),
            }}
          >
            {countryNames.map((country, index) => (
              <MenuItem  key={index} value={country}>
                {country}
              </MenuItem>
            ))}

          </TextField>
        </div>

        <h1 className='font-bold text-medium'>Total Stock : {item.totalSold}</h1>
        <div className='grid grid-cols-3'>
          <Button onClick={handleDecrement} className='remove-item-btn h-[40px] rounded-l-lg'>
              <RemoveIcon />
          </Button>

          <div  className=' h-[40px] cols-span-2 bg-slate-200 flex items-center justify-center'> {count} </div>
          
          <Button onClick={handleIncrement} className='add-item-btn h-[40px]  rounded-r-lg'>
              <AddIcon />
          </Button>
        </div>
        { showWarning && <Stack spacing={1}>
          <Alert severity='warning'>Maximum limit reached</Alert>
        </Stack> }
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <p className='font-bold text-medium text-gray-400'>Total Price</p>
            <p className='font-bold text-medium'>${ count * item.price }</p>
          </div>
          <Divider />
          <div className='flex items-center justify-between'>
            <p className='font-bold text-medium text-gray-400'>Shipping</p>
            <p className='font-bold text-medium'>From  $10</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Button className='item-detail-btn contained'>Buy Now</Button>
          <Button onClick={() => handleBuyNowClick(item)} className='item-detail-btn outlined'>
            {isItemInCart(item.id) ? 'Item in Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );

}


export default ItemsDetails