import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "../actions/user_actions";


const UserSlice =  createSlice({
    name : 'users',
    initialState : {
        all_users: [],
        current_user : null,
        loged_user : null,
        error : null,
        status : '',
        message : ''
    },
    reducers : {
        AllUsers : (state,action) => {
            state.all_users.push(action.payload);
        },
        NewUser : (state,action) => {
            state.current_user.push(action.payload);
        },
        SignIn : (state,action) => {
            state.loged_user.push(action.payload);
        }
    },
    extraReducers (builder){
        builder
        .addCase(signInUser.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(signInUser.fulfilled, (state, action) => {
            state.status = "succeeded",
            state.loged_user = action.payload
        })
        .addCase(signInUser.rejected,  (state, action) => {
            state.status = "failed",
            state.error =  action.error.message
        })
        .addCase(signUpUser.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(signUpUser.fulfilled ,  (state, action) => {
            state.status = "succeeded",
            state.current_user =  action.payload
        })
        .addCase(signUpUser.rejected,  (state, action)  => {
            state.status  = "failed",
            state.error  =  action.error.message
        })
    }
})

export const {AllUsers, NewUser,SignIn} = UserSlice.actions;
export default UserSlice.reducer