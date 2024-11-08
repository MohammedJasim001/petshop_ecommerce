import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminProduct from "./AdminProduct";
import Users from "./Users";
import Dashbord from "./Dashbord";
import AddProducts from "./AddProducts";
import { VscThreeBars } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { BiCartAdd } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { Products } from "../AdminMain/AdminMain";
import { CiLogout } from "react-icons/ci";
import { RiUserSharedLine } from "react-icons/ri";
import AdminNonofThis from "../AdminMain/AdminErrorPage";

const AdminHome = () => {

  const navigate = useNavigate();
  const { url } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const Data = [
    { title: "Users", url: "users", icon: <FaUsers /> },
    { title: "Products", url: "products", icon: <IoIosCart /> },
    { title: "Dashboard", url: "dashbord", icon: <MdSpaceDashboard /> },
    { title: "Add Products", url: "addproducts", icon: <BiCartAdd /> },
  ];


  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 w-full absolute">
        <nav className="bg-[#3b82f6] shadow w-full fixed top-0 left-0 z-20">
          <div className="mx-auto px-6 py-4 flex justify-between items-center h-[10vh]">
            <div className="flex gap-2">
              <button
                className="text-white md:hidden focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <VscThreeBars />
              </button>
              <div className="text-xl font-semibold text-white">Admin</div>
            </div>

            <div className="flex gap-2 md:gap-5">
              <div className="flex items-center gap-2 text-white hover:text-gray-300"
                onClick={() => navigate(`/`)}>
              <RiUserSharedLine  className="text-2xl"/>
                <button
                  className=" md:mr-4 hidden md:block"
                >
                  User Page
                </button>
              </div>
              <div className="flex items-center gap-2 text-white hover:text-gray-300" onClick={handleLogout}>
                <CiLogout className="text-2xl " />
                <button className=" mr-4 hidden md:block">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div
          className={`fixed mt-10 bg-[#10b981] text-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out w-72 h-full pt-20 z-10 md:translate-x-0`}
        >
          {Data.map((item, ind) => (
            <Link
              key={ind}
              className="block w-[80%] mx-auto "
              to={`/admin/${item.url}`}
              onClick={() => setIsOpen(false)}
            >
              <div className="hover:bg-[#34d399] rounded px-6 py-2 mb-4 flex items-center text-xl gap-2" >
                <div className="text-4xl text-black"> {item.icon}</div>
                <div> {item.title}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex-1 ml-0 md:ml-72 w-[98%] p-6 pt-20">
          {url === "users" ? (
            <Users />
          ) : url === "products" ? (
            <AdminProduct />
          ) : url === "dashbord" ? (
            <Dashbord />
          ) : url === "addproducts" ? (
            <AddProducts />
          ) : (
            <div><AdminNonofThis/></div>
          )}
        </div>


    </div>
  );
};

export default AdminHome;
