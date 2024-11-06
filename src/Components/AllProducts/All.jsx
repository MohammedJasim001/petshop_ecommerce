
import React, { useContext, useEffect, useState } from 'react'
import AllProuducts from './AllProuducts'
import { Items } from '../MainPage/Main'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import axios from 'axios'
import api from '../../utils/axiosConfig'

const All = () => {
 

  const [data, setData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)
  const limit = 10

  useEffect(()=>{
    const products = async () =>{
      try {
        const response = await api.get(`users/products?page=${currentPage}&limit=${limit}`);
        setData(response?.data?.products)
        setTotalPages(response?.data?.pagination?.totalPages)
      } catch (error) {
        console.error('error from fetching product',error)
      }
    }
    products()
  
  },[currentPage])

  const handleNextPage=()=>{
    if(currentPage < totalPages){
      setCurrentPage((page)=> page + 1)
    }
  }
  const handlePreviousPage=()=>{
    if(currentPage > 1){
      setCurrentPage((page)=> page - 1)
    }
  }
 
  return (
    <div>
      <Navbar/>
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:ml-10 mt-5">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 md:pt-10 md:mx-10">
                {data.map((products,i) => (
                    <AllProuducts key={i} products={products} />
                ))}

                
            </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

            <Footer/>
    </div>
  )
}

export default All
