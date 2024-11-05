import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AddCarts } from "../AllProducts/Addcart";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { Items } from "../MainPage/Main";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { toast } from "sonner";
import api from "../../utils/axiosConfig";
import { addWishlist, getWishlist, removeWishlist } from "../Wishlist/wishlist";

const ProductLists = () => {
  const { id } = useParams();
  const [product,setProduct] = useState([])
  const [wish,setWish] = useState(false)
  const {updateCartCount,updateWishlistCount} = useContext(Items)

  const user = localStorage.getItem('user')


  const handleCarts = async (e) => {
    if(user){
      await AddCarts(e,updateCartCount);
    }else{
      toast.warning('Please Login abcdefg')
    }
    
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`users/products/${id}`);
        setProduct(response.data.product); 
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();

    if(user){
      const checkWishlist = async ()=>{
        const wishlist = await getWishlist ()
  
        const isInWishlist = Array.isArray(wishlist) && wishlist.length > 0? wishlist.find(item => item._id ===id) : null
        setWish(isInWishlist);
  
      }
      checkWishlist()
    }

  }, [id]);

  const wishController = (e) => {
    if(user){
      if (wish) {
        removeWishlist(e,updateWishlistCount);
    } else {
        addWishlist(e,updateWishlistCount);
    }
    setWish(!wish)
    }
    else{
      toast.warning('Please Loginaksdfl',)
    }
  }

  
  return (
    <div>
      <Navbar />
      <div className="p-4 md:p-8 bg-gray-100 ">
        
        
          <div
            key={product._id}
            className="bg-white relative rounded-lg shadow-lg md:mx-20 mx-5 my-10 p-6 flex flex-col md:flex-row gap-10 items-center justify-around"
          >
            {wish?<div onClick={()=>wishController(product._id)} className="absolute right-5 top-5 text-red-600 text-4xl"><FaHeart/></div>:
            <div onClick={()=>wishController(product._id)} className="absolute right-5 top-5 text-red-600 text-4xl"><CiHeart/></div>
            }
            {/* Product Image */}
            <div className="flex-1 max-w-sm md:max-w-md">
              <img
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
                src={product.image}
                alt={product.name}
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between gap-4 md:ml-20">
              {/* Product Title and Description */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <p className="text-lg text-gray-700 mt-2">
                  {product.description}
                </p>
              </div>

              
              <div className="text-base font-semibold space-y-2">
             
                {product.quantity && (
                  <div>
                    <span className="font-medium text-gray-600">Quantity: </span>
                    <span className="text-gray-900">{product.quantity}</span>
                  </div>
                )}

                <div className="text-lg">
                  <span className="font-medium text-gray-600">Category: </span>
                  <span className="text-gray-900">{product.productCategory}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Brand: </span>
                  <span className="text-gray-900">{product.brand}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600">Rating: </span>
                  <span className="text-green-600 ml-2 font-bold">
                    {product.rating} ★
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Price: </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              
              <button
                onClick={() => handleCarts(product)}
                className="text-white bg-[#65a30d] hover:bg-[#4d7c0f] py-3 px-6 rounded-md mt-4 w-full transition duration-300 ease-in-out md:w-[25vw]"
              >
                Add to cart
              </button>
            </div>
          </div>
       
      </div>
      <Footer />
    </div>
  );
};

export default ProductLists;
