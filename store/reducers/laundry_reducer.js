import { createSlice } from "@reduxjs/toolkit";
import { createLaundry, getAllLaundry } from "../actions/laundry_actions";


const laundrySlice  =   createSlice({
    name :  'laundry',
    initialState : {
        laundry : null,
        all_laundry  :  [],
        current_laundry : null,
        status : "",
        message : ""
    },
    reducers :  {
        newLaundry : (state,action) => {
            state.laundry.push(action.payload)
        },
        currentLaundry : (state,action) => {
            state.current_laundry.push(action.payload)
        },
        allLaundry : (state,action) => {
            state.all_laundry.push(action.payload)
        }
    },
    extraReducers (builder) {
        builder
        .addCase(createLaundry.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(createLaundry.fulfilled, (state,action) => {
            state.status  = "Successfull",
            state.laundry =  action.payload,
            state.message = "New laundry  created"
        })
        .addCase(createLaundry.rejected, (state,action)  => {
            state.status = "Failed",
            state.message ='Request failed' ,
            state.error = action.error.message
        })
        .addCase(getAllLaundry.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllLaundry.fulfilled, (state,action) => {
            state.status  = "Successfull",
            state.all_laundry =  action.payload,
            state.message = "laundries found"
        })
        .addCase(getAllLaundry.rejected, (state,action)  => {
            state.status = "Failed",
            state.message ='Request failed' ,
            state.error = action.error.message
        })
    }
})

export const {newLaundry, allLaundry, currentLaundry} =  laundrySlice.actions;

module.exports =  laundrySlice.reducer