import { toast } from "sonner";
import api from "../../utils/axiosConfig";

const user = localStorage.getItem("user")
const userId =JSON.parse(user);

export const getCart = async () => {
  try {
    if(!user) return toast.warning('Plss login')
    const response = await api.get(`/users/${userId._id}/cart`)
      return response.data
 
  } catch (err) {
    console.log(err?.response?.data?.message);
    return []
  }
};

export const AddCarts = async (e,updateCartCount) => {
    try {
      const res = await api.post(`/users/${userId._id}/cart/${e._id}`)
      toast.success(res.data.message)
      updateCartCount()
    } catch (err) {
      toast.warning(err.response.data.message)
      console.log(err?.response?.data?.message);
    }
};

export const RemovCart = async (e,updateCartCount) => {
  console.log(e._id,'product id from remove cart')
  
  try {
    const res = await api.delete(`/users/${userId._id}/cart/${e.productId._id}/removecart`);
    
    toast.success(res.data.message)
    updateCartCount()
    
  } catch (err) {
    console.log(err.response.data.error);
    toast.error(err.response.data.message)
  }
};
