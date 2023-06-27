
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import *  as SecureStore from 'expo-secure-store';

// import { response } from "express";
import { BASE_URL } from "../URL";
import { deleteCartItems } from "./cart_actions";
import { addNotification } from "../reducers/notification_reducer";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const ORDER_API = axios.create({ baseURL: `${BASE_URL}/orders` });
ORDER_API.interceptors.request.use(async(req) => {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.authorization = `Bearer bearer ${authToken.token}`
    }
// console.log(req)
    return req
})


export const placeOrder = createAsyncThunk('/order', async(values, {dispatch, rejectWithValue}) => {
    // console.log("values : ",values)
    try{
        const response =  await ORDER_API.post('/create_order',  {
            order_items : values.order_items,
            total_cost : values.costs,
            delivery_fee  : values.deliveryFee,
            driver : values.driver,
            amounts : values.amounts,
            user_location :  values.latlong
        })

        // console.log(response.data);
        dispatch(addNotification({message : "Order placed successfully", type : "success"}))
        return response.data
    }
    catch(error) {
        console.log(error)
        dispatch( addNotification({message : "Request failed please try again", type : "error"}))
        return error.message
    }
})

export const getAllOrders =   createAsyncThunk('all/orders', async () => {
    try{
        const response =  await ORDER_API.get('/all_orders');

        // console.log(response.data);
        return  response.data
    }
    catch(error) {
        console.log(error);
        return error.message
    }
})

export const getMyOrders = createAsyncThunk('my_orders', async() => {
    try{
          const response =  await ORDER_API.get('/my_orders');

        //   console.log(response.data);
          return  response.data
    }
    catch(error){
        console.log(error)
        return error.message
    }
})


export const confirmOrder = createAsyncThunk('/confirm',  async  (id, {dispatch, rejectWithValue}) => {
    // console.log(id)
    try{
         const response =  await ORDER_API.put(`/update_order/${id}`, {
            order_status : "Accepted"
         })
         console.log(response.data)
         dispatch(  addNotification({message : "Order confirmed succesfully", type :  "success"}) )
         return response.data
    }
    catch(error) {
        console.log(error)
        dispatch(addNotification({message : "Request failed please try again", type : "error"}))
        return   error.message
    }
})

export const rejectOrder = createAsyncThunk('/reject',  async  (id) => {
    // console.log(id)
    try{
         const response =  await ORDER_API.put(`/update_order/${id}`, {
            order_status : "Rejected"
         })
         console.log(response.data)
         dispatch(  addNotification({message : "Order confirmed succesfully", type :  "success"}) )
         return response.data
    }
    catch(error) {
        console.log(error)
        dispatch(addNotification({message : "Request failed please try again", type : "error"}))
        return   error.message
    }
})

export const cancelOrder = createAsyncThunk('/cancel',  async  (id) => {
    // console.log(id)
    try{
        const response =  await ORDER_API.delete(`/delete_order/${id}`);
         console.log(response.data)
         dispatch(addNotification({message : "Request cancelled", type : "success"}))
         return response.data
    }
    catch(error) {
        console.log(error)
        dispatch(addNotification({message : "Request  failed", type : "error"}))
        return   error.message
    }
})


export const  deleteOrder =  createAsyncThunk('/delete_order', async (id) => {
    try{
          const response =  await ORDER_API.delete(`/delete_order/${id}`);

          console.log(response.data);
          return  response.data
    }
    catch(error) {
        console.log(error);
        return  error.message
    }

})

export const getSentOrders = createAsyncThunk ('sent/orders', async() =>{
    try{
        const  response =  await ORDER_API.get('/driver_orders');

        // console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
        return  error.response
    }
})