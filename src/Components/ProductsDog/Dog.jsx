import React, { useEffect, useState} from 'react'

import DogProducts from './DogProducts'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import dog from '../Assets/dog.webp'
import api from '../../utils/axiosConfig'

const Dog = () => {
    const [data,setData] = useState([])

  const fetchDog = async()=>{
      try {
        const response = await api.get(`/users/products/category/${'Dog'}`)
        setData(response.data.product)
      } catch (error) {
        console.log(error?.response?.data?.message);
        
      }
  }   
  useEffect(()=>{
    fetchDog()
  },[])
  
  return (
    <div >
      <Navbar/>
      {/* <h1 className="mb-2 text-3xl font-bold tracking-tight md:ml-10 mt-5">Dog</h1> */}
        <div className='flex items-center mt-5 justify-center md:mt-10'>
          <img className='w-[99%]'
            src={dog} alt="" />
        </div>
    <div className='grid grid-cols-2 md:grid-cols-5 md:pt-10 md:mx-10'>
      {data?.map((dogproducts)=>(
        <DogProducts key={dogproducts._id} products={dogproducts}/>
      ))}
    </div>
      <Footer/>
      
    </div>
  )
}

export default Dog
