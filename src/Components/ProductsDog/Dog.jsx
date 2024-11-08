import React, { useEffect, useState} from 'react'

import DogProducts from './DogProducts'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import dog from '../Assets/dog.webp'
import api from '../../utils/axiosConfig'
import { getWishlist } from '../Wishlist/wishlist'

const Dog = () => {
    const [data,setData] = useState([])
    const [wishlist, setWishlist] = useState([]);

    const user = localStorage.getItem('user')

    useEffect(() => {
      const fetchCat = async () => {
        try {
          const res = await api.get(`/users/products/category/dog`);
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
    <div >
      <Navbar/>
      {/* <h1 className="mb-2 text-3xl font-bold tracking-tight md:ml-10 mt-5">Dog</h1> */}
        <div className='flex items-center mt-5 justify-center md:mt-10'>
          <img className='w-[99%]'
            src={dog} alt="" />
        </div>
    <div className='grid grid-cols-2 md:grid-cols-5 md:pt-10 md:mx-10'>
      {data?.map((dogproducts)=>(
        <DogProducts key={dogproducts._id} products={dogproducts} wish={wishlist.some(item => item._id === dogproducts._id)}/>
      ))}
    </div>
      <Footer/>
      
    </div>
  )
}

export default Dog
