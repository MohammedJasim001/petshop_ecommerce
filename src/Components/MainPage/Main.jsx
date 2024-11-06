import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from '../HomePage/Home'
import Registration from '../Registration/Registration'
import SignIn from '../Registration/Login'
import Cat from '../ProductsCat/Cat'
import Dog from '../ProductsDog/Dog'

import ProductLists from '../ProductLists/ProductLists'
import BuyNow from '../Cart/Buy/BuyNow'
import Orders from '../HomePage/Orders'
import NonofThis from './NonofThis'
import About from '../HomePage/Pages/About'
import Contact from '../HomePage/Pages/Contact'
import api from '../../utils/axiosConfig'
import Wishlist from '../Wishlist/wishlistView'
import { getWishlist } from '../Wishlist/wishlist'
import All from '../AllProducts/GetAllProducts'
import Cart from '../Cart/ViewCart'
import { getCart } from '../Cart/Addcart'

export const Items=createContext()

const Main = () => {
  
const [data,setData]=useState([])
const [users,setUsers]=useState([])
const [cart,setCart] = useState([])
const [cartCount, setCartCount] = useState(0);
const [wishlistCount, setWishlistCount] = useState(0);

const updateWishlistCount = async () => {
  try {
    const count = await getWishlist();
    setWishlistCount(count.length || 0);
  } catch (error) {
    console.error("Error updating wishlist count:", error);
  }
};

const updateCartCount = async () => {
  try {
    const count = await getCart();
    setCartCount(count.length || 0);
  } catch (error) {
    console.error("Error updating cart count:", error);
  }
};

useEffect(()=>{
  const products = async () =>{
    try {
      const response = await api.get(`/users/products`)
      setData(response.data)
      updateWishlistCount();
      updateCartCount();
    } catch (error) {
      console.error('error from fetching product',error)
    }
  }
  products()

},[setData])




  return (
    <div className='bg-slate-100'>
       
      <Items.Provider value={{
        data,
        setData,
        users,
        setUsers,
        cartCount,
        cart,
        setCart,
        wishlistCount,
        updateCartCount,
        updateWishlistCount,
        }}>
      
      <Routes>
      
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/wishlist' element ={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/cat' element={<Cat />}/>
        <Route path='/dog' element={<Dog/>}/>
        <Route path='/allproducts' element={<All/>}/>
        <Route path='/productdetails/:id' element={<ProductLists/>}/>
        <Route path='/buynow' element={<BuyNow/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='*' element={<NonofThis/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
          
        
       
      </Routes>
     
      </Items.Provider>
   
   
 
    </div>
  )
}

export default Main
