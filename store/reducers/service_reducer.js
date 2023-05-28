import { createSlice } from "@reduxjs/toolkit";
import { registerCategory } from "../actions/category_action";
import { getAllServices, getLaundryServices } from "../actions/service_actions";


const ServiceSlice =  createSlice({
    name :'service',
    initialState : {
        services : [],
        service : null,
        current_service : null,
        laundry_services :[],
        message : '',
        status : '',
        error : '',
    },
    reducers : {
        allServices : (state,action) =>{
            state.services.push(action.payload)
        },
        currentService : (state,action) => {
            state.current_service.push(action.payload)
        },
        createService : (state,action) => {
            state.service.push(action.payload)
        }
    },
    extraReducers (builder){
        builder
        .addCase(registerCategory.pending, (state,action) => {
            state.status = "Loading ..";
        })
        .addCase(registerCategory.fulfilled, (state,action) => {
            state.status = "Succesfull";
            state.services = action.payload;
            state.message = "New service registered succesfull"
        })
        .addCase(registerCategory.rejected, (state,action) => {
            state.status = "Failed ",
            state.error = action.error.message 
        })
        .addCase(getAllServices.pending, (state,action) => {
            state.status = "Loading ..";
        })
        .addCase(getAllServices.fulfilled, (state,action) => {
            state.status = "Succesfull";
            state.services = action.payload;
            state.message = "Services data found"
        })
        .addCase(getAllServices.rejected, (state,action) => {
            state.status = "Failed ",
            state.error = action.error.message 
        })
        .addCase(getLaundryServices.pending, (state,action) => {
            state.status = "Loading ..";
        })
        .addCase(getLaundryServices.fulfilled, (state,action) => {
            state.status = "Succesfull";
            state.laundry_services = action.payload;
            state.message = "Services data found"
        })
        .addCase(getLaundryServices.rejected, (state,action) => {
            state.status = "Failed ",
            state.error = action.error.message 
        })
    }
})

export const {allServices, currentService, createService} = ServiceSlice.actions;

export default ServiceSlice.reducer;