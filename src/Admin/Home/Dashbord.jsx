import React, { useContext, useEffect, useState } from 'react';
import { Products } from '../AdminMain/AdminMain';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import api from '../../utils/axiosConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [users,setUsers] = useState([])
  const [orders,setOrders] = useState([])
  const [profit,setProfit] = useState([])
  const [orderedProducts,setOrderedProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/admin/products/viewproducts");
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalUsers = async () =>{
    try {
      const response = await api.get('/admin/users/viewusers')
      setUsers(response.data)
    } catch (error) {
      
    }
  }
  
  const totalOrders = async () =>{
    try {
      const response = await api.get('/admin/orders/orderdetails')
      setOrders(response.data)
    } catch (error) {
      
    }
  }

  const totalRevenue = async () =>{
    try {
      const response = await api.get('/admin/orders/orderstats')
      setProfit(response.data.data[0].totalRevenue)
      setOrderedProducts(response.data.data[0].totalProducts)
    } catch (error) {
      
    }
  } 

  useEffect(() => {
    totalUsers()
    fetchProducts()
    totalOrders()
    totalRevenue()
  },[] );
  
  
  const productChartData = {
    labels: ['Total Products'],
    datasets: [
      {
        label: 'Products',
        data: [data.length],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const orderChartData = {
    labels: ['Total Orders', 'Total Ordered Products'],
    datasets: [
      {
        label: 'Orders',
        data: [orders.length, orderedProducts], 
        backgroundColor: [
          'rgba(215, 204, 21, 0.5)', 
          'rgba(14, 17, 214, 0.5)',  
        ],
        borderColor: [
          'rgba(250, 204, 21, 1)', 
          'rgba(14, 17, 214, 1)',  
        ],
        borderWidth: 1,
      },
    ],
  };
  

  const userChartData = {
    labels: ['Total Users'],
    datasets: [
      {
        label: 'Users',
        data: [users.length],
        backgroundColor: 'rgba(59, 130, 246, 0.5)', 
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const profitChartData = {
    labels: ['Total Profit'],
    datasets: [
      {
        label: 'Profit',
        data: [profit],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Products */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800">Total Products</h2>
            <p className="text-gray-600 mt-2">{data.length}</p>
            <div className="w-full max-w-xs">
              <Bar data={productChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800">Total Orders</h2>
            <p className="text-gray-600 mt-2">Orders: {orders.length}</p>
            <p className="text-gray-600 mt-2"> Ordered Products: {orderedProducts}</p>
            <div className="w-full max-w-xs">
              <Pie data={orderChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
            <p className="text-gray-600 mt-2">{users.length}</p>
            <div className="w-full max-w-xs">
              <Bar data={userChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>

          {/* Total Profit */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800">Total Profit</h2>
            <p className="text-gray-600 mt-2">${profit}</p>
            <div className="w-full max-w-xs">
              <Bar data={profitChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
