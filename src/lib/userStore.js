import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import chatslice from "./slices/chatSlice";

export const useUserStore = configureStore({
    reducer:{
        user : userSlice.reducer,
        chat : chatslice.reducer
    }
})

