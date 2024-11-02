import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Items } from "../MainPage/Main";
import { toast } from "sonner";
import axios from "axios";

const Registration = () => {
  const { users } = useContext(Items);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [profileImage,setProfileImage] = useState(null)

  const handleSubmit = async (e) => {
    
   
    e.preventDefault();
    setFormErrors(validate(input));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const user = users.find((e) => e.email === input.email);
        if (user) {
          toast.warning("E-mail already exists");
          return
        } 
      } catch (err) {
        console.log(err);
      }
    }

    
    const formData = new FormData();
    formData.append("userName", input.userName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    
    if (profileImage ) {
      formData.append("image",profileImage);
    }
    console.log(...formData.entries(), 'formData content');


    try {
      console.log(formData,'hello');
      
     const response = await axios.post("http://localhost:5000/api/users/register",formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
     })
     toast.success(response.data.message,'success')
     navigate("/signin");
    } catch (error) {
      toast.warning(error.response.data.error)
      console.log(error.response.data.message,'jskljl')
    }
  };

  const handleProfile = (e)=>{
    setProfileImage(e.target.files)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.userName = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid Email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm your password";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Passwords don't match";
    }
    return errors;
  };




  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800">Register</h2>

        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name"
          name="userName"
          value={input.userName}
          onChange={handleChange}
        />
        <span className="text-red-600 text-sm">{formErrors.name}</span>

        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="E-mail"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
        <span className="text-red-600 text-sm">{formErrors.email}</span>

        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <span className="text-red-600 text-sm">{formErrors.password}</span>

        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
          name="cpassword"
          value={input.cpassword}
          onChange={handleChange}
        />
        <span className="text-red-600 text-sm">{formErrors.cpassword}</span>

        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          placeholder="Select image file"
          name="image"
          value={input.image}
          onChange={handleProfile}
        />
       

        <button className="bg-blue-500 text-white py-3 w-full rounded-lg hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
