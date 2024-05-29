import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    chatId : null,
    user : null,
    isCurrentUserBlocked : false,
    isReceiverBlocked : false
}



const chatslice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        changeChat:(state,action)=>{
            const {currentUser,user,chatId} = action.payload;

            if(user.blocked.includes(currentUser.id)){
                return {...initialState,chatId,isCurrentUserBlocked:true}
            }
            else if(currentUser.blocked.includes(user.id)){
                return {...initialState,chatId,user,isReceiverBlocked:true}
            }
            else{
                return {user,chatId,isCurrentUserBlocked : false,isReceiverBlocked : false}    
            }
        },
        changeBlock : (state) =>{
            return {...state,isReceiverBlocked:!state.isReceiverBlocked}
        }
    }
})

export default chatslice

export const {changeChat,changeBlock} = chatslice.actions