import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { Items } from "../MainPage/Main";
import api from "../../utils/axiosConfig";
import { removeWishlist } from "./wishlist";

const Wishlist = () => {
  const [wishItem,setWishItem] = useState([])
  const [refresh,setRefresh] = useState([])

  const user = localStorage.getItem('user')
  const userId = JSON.parse(user)._id
  console.log(userId);
  
  console.log(wishItem);
  const handleRemove=async(e)=>{
   await removeWishlist(e)
    setRefresh(!refresh)
  }

  const wishlistItems = async ()=>{
   
    try {
        const response = await api.get(`/users/${userId}/wishlist`)
        setWishItem(response.data)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data.message)
    }    
  }

  useEffect(()=>{
    wishlistItems()

  },[refresh])


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
                          {e.quantity * e.productId.price}$
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
                        <span className="font-semibold">{e.productId.ratings}</span>
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
