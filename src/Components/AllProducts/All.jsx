
import React, { useContext, useEffect, useState } from 'react'
import AllProuducts from './AllProuducts'
import { Items } from '../MainPage/Main'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import axios from 'axios'

const All = () => {
 

  const [data, setData] = useState([]);

  useEffect(()=>{
    const products = async () =>{
      try {
        const response = await axios.get('http://localhost:5000/api/users/products');

        console.log(response.data.products,'im suhiab');
        setData(response?.data?.products)
      } catch (error) {
        console.error('error from fetching product',error)
      }
    }
    products()
  
  },[])

  
 console.log(data,'hey ');
 
  return (
    <div>
      <Navbar/>
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:ml-10 mt-5">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 md:pt-10 md:mx-10">
                {data.map((products,i) => (
                  console.log(products,'productssssss'),
                    <AllProuducts key={i} products={products} />
                ))}

                
            </div>

            <Footer/>
    </div>
  )
}

export default All
