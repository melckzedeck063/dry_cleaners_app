
import axios from "axios";
import { BASE_URL } from "../URL";
import { createAsyncThunk } from "@reduxjs/toolkit";

import *  as SecureStore  from 'expo-secure-store';
import { addNotification } from "../reducers/notification_reducer";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const CART_API = axios.create({baseURL : `${BASE_URL}/cart_items`});
CART_API.interceptors.request.use(async(req)  =>{
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.Authorization = `Bearer bearer ${authToken.token}`
    }
    return req;
})

export const allCartItems  =  createAsyncThunk ( 'cart/items',async() => {
    // console.log("cart data list")
    try{
        const response  =   await CART_API.get('/all_items');

        // console.log(response.data)

        return  response.data
    }
    catch(error) {
        console.log(error)
        return error
    }
})

export const  addItemToCart  = createAsyncThunk('new/cart', async(values, {dispatch,rejectWithValue})  => {
    console.log(values)
     try{
           const  response =  await CART_API.post('/new_item', {
               amount :  values.amount,
               total_cost :  values.total_cost,
               product :  values.id
           })
        //    console.log(response)
           dispatch( addNotification({message : "Succesfull added item to cart", type : "success"}))
           return  response.data
     }
     catch(error){
        console.log(error.response)
        dispatch ( addNotification({message : "Request failed please try again", type : "error"}))
        return  error.message
     }
})

export const updateCartItem =createAsyncThunk ('update/cart', async(values) => {
    console.log(values)
    try{
        const response =  await CART_API.patch(`/update_cart/${values.id}`, {
            amount :  values.amount,
            total_cost :  values.total_cost
        }
        )
        // console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
        return error.message
    }
})

export const deleteCartItem =  createAsyncThunk('delete/cart', async(id) => {
    try{
        const response =  await CART_API.delete(`/delete_cart/${id}`)
    }
    catch(error){
        console.log(error)
        return error.message
    }
})

export const deleteCartItems =  createAsyncThunk ('delete/carts', async() => {
    try{
        const response =  await CART_API.delete('/delete_carts');

        console.log(response.data)
        return  response.data
    }
    catch(error){
        return  error
    }
})