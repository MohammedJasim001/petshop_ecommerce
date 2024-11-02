import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import api from "../../utils/axiosConfig";
import { toast } from "sonner";

const AdminProduct = () => {
  const [data, setData] = useState([]);
  const [items, setIteam] = useState([]);
  const [open, setIsOPen] = useState(false);

  const fn = async () => {
    try {
      const response = await api.get("admin/products/viewproducts");
      setData(response.data);
    } catch (err) {
      console.log(err,'asdjlfk');
    }
  };
  useEffect(() => {
    fn();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    category: "",
    brand: "",
  });

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  console.log(editProduct._id);
  

  const handleSaveProduct = async () => {
    try {
      const response = await api.put(`/admin/products/updateproduct/${editProduct._id}`
      );
      setIsModalOpen(false);

    } catch (err) {
      console.error(err);
    }
    fn();
  };
  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`http://localhost:3000/products/${id}`);
    // } catch (err) {
    //   console.error(err);
    // }
    // fn();
  };

  const handleOpen = (datas) => {
    setIteam([datas]);
    console.log(datas);

    setIsOPen(true);
  };

  return (
    <div>
      <div>
        {!open ? (
          <div className="mt-8 ">
            <h2 className="text-2xl font-semibold text-gray-800">Product List</h2>
            <ul className="flex items-center justify-around text-lg font-bold bg-gray-200 h-16 rounded-t-lg mt-3">
              <div className="flex items-center md:justify-around text-lg font-bold  h-16 rounded-t-lg w-[100%]">
              <li className="px-4 py-2  md:w-[10%] text-center">ID</li>
              <li className="px-4 py-2  md:w-[30%] text-center">Name</li>
              <li className="hidden md:block px-4 py-2 w-[20%] text-center">
                Image
              </li>
              </div>
              <li className="px-4 py-2  md:w-[20%] text-center mr-8 md:mr-0">Actions</li>
            </ul>
            <div></div>
            {data.map((product,ind) => (
              <div className="flex items-center justify-around bg-white hover:bg-gray-50 border-b last:border-none py-4 text-sm sm:text-base transition duration-300">
                <div
                  onClick={() => handleOpen(product)}
                  key={ind}
                  className="flex items-center md:justify-around   text-sm sm:text-base transition duration-300 w-[100%]"
                >
                  <div className="px-4 py-2  md:w-[10%] text-center">
                    {ind+1}
                  </div>
                  <div className="px-4 py-2 md:w-[30%]  ">
                    {product.title}
                  </div>
                  <div className="hidden  px-4 py-2 w-[20%] md:flex justify-center">
                    <img
                      className="w-[80px] h-[80px] object-cover rounded"
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                </div>
                <div className="flex space-x-2 px-4 py-2 justify-center md:w-[20%] ">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300 ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-8">
              <div className="p-4 md:p-8 bg-gray-50">
                {items.map((datas) => (
                  <div
                    key={datas._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col md:flex-row md:mx-20 mx-5 my-5 p-4"
                  >
                    <div className="flex-shrink-0 md:w-[300px]">
                      <img
                        className="w-full h-[300px] object-cover rounded-lg"
                        src={datas.image}
                        alt={datas.title}
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4 mt-4 md:mt-0 md:ml-10 gap-2">
                      <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                          {datas.title}
                        </h1>
                        <p className="text-gray-700 mt-2">
                          {datas.description}
                        </p>
                        <div className="mt-2">
                          <span className="text-gray-700">{datas.qty}</span>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium text-gray-600">
                            Category:{" "}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {datas.item}
                          </span>
                        </div>
                      </div>
                      <div className="text-base font-semibold mt-4">
                        <div>
                          <span className="font-medium text-gray-600">
                            Brand:{" "}
                          </span>
                          <span className="text-gray-900">{datas.brand}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="font-medium text-gray-600">
                            Rating:{" "}
                          </span>
                          <span className="text-green-600 ml-2 font-bold">
                            {datas.ratings} ★
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium text-gray-600">
                            Price:{" "}
                          </span>
                          <span className="text-2xl font-bold text-gray-900">
                            ${datas.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="bg-blue-500 p-3 hover:bg-blue-600 text-white font-bold  rounded-md w-[100px] "
                onClick={() => setIsOPen(false)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto pt-5">
            <div className="bg-white rounded-lg w-full max-w-4xl p-8 space-y-6 md:flex justify-between shadow-lg gap-2">
              <div className="flex-1 space-y-6 ">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Edit Product
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product ID
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                    value={editProduct._id}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.title}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        category: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.brand}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        brand: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    name=""
                    id=""
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="flex-1 space-y-6 ">
                <div className="ml-8 flex-shrink-0">
                  <img
                    className="w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-md"
                    src={editProduct.image}
                    alt="Product"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.image}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.ratings}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        ratings: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ProductCategory
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.item}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, item: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Qty
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editProduct.qty}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, qty: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={handleSaveProduct}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;
