import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/axiosConfig";
import { toast } from "sonner";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  console.log(user.orders);
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full md:max-w-2xl max-h-[80vh] overflow-y-auto text-gray-800">
        <h2 className="text-2xl font-semibold mb-6">User Details</h2>

        <div className="mb-4">
          <p>
            <span className="font-semibold">ID:</span> {user._id}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {user.userName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Blocked:</span>{" "}
            {user.isBlocked ? "Yes" : "No"}
          </p>
        </div>

        {user.orders &&
        user.orders.length > 0 ? (
          user.orders.map((orderKey, index) => {
            const order = user.orderedProducts[orderKey];
            return (
              <div key={orderKey} className="bg-white p-4 rounded-lg mb-4 ">
                <h3 className="text-lg font-semibold mb-3">
                  Order {index + 1}
                </h3>

                <div className="mb-4  ">
                  
                  {order.productData.map((product) => (
                  <div className="flex  gap-5 justify-between px-5 shadow-lg mt-5 h-40 items-center">
                      <div key={product.id} className="mb-3 ">
                      <p>
                        <span className="font-semibold">Product Name:</span>{" "}
                        {product.name}
                      </p>
                      <p>
                        <span className="font-semibold">Category:</span>{" "}
                        {product.category}
                      </p>
                      <p>
                        <span className="font-semibold">Price:</span> $
                        {product.price}
                      </p>
                      <p>
                        <span className="font-semibold">Count:</span>{" "}
                        {product.count}
                      </p>
                    </div>
                    <img className="w-[100px] shadow-md"
                      src={product.image} alt="" />
                  </div>
                  ))}
                </div>

                
              </div>
            );
          })
        ) : (
          <div className="bg-red-600 p-4 rounded-lg mb-4">
            <p>No orders found for this user.</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fn = async () => {
    try {
      const response = await api.get("/admin/users/viewusers");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fn();

  }, []);

  const handleUnBlock = async (id) => {
    try {
      await api.put(`/admin/users/unblockuser/${id}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: false } : user
        )
      );
      toast.success("User unblocked successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to unblock user");
    }
  };

  const handleBlock = async (id) => {
    try {
      await api.put(`/admin/users/blockuser/${id}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: true } : user
        )
      );
      toast.success("User blocked successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to block user");
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="mt-8 w-full">
      <ul className="flex items-center justify-between md:justify-around text-lg font-bold bg-gray-200 h-16 rounded-t-lg">
        <div className="flex items-center justify-between md:justify-around text-lg font-bold  h-16 rounded-t-lg w-[100%]">
        <li className=" px-2 md:px-4 py-2 w-[10%] md:w-[10%] text-center">
          ID
        </li>
        <li className="px-2 md:px-4 py-2 w-[20%] md:w-[20%] text-center">
          Name
        </li>
        <li className=" px-2 md:px-4 py-2 w-[30%] text-center">Email</li>
        </div>
        <li className="px-2 md:px-4 py-2 w-[50%] md:w-[20%] text-center">
          Actions
        </li>
      </ul>

      {users.map((user,ind) => (
        <div  className="flex items-center justify-between md:justify-around bg-white hover:bg-gray-50 border-b last:border-none py-4 text-xs md:text-sm transition duration-300">
          <div
            key={ind}
            onClick={() => handleUserClick(user)}
            className="flex items-center justify-between md:justify-around text-xs md:text-sm transition duration-300 w-[100%]"
          >
            <div className="px-2 sm:px-4 py-2 w-[10%] sm:w-[10%] text-center">
              {user._id}
            </div>
            <div className="px-2 md:px-4 py-2 w-[20%] sm:w-[20%] text-center cursor-pointer truncate">
              {user.userName}
            </div>
            <div className="px-2 md:px-4 py-2 w-[30%] text-center truncate">
              {user.email}
            </div>
          </div>

          <div className="flex space-x-2 px-2 md:px-4 py-2 justify-center w-[50%] md:w-[20%]">
            {user.admin !== true ? (
              <>
                {user.isBlocked ? (
                  <button
                    onClick={() => handleUnBlock(user._id)}
                    className="bg-black text-white px-2 md:px-3 py-1 rounded hover:bg-gray-800 transition duration-300"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(user._id)}
                    className="bg-yellow-500 text-white px-2 md:px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                  >
                    Block
                  </button>
                )}
              </>
            ) : (
              <div className="bg-blue-500 text-white py-1 px-3 rounded">
                Main Admin
              </div>
            )}
          </div>
        </div>
      ))}
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;
