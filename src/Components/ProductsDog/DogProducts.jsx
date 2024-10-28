import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Items } from '../MainPage/Main'
import { AddCarts } from '../AllProducts/Addcart'
import { FaHeart } from "react-icons/fa";



const DogProducts = ({products}) => {
  const navigate = useNavigate()
  const {fetchUserData}=useContext(Items)

  const handleCarts = async(e) => {
    await AddCarts(e);
    await fetchUserData()
   };

  return (
    <div className="w-[200px] md:w-[270px] flex flex-col shadow-lg bg-white p-2 rounded-lg justify-between mt-10 relative">
      <div className="absolute right-3 text-red-500 text-2xl"><FaHeart /></div>
      <div
        onClick={() => navigate(`/productdetails/${products.id}`)}
      >
        <img
          className="w-[200px] gap-2 rounded-lg m-auto mt-3 h-[200px] mb-3"
          src={products.image}
          alt=""
        />

        <div className="flex flex-col gap-[10px]  ">
          <h1 className=" font-bold text-gray-900">
            {products.name}
          </h1>
          <span className="text-green-600 font-bold">{products.ratings} ★</span>
          <h4 className="text-gray-900 text-lg font-semibold">
            ${products.price}
          </h4>
        </div>
        
      </div>
      <button onClick={()=>handleCarts(products)}
         className='bg-[#65a30d] p-3 mt-2 rounded-md text-white'>ADD TO CART</button>
    </div>
  )
}

export default DogProducts
