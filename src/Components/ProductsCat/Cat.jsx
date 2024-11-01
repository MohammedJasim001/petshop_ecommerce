import React, { useContext, useState} from 'react'
import ProductsCat from './ProductsCat'
import { Items } from '../MainPage/Main'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import cat from '../Assets/cat.webp'
import api from '../../utils/axiosConfig'

const Cat = () => {
  const {data} = useContext(Items)

  // const [data,setData] = useState([])

  // const cat = async ()=>{
  //   try {
  //     const res = await api.get('/users/products/category/Cat')
  //     console.log(res);
  //     setData(res.data)
      
  //   } catch (error) {
  //     console.log(error.response.data.message);
      
  //   }
  
  // }

  console.log(data.products);
  

  return (
    
    <div>
      <Navbar/>
       <div className='pt-5 bg-gray-100'>
      {/* <h1 className="md:ml-10 text-3xl font-sans font-bold ">Cat </h1> */}
    <div className='flex items-center justify-center mt-5 md:mt-5'>
      <img className='w-[99%]'
        src={cat} alt="" />
    </div>
     <div  className='grid grid-cols-2 md:grid-cols-5 md:pt-10 md:mx-10 '>
      
        {data?.products?.filter((item)=>item.category==='Cat').map((products)=>(
          <ProductsCat key={products.id} products={products}/>
        ))}
     </div>
      
    </div>
    <Footer/>
    </div>

   
  )
}

export default Cat
