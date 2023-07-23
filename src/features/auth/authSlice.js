import {createSlice} from "@reduxjs/toolkit";

export const authSlice =createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        userLogin: {}
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = !state.isAuth;
        },
        setUserLogin:(state,action)=>{
            state.userLogin=action.payload
        }
    }
})

export const {setAuth,setUserLogin} = authSlice.actions;

export default authSlice.reducer