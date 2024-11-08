import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import Footer from "../../HomePage/Footer";
import Navbar from "../../HomePage/Navbar";
import api from "../../../utils/axiosConfig";
import { Items } from "../../MainPage/Main";

const BuyNow = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const { totalPrice, totalItem, cart } = location.state;
  const {setCartCount} = useContext(Items)
  
  
  const [formData, setFormData] = useState({
    name: "",
    mobilenumber: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    payment: "",
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.mobilenumber) {
      tempErrors.mobilenumber = "Mobile Number is required.";
      isValid = false;
    } else if (
      formData.mobilenumber.length < 10 ||
      formData.mobilenumber.length > 10
    ) {
      tempErrors.mobilenumber = "Mobile Number must be 10 digits.";
      isValid = false;
    }

    if (!formData.pincode) {
      tempErrors.pincode = "Pincode is required.";
      isValid = false;
    } else if (formData.pincode.length < 6 || formData.pincode.length > 6) {
      tempErrors.pincode = "Pincode is not valid.";
      isValid = false;
    }

    if (!formData.address) {
      tempErrors.address = "Address is required.";
      isValid = false;
    }

    if (!formData.city) {
      tempErrors.city = "Enter your City/District/Town.";
      isValid = false;
    }

    if (!formData.state) {
      tempErrors.state = "State is required.";
      isValid = false;
    }

    if (!formData.payment) {
      tempErrors.payment = "Please select a payment method";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 // razorpay payment session
 const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

  const handleSubmit =async (productData,totalPrice) => {
    if (validate()) { 
      
      const user = localStorage.getItem("user");
      const userId = JSON.parse(user)
    
      const scriptLoaded = await loadRazorpayScript()
      if(!scriptLoaded){
        return toast.warning('Faild to load')
      }
    
      const orderResult = await api.post(`/users/payment/${userId._id}`,{
        amount:totalPrice
      })
      

      const {amount,id,currency} = orderResult.data

      

      const options = {
        key: "rzp_test_o7wNNPWHCqZm5Q",
        amount: amount.toString(),
        currency: currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: id,
        handler: async function (response) {

          // Step 2: Verify payment
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
  
          };
          
          const verify = await api.post('/users/verifypayment',paymentData)
          toast.success(verify.data.message)
          if(verify.data.success){  
            navigate('/')
            setCartCount(0)
          }
        },
  //saveOrder

        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open()

    } 

  };

  return (
   <div>
    <Navbar/>
     <div className="flex justify-around mt-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(cart,totalPrice);
        }}
        className="w-[40vw] p-6 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile Number:
          </label>
          <input
            type="number"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.mobilenumber ? "border-red-500" : ""
            }`}
          />
          {errors.mobilenumber && (
            <p className="text-red-500 text-xs italic">{errors.mobilenumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pincode:
          </label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.pincode ? "border-red-500" : ""
            }`}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs italic">{errors.pincode}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <textarea
            rows={4}
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-full ${
              errors.address ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-xs italic">{errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City/District/Town:
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.city ? "border-red-500" : ""
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-xs italic">{errors.city}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State:
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.state ? "border-red-500" : ""
            }`}
          />
          {errors.state && (
            <p className="text-red-500 text-xs italic">{errors.state}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Payment Options:
          </label>
          <div className="flex flex-col ml-10 gap-2">
            <div>
              <input
                checked={formData.payment === "cod"}
                id="cod"
                type="radio"
                name="payment"
                value="cod"
                onChange={handleChange}
              />
              <label>Cash on delivery</label>
            </div>
            <div>
              <input
                checked={formData.payment === "upi"}
                id="upi"
                type="radio"
                name="payment"
                value="upi"
                onChange={handleChange}
              />

              <label htmlFor="">UPI</label>
            </div>
            <div>
              <input
                checked={formData.payment === "card"}
                id="card"
                type="radio"
                name="payment"
                value="card"
                onChange={handleChange}
              />
              <label htmlFor="">Debit Card</label>
            </div>
          </div>
          {errors.payment && (
            <p className="text-red-500 text-xs italic">{errors.payment}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Payment
        </button>
      </form>
      <div className="flex flex-col items-center border border-balack h-[20vh] justify-center bg-white shadow-lg w-[25vw]">
        <div>
          <span className="font-semibold text-2xl">Total item: </span>
          <span className="font-bold text-2xl">{totalItem}</span>
        </div>
        <div>
          <span className="font-semibold text-2xl">Total Price: </span>
          <span className="font-bold text-2xl">{totalPrice.toFixed(2)}$</span>
        </div>
      </div>
    </div>
    <Footer/>
   </div>
  );
};

export default BuyNow;
