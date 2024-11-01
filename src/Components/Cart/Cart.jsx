import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RemovCart } from "../AllProducts/Addcart";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { Items } from "../MainPage/Main";
import api from "../../utils/axiosConfig";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleRemove = async (item) => {
    await RemovCart(item);
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.productId._id !== item.productId._id));
    console.log(item)
  };


  const user = localStorage.getItem('user')
  const userId = JSON.parse(user)._id
  const fetchUser = async () => {
    
    try {
      const response =  await api.get(`/users/${userId}/cart`)
      setCart(response.data);
      console.log(response.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);

  const clickIncrease = async(item)=>{
    try {
      const res = await api.put(`/users/${userId}/cart/${item.productId._id}/increment`)
      console.log(res.data.message)
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.productId._id === item.productId._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  const clickDecrease = async(item)=>{
    try {
      const res = await api.put(`/users/${userId}/cart/${item.productId._id}/decrement`)
      console.log(res.data.message)
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.productId._id === item.productId._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  console.log(cart);

const totalPrice = Array.isArray(cart) && cart.length > 0
? cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
: 0;

const totalItem = Array.isArray(cart) && cart.length > 0
? cart.reduce((acc, item) => acc + item.quantity, 0)
: 0;


  console.log(totalItem);
  

  return (
    <div>
      <Navbar handleRemove={RemovCart} />
      <div className="min-h-screen mt-5">
        {cart.length > 0 ? (
          <div className="md:flex ">
            <div className="md:w-[70%] grid md:grid-cols-2 gap-3">
              {cart.map((e,i) => (
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
                    <button
                      className="text-3xl"
                      onClick={() => clickDecrease(e)}
                    >
                      -
                    </button>
                    <span className="border border-black mx-2 px-3">
                      {e.quantity}
                    </span>
                    <button
                      className="text-3xl"
                      onClick={() => clickIncrease(e)}
                    >
                      +
                    </button>
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
                        onClick={() => handleRemove(e)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg  mt-1"
                      >
                        REMOVE FROM CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:fixed md:right-4 md:top-20 bg-white shadow-lg rounded-lg p-6 border border-gray-200 md:w-[300px] mt-7">
              <h2 className="text-xl font-semibold mb-4">Price Details</h2>

              <div className="flex justify-between mb-4">
                <span className="font-medium">Total Items:</span>
                <span className="font-bold">{totalItem}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="font-medium">Shipping:</span>
                <span className="font-bold">Free</span>
              </div>

              <div className="flex justify-between mb-4 border-t border-gray-300 pt-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-2xl">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="text-center">
                <button
                  onClick={() =>
                    navigate("/buynow", {
                      state: { totalPrice, totalItem, cart },
                    })
                  }
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition duration-300"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xl font-bold  py-[50px]">
            Your Cart is empty!
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
