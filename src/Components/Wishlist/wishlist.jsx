import { toast } from "sonner"
import api from "../../utils/axiosConfig"

export const addWishlist = async (productId)=>{
    const user = localStorage.getItem('user')
    const userId = JSON.parse(user)._id
    try {
        const response = await api.post(`/users/${userId}/wishlist/${productId}`)
        toast.success(response.data.message)
    } catch (error) {
        console.log(error.response.data.message);
        toast.warning(error.response.data.message)
    }
}

export const removeWishlist = async (productId)=>{
    const user = localStorage.getItem('user')
    const userId = JSON.parse(user)._id
    try {
        const response = await api.delete(`/users/${userId}/wishlist/${productId}/removewishlist`)
        toast.success(response.data.message)
    } catch (error) {
        console.log(error.response.data.message)
        toast.warning(error.response.data.message)
    }
}
