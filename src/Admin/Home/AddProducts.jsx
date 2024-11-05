import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "../../utils/axiosConfig";

const AddProducts = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [imageView,setImageView] = useState(null)
  const [image,setImage] = useState(null)
  const [input, setInput] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    quantity:'',
    brand:'',
    rating:'',
    productCategory:'',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }))
    console.log(`${name}:`,value);
    
  };
  
  const handleImage=(e)=>{
    const file = e.target.files[0]
    setImage(file)
    setImageView(URL.createObjectURL(file))
  }

  const handleSaveProduct = async () => {
    const {  title, price, category,  description,  } = input;


    if (
      !title ||
      !price ||
      !category ||
      !description 

    ) {
      toast.warning("Fill the required details.");
      return;
    }

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("category", input.category);
    formData.append('quantity',input.quantity);
    formData.append('brand',input.brand);
    formData.append('rating',input.rating);
    formData.append('productCategory',input.productCategory)

    if (image) {
      formData.append("image", image);
    }
    try {
        await api.post(`/admin/products/addproducts`,formData,{
        headers:{
          "Content-Type":'multipart/form-data'
        }
      });
      // setData([...data, response.data]);
      toast.success("Product added");
      navigate('/admin/products')
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };


  const handleCancel = ()=>{
    setInput({
    title:'',price:'',category:'',brand:'',description:'',rating:'',productCategory:'',quantity:''
    })
    setImage(null)
    setImageView(null)
  }

  return (
    <div className="mt-8 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-8 space-y-6 md:flex justify-between shadow-lg gap-2">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add Product</h2>


          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={input.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={input.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={input.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={input.brand}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              name="description"
              value={input.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="ml-8 flex-shrink-0">
            <img
              className="w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-md"
              src={imageView}
              alt="Product"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="file"
              name="image"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleImage}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={input.rating}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ProductCategory
            </label>
            <input
              type="text"
              name="productCategory"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={input.productCategory}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Qty
            </label>
            <input
              type="text"
              name="quantity"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={input.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={handleSaveProduct}
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
