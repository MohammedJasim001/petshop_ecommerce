import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Items } from "../MainPage/Main";
import SearchResults from "./SearchResults";
import { FaCartPlus } from "react-icons/fa";
import { MdLogout, MdVerified, MdAccountCircle } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";
import icon from "../Assets/icon.png";
import { FaPaw, FaSmile, FaHeart } from "react-icons/fa";
import api from "../../utils/axiosConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const {cart,setCart} = useContext(Items)
  const [input, setInput] = useState("");
  const [isLogine, setIsLogine] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [theUser, setTheUser] = useState([]);

 
  //   const user = localStorage.getItem('user')
  //   const userId = JSON.parse(user)._id
  // const fetchUser = async () => {
      
  //   try {
  //     const response =  await api.get(`/users/${userId}/cart`)
  //     console.log(response,'hahahahaha')
  //     setCart(response.data);
  //     console.log(response.data);
      
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchUser();
  // },[]);

  const cartCountSettings = cart.length;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      position: "top-end",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setIsLogine(false);
        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          position: "top-end",
        });
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLogine(true);
    }
  }, [isLogine]);

  // const results = data.filter((product) => {
  //   return (
  //     input &&
  //     product &&
  //     product.name &&
  //     product.name.toLowerCase().includes(input.toLowerCase())
  //   );
  // });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDrop = () => {
    isDrop == false ? setIsDrop(true) : setIsDrop(false);
  };

  return (
    <div className=" h-20 md:h-24 bg-black shadow-md text-white">
      <div className="flex md:justify-around items-center py-5 pr-2 md:mx-36">
        <button onClick={() => navigate(-1)} className="flex ">
          <FaPaw className="text-2xl md:text-3xl text-[#5b9e5b] mt-1"/>
          <h1 className=" text-2xl md:text-4xl font-bold text-white pr-2">
            Luna<span className="text-[#5b9e5b]">Pets</span>
          </h1>
        </button>

        <div className="relative flex items-center w-full md:ml-32 md:mr-32">
          <input
            className="border border-gray-300 h-10 md:h-14 rounded-lg pl-10 pr-4 w-full text-black "
            placeholder="Search Products..."
            onChange={handleChange}
            value={input}
            type="text"
          />
          <FaSearch className="absolute left-3 text-gray-800" />
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          {isLogine && (
            <Link to="/orders" className="flex items-center ">
              <MdVerified className="text-2xl md:text-4xl text-white" />
              <button className="hidden md:block ml-2">Orders</button>
            </Link>
          )}

          {isLogine ? (
            <Link to="/cart" className="relative flex items-center">
              <FaCartPlus className="text-2xl md:text-4xl text-white mr-2" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center">
                {cartCountSettings}
              </span>
            </Link>
          ) : (
            <FaCartPlus
              onClick={() => toast.warning("Please Login")}
              className="text-2xl md:text-4xl text-white ml-2"
            />
          )}
          {/* <button>
            {" "}
            
          </button> */}
          {isLogine ? (
            <div className="flex items-center">
              <button
                className="rounded-full bg-blue-950 w-[25px] md:w-[40px] h-[25px] md:h-[40px] text-white md:text-xl"
                onClick={handleDrop}
              >
                {theUser.name ? theUser.name.trim().toUpperCase()[0] : ""}
              </button>
            </div>
          ) : (
            <Link to="/signin" className="flex items-center">
              <MdAccountCircle className="text-2xl md:text-4xl text-white" />
              <button className="hidden md:block ml-2">LogIn</button>
            </Link>
          )}
        </div>
      </div>
      {isDrop && isLogine && (
        <div className="bg-gray-400 fixed right-5 w-[250px] h-[270px] top-20 rounded-md flex flex-col items-center justify-around shadow-lg p-4 z-50">
          <div className="rounded-full bg-blue-950 w-[60px] h-[60px] flex items-center justify-center text-white text-2xl shadow-md">
            {theUser.name ? theUser.name.trim().toUpperCase()[0] : ""}
          </div>

          <div className="flex flex-col items-center space-y-1 pt-3">
            <div className="text-xl font-sans font-semibold text-gray-900">
              Hi, {theUser.name}
            </div>
            <div className="text-lg font-sans font-medium text-gray-800">
              {theUser.email}
            </div>
          </div>
          <div>
            {theUser.admin === true && (
              <button
                onClick={() => navigate(`/admin/users`)}
                className="bg-blue-600 text-white rounded-lg p-2 text-lg"
              >
                Admin Page
              </button>
            )}
          </div>
          <div className="">
          <div className="flex p-2 rounded-lg mt-2 text-red-600" onClick={handleLogout}>
            <MdLogout className="text-xl md:text-3xl cursor-pointer" />
            <button className=" ml-2">LogOut</button>
          </div>
          
          </div>
         
        </div>
      )}
      <div>
        {/* <SearchResults results={results} setInput={setInput} /> */}
      </div>
    </div>
  );
};

export default Navbar;
