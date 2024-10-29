import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AddCarts } from "./Addcart";
import { toast } from "sonner";
import { Items } from "../MainPage/Main";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { addWishlist, removeWishlist } from "../Wishlist/wishlist";

const AllProuducts = ({ products }) => {
  const navigate = useNavigate();
  const [wish, setWish] = useState(false);

  const wishController = (e) => {
    !wish ? setWish(true) : setWish(false);
    !wish ? addWishlist(e):removeWishlist(e)
  };

  const handleCarts = async (e) => {
    await AddCarts(e);
  };
  return (
    <div className="w-[200px] md:w-[270px] flex flex-col shadow-lg bg-white p-2 rounded-lg justify-between md:ml-3 mt-10 relative">
      {/* {!wish?<div onClick={wishController} className="absolute right-3 text-red-600 text-2xl "><CiHeart /></div>:
      <div onClick={wishController} className="absolute right-3 text-red-600 text-2xl "><FaHeart /></div>

      } */}
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
              {products.ratings} ★
            </span>
            <h4 className="text-gray-900 text-lg font-semibold">
              ${products.price}
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
