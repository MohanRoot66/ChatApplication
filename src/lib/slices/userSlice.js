import { createSlice } from "@reduxjs/toolkit";
import fetchUserInfo from "../thunks/fetchUserInfo"

const initialState={
    currentUser:null,
    isLoading:true
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserInfo.rejected,(state,action)=>{
            console.log(action)
            return{...state,currentUser:null,isLoading:false}
        });
        builder.addCase(fetchUserInfo.fulfilled,(state,action)=>{
            console.log(action.payload)
            return{...state,currentUser:action.payload,isLoading:false}
        });
    }
})

export default userSlice