import { toast } from "sonner";
import api from "../../utils/axiosConfig";

export const AddCarts = async (e) => {
  console.log(e,'jjjjaja')


  const user = localStorage.getItem("user");
  const userId =JSON.parse(user)._id

  if (user) {
    try {
      
      const res = await api.post(`/users/${userId}/cart/${e._id}`,{})

      toast.success(res.data.message)

    //  const exist = Object.values(cart).filter((f)=>{
    //          return   f.id==e.id
    //  })
    //  if(exist.length!==0){
    //     toast.warning('Item already exist cart')
    //     return
    //  }
    //   const updateCart = {
    //     ...cart,
    //     [e.id]: e,
    //   };
    //   toast.success("item added to cart");

    //   await axios.patch(`http://localhost:3000/users/${user}`, {
    //     cart: updateCart,
    //   });
    } catch (err) {
      toast.warning(err.response.data.message)
      console.log(err.response.data.message);
    }
  } else {
    toast.warning("pleas LogIn");
  }
};

export const RemovCart = async (e) => {
  console.log(e._id,'product id from remve cart')
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user)._id
  console.log(userId);
  
  try {
    const res = await api.delete(`/users/${userId}/cart/${e.productId._id}/removecart`);
    
    toast.success(res.data.message)
    
  } catch (err) {
    console.log(err.response.data.error);
    toast.error(err.response.data.error)
  }
};
