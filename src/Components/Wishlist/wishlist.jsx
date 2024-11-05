import { toast } from "sonner"
import api from "../../utils/axiosConfig"
import { useContext } from "react";
import { Items } from "../MainPage/Main";

const user = localStorage.getItem('user');


export const getWishlist = async () => {
    const userId = JSON.parse(user)
    try {
        const response = await api.get(`/users/${userId._id}/wishlist`);
        
        return response.data.map(ele=>ele.productId); 
        
    } catch (error) {
        return [];
    }
};


export const addWishlist = async (productId,updateWishlistCount)=>{
    const userId = JSON.parse(user)
    try {
        const response = await api.post(`/users/${userId._id}/wishlist/${productId}`)
        toast.success(response.data.message)
        updateWishlistCount()
    } catch (error) {
        console.log(error.response.data.message);
        toast.warning(error.response.data.message)
    }
}

export const removeWishlist = async (productId,updateWishlistCount)=>{
    const userId = JSON.parse(user)
    try {
        const response = await api.delete(`/users/${userId._id}/wishlist/${productId}/removewishlist`)
        toast.success(response.data.message)
        updateWishlistCount()
    } catch (error) {
        console.log(error.response.data.message)
        toast.warning(error.response.data.message)
    }
}
