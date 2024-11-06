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
      
      if (user) {
        try {
          const response = await api.get(`/users/${userId._id}/orders`);
          
          setOrders(response.data);          
        } catch (err) {
          console.error(err?.response?.data?.message);
          toast.error("Failed to fetch orders.");
        }
      }
    };

    fetchOrders();
  }, []);
 

  return (
    <div>
    <Navbar />
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length > 0 ? (
        <div className="flex flex-col gap-6">
          {orders?.map((order, index) => (
            <div key={index} className="flex flex-col border p-4 rounded-lg shadow-lg">
              <div className="md:ml-20 text-base">
              Order Date: 
                <span className="font-semibold"> {order.purchaseDate.slice(0,10)}</span>
                
              </div>
              <div className="flex flex-col gap-4 md:w-[70%] md:ml-[15%]">
                {order?.products?.map((productItem, ind) => (
                  <div key={ind} className="flex p-4 border rounded-lg shadow justify-between">
                    <div className="">
                      <img className="w-28 h-28" src={productItem.productId.image} alt={productItem.productId.title} />
                    </div>
                    <div className="">
                      <h2 className="text-lg md:text-2xl font-semibold">{productItem.productId.title}</h2>
                      <p>Quantity: {productItem.quantity}</p>
                      <p>Price: ₹{productItem.productId.price * productItem.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4 md:mr-10">
                Total Amount: ₹<span className="font-semibold">{order.totalPrice}</span>
              </div>
            </div>
          ))}
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
