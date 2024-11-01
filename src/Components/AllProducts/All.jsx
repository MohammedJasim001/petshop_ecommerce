
import React, { useContext, useEffect, useState } from 'react'
import AllProuducts from './AllProuducts'
import { Items } from '../MainPage/Main'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import axios from 'axios'
import api from '../../utils/axiosConfig'

const All = () => {
 

  const [data, setData] = useState([]);

  useEffect(()=>{
    const products = async () =>{
      try {
        const response = await api.get('users/products');
        setData(response?.data?.products)
      } catch (error) {
        console.error('error from fetching product',error)
      }
    }
    products()
  
  },[])
 
  return (
    <div>
      <Navbar/>
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:ml-10 mt-5">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 md:pt-10 md:mx-10">
                {data.map((products,i) => (
                    <AllProuducts key={i} products={products} />
                ))}

                
            </div>

            <Footer/>
    </div>
  )
}

export default All
