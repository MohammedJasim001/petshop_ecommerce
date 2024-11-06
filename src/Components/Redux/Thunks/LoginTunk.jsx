// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../utils/axiosConfig";
// import { toast } from "sonner";


// export const registerUser = createAsyncThunk('auth/resgister',async(formData)=>{
//     try {
//         const response = await api.post('/users/register',formData,{
//             headers:{'Content-Type':'multipart/form-data'}
//         })
//         toast.success(response.data.message)
//     } catch (error) {
//         toast.warning(error.response.data.message)
//     }
// })