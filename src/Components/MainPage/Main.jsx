import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from '../HomePage/Home'
import Registration from '../Registration/Registration'
import SignIn from '../Registration/Login'
import Cart from '../Cart/Cart'
import Cat from '../ProductsCat/Cat'
import Dog from '../ProductsDog/Dog'
import All from '../AllProducts/All'
import ProductLists from '../ProductLists/ProductLists'
import axios from 'axios'
import BuyNow from '../Cart/Buy/BuyNow'
import Orders from '../HomePage/Orders'
import NonofThis from './NonofThis'
import About from '../HomePage/Pages/About'
import Contact from '../HomePage/Pages/Contact'

export const Items=createContext()

const Main = () => {
  

const [data,setData]=useState([])
const [users,setUsers]=useState([])
const [cartCount,setCartCount]=useState([])
// useEffect(()=>{
//   const products = async () =>{
//     try {
//       const response = await axios.get('http://localhost:5000/api/users/products')
//       setData(response.data)
//     } catch (error) {
//       console.error('error from fetching product',error)
//     }
//   }
//   products()

// },[setData])
useEffect(()=>{
  axios.get("http://localhost:3000/users")
    .then(res=>{
      setUsers(res.data)
    })
    .catch(err=>console.log(err))
},[])



  const fetchUserData = async () => {
    const userId = localStorage.getItem("user");
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setCartCount(response.data.cart);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);




  return (
    <div className='bg-slate-100'>
       
      <Items.Provider value={{data, setData,users,setUsers,cartCount,setCartCount,fetchUserData}}>
      
      <Routes>
      
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/signin' element={<SignIn/>}/>
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
