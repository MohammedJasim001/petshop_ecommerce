import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AddCarts } from "../Cart/Addcart";
import { toast } from "sonner";
import { Items } from "../MainPage/Main";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { addWishlist, getWishlist, removeWishlist } from "../Wishlist/wishlist";

const AllProuducts = ({ products }) => {
  const navigate = useNavigate();
  const [wish, setWish] = useState(false);
  const {updateCartCount,updateWishlistCount} = useContext(Items)

  const user = localStorage.getItem('user')

  useEffect(()=>{
    if(user){
    const checkWishlist = async ()=>{
      const wishlist =await getWishlist ()

      const isInWishlist = Array.isArray(wishlist) && wishlist.length > 0? wishlist.find(item => item._id === products._id) :null
      setWish(isInWishlist);

    }
    checkWishlist()
    }

  },[products._id])
  

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
      toast.warning('Please Login')
    }

};

  

  const handleCarts = async (e) => {
    user?await AddCarts(e,updateCartCount) : toast.warning('Please Login')
  };
  return (
    <div className="w-[200px] md:w-[270px] flex flex-col shadow-lg bg-white p-2 rounded-lg justify-between md:ml-3 mt-10 relative">
 

       
      <div>
        {!wish ? (
          <div
            onClick={()=>wishController(products._id)}
            className="absolute right-3 text-red-600 text-2xl "
          >
            <CiHeart />
          </div>
        ) : (
          <div
            onClick={()=>wishController(products._id)}
            className="absolute right-3 text-red-600 text-2xl "
          >
            <FaHeart />
          </div>
        )}
        <div onClick={() => navigate(`/productdetails/${products._id}`)}>
          <img
            className="w-[200px] gap-2 rounded-lg m-auto mt-3 h-[200px] "
            src={products.image}
            alt=""
          />

          <div className="flex flex-col gap-[10px]  ">
            <h1 className="font-bold text-gray-900">{products.title}</h1>
            <span className="text-green-600 font-bold">
              {products.rating} ★
            </span>
            <h4 className="text-gray-900 text-lg font-semibold">
             ₹{products.price}
            </h4>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleCarts(products)}
        className="bg-[#65a30d] p-3 mt-2 rounded-md text-white"
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default AllProuducts;
