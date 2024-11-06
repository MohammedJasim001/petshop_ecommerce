import React, { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import api from "../../utils/axiosConfig";
import { removeWishlist } from "./wishlist";
import { Items } from "../MainPage/Main";

const Wishlist = () => {
  const [wishItem,setWishItem] = useState([])
  const {updateWishlistCount} = useContext(Items)

  const user = localStorage.getItem('user')
  const userId = JSON.parse(user)._id
  
  const handleRemove = async(productId)=>{
   await removeWishlist(productId,updateWishlistCount)
   setWishItem((prevWishItems) =>
    prevWishItems.filter((wish) => wish.productId._id !== productId)
  );
  }

  const wishlistItems = async ()=>{
   
    try {
        const response = await api.get(`/users/${userId}/wishlist`)
        setWishItem(response.data)
    } catch (error) {
        console.log(error?.response?.data?.message)
    }    
  }

  useEffect(()=>{
    wishlistItems()

  },[])


  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-5">
        {wishItem.length > 0 ? (
          <div className=" ">
            <div className=" grid md:grid-cols-3 gap-3">
              {wishItem.map((e,i) => (
                <div
                  key={e.productId._id}
                  className="p-3 bg-white shadow-xl rounded-lg flex gap-10"
                >
                  <div>
                    <img
                      src={e.productId.image}
                      alt={e.productId.name}
                      className="h-[170px] rounded-lg shadow-xl p-2 w-[150px]"
                    />
                  
                  </div>

                  <div className="flex flex-col justify-around">
                    <div>
                      <div className="font-bold">{e.productId.title}</div>
                      <div>
                        <span className="font-serif text-gray-600">
                          Price :
                        </span>
                        <span className="font-bold text-2xl">
                         ₹{e.quantity * e.productId.price}
                        </span>
                      </div>
                      <div>
                        <span className="font-serif text-gray-600">
                          Brand :
                        </span>
                        <span className="font-semibold">{e.productId.brand}</span>
                      </div>
                      <div>
                        <span className="font-serif text-gray-600">
                          Ratings :
                        </span>
                        <span className="font-semibold">{e.productId.rating}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={()=>handleRemove(e.productId._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg  mt-1"
                      >
                        REMOVE FROM WISHLIST
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
          </div>
        ) : (
          <div className="text-xl font-bold  py-[50px]">
            Your Wishlist is empty!
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
