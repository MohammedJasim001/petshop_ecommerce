import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../Thunks/LoginTunk";

const registerSlice = createSlice({
    name:"register",
    initialState:{
        loading:false,
        user:null,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(registerUser.pending,(state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading = false,
                state.user = action.payload
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading = false,
                state.user = action.payload
            })
    }
})

export default registerSlice.reducer