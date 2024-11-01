import { toast } from "sonner"
import api from "../../utils/axiosConfig"
import { useContext } from "react";
import { Items } from "../MainPage/Main";

const user = localStorage.getItem('user');
const userId = JSON.parse(user)

export const getWishlist = async () => {
    try {
        const response = await api.get(`/users/${userId._id}/wishlist`);
        
        return response.data.map(ele=>ele.productId); 
        
    } catch (error) {
        return [];
    }
};


export const addWishlist = async (productId)=>{
    try {
        const response = await api.post(`/users/${userId._id}/wishlist/${productId}`)
        toast.success(response.data.message)
    } catch (error) {
        console.log(error.response.data.message);
        toast.warning(error.response.data.message)
    }
}

export const removeWishlist = async (productId)=>{

    try {
        const response = await api.delete(`/users/${userId._id}/wishlist/${productId}/removewishlist`)
        toast.success(response.data.message)
    } catch (error) {
        console.log(error.response.data.message)
        toast.warning(error.response.data.message)
    }
}
