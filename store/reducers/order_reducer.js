import { createSlice } from "@reduxjs/toolkit";
import { cancelOrder, confirmOrder, deleteOrder, getAllOrders, getMyOrders, getSentOrders, placeOrder, rejectOrder } from "../actions/order_actions";


const OrderSlice =  createSlice({
    name  :"Orders",
    initialState : {
        orders : [],
        all_orders : [],
        my_orders :  [],
        driver_orders : [],
        order : "",
        status : "iddle",
        errors : null
    },
    reducers : {
        addOrder : (state,action) => {
            state.order.push(action.payload)
        },
        allOrders : (state, action) => {
            state.orders.push(action.payload)
        }

    },
    extraReducers (builder) {
        builder
        .addCase(placeOrder.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(placeOrder.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.order= action.payload
        })
        .addCase(placeOrder.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        .addCase(getAllOrders.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(getAllOrders.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.all_orders = action.payload
        })
        .addCase(getAllOrders.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        .addCase(getMyOrders.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(getMyOrders.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.my_orders = action.payload
        })
        .addCase(getMyOrders.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        .addCase(confirmOrder.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(confirmOrder.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.order = action.payload
        })
        .addCase(confirmOrder.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        .addCase(rejectOrder.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(rejectOrder.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.order = action.payload
        })
        .addCase(rejectOrder.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        .addCase(deleteOrder.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(deleteOrder.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.orders = action.payload
        })
        .addCase(deleteOrder.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        .addCase(cancelOrder.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(cancelOrder.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.order = action.payload
        })
        .addCase(cancelOrder.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        .addCase(getSentOrders.pending, (state,action)  => {
            state.status="Loading"
        })
        .addCase(getSentOrders.fulfilled, (state,action) => {
            state.status = "Succeeded",
            state.driver_orders = action.payload
        })
        .addCase(getSentOrders.rejected, (state,action) => {
            state.status = "failed",
            state.errors = action.error.message
        })
        
    }
})

export const {allOrders, addOrder}= OrderSlice.actions;

export default OrderSlice.reducer