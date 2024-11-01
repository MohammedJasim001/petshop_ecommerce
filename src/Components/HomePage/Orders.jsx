import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../../utils/axiosConfig";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = localStorage.getItem("user");
      const userId = JSON.parse(user)
      console.log(userId._id);
      
      if (user) {
        try {
          const response = await api.get(`/users/${userId._id}/orders`);
          console.log(response.data);
          
          setOrders(response.data);          
        } catch (err) {
          console.error(err.response.data.message);
          toast.error("Failed to fetch orders.");
        }
      }
    };

    fetchOrders();
  }, []);
  console.log(orders.map(ele=>ele.productId.map(ele=>ele.title)),'sdlkf');
  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {orders.length > 0 ? (
          <div className="flex flex-col gap-6">
            {orders.map((key, index) => {
              return (
                <div key={index} className="flex justify-around border p-4 rounded-lg shadow-lg">
                 
                  <div className="flex flex-col gap-4 w-[70%]">
                   {key.productId.map((ele,ind)=>(
                    <div
                     key={ind}
                    className="flex p-4 border rounded-lg shadow justify-between"
                  >
                    <div className="">
                      <h2 className="text-2xl font-semibold">{ele.title}</h2>
                      <p>Quantity: {ele.quantity}</p>
                      <p>Price: ${ele.price}</p>
                    </div>
                    <div className="">
                      <img className="w-28" src={ele.image} alt={ele.title} />
                    </div>
                  </div>
                   ))
  
            }
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrdersPage;
