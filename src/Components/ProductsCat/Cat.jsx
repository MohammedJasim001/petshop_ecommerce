import React, { useContext, useEffect, useState} from 'react'
import ProductsCat from './ProductsCat'
import { Items } from '../MainPage/Main'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import cat from '../Assets/cat.webp'
import api from '../../utils/axiosConfig'
import { getWishlist } from '../Wishlist/wishlist'

const Cat = () => {
  // const {data} = useContext(Items)

  const [data,setData] = useState([])
  const [wishlist, setWishlist] = useState([]);

  const user = localStorage.getItem('user')


  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await api.get(`/users/products/category/cat`);
        setData(res.data.product);
      } catch (error) {
        console.error('Error fetching products:', error?.response?.data?.message);
      }
    };

    const fetchWishlist = async () => {
      if (user) {
        try {
          const wishlists = await getWishlist();
          setWishlist(wishlists);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };

    fetchCat();        
    fetchWishlist();   

  }, [user]);

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
          <ProductsCat key={products._id} products={products} wish={wishlist.some(item => item._id === products._id)}/>
        ))}
     </div>
      
    </div>
    <Footer/>
    </div>

   
  )
}

export default Cat
