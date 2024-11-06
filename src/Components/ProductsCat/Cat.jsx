import React, { useContext, useEffect, useState} from 'react'
import ProductsCat from './ProductsCat'
import { Items } from '../MainPage/Main'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import cat from '../Assets/cat.webp'
import api from '../../utils/axiosConfig'

const Cat = () => {
  // const {data} = useContext(Items)

  const [data,setData] = useState([])

  const fetchCat = async ()=>{
    try {
      const res = await api.get(`/users/products/category/${'cat'}`)
      setData(res.data.product)
      
    } catch (error) {
      console.log(error?.response?.data?.message);
      
    }
  
  }
  useEffect(()=>{
    fetchCat()
  },[])  

  return (
    
    <div>
      <Navbar/>
       <div className='pt-5 bg-gray-100'>
    <div className='flex items-center justify-center mt-5 md:mt-5'>
      <img className='w-[99%]'
        src={cat} alt="" />
    </div>
     <div  className='grid grid-cols-2 md:grid-cols-5 md:pt-10 md:mx-10 '>
      
        {data?.map((products)=>(
          <ProductsCat key={products.id} products={products}/>
        ))}
     </div>
      
    </div>
    <Footer/>
    </div>

   
  )
}

export default Cat
