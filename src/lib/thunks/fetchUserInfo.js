import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Create an asynchronous thunk for fetching user information
const fetchUserInfo = createAsyncThunk("/fetchuserInfo",
    async (userid) => {
        if (!userid) {
            throw new Error("User ID not provided");
        }
        try {
            const docRef = doc(db, "users", userid); // Use 'userid' instead of 'action.payload'
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                throw new Error("User not found");
            }
        } catch (err) {
            throw err;
        }
    }
);

export default fetchUserInfo