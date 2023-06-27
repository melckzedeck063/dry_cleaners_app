import axios from "axios";
import { BASE_URL } from "../URL";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.headers.post['Content-Type'] = 'application/json';

 import * as SecureStore from 'expo-secure-store';
import { addNotification } from "../reducers/notification_reducer";

const SERVICE_API =  axios.create({baseURL : `${BASE_URL}/service`});
SERVICE_API.interceptors.request.use( async (req) => {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.Authorization = `Bearer bearer ${authToken.token}`
    }
    return req;
})


export const getAllServices = createAsyncThunk ('/services', async() => {
    try{
        const response =  await SERVICE_API.get('/services');

        // console.log(response.data);
        return  response.data
    }
    catch(error){
        console.log(error.response);
        return  error.message
    }
})

export const registerService = createAsyncThunk ('new/service', async(values,{dispatch})=>{
    console.log(values)
    try{
        const response = await SERVICE_API.post('/new_service', {
            serviceName : values.serviceName,
            price : values.price,
            photo : values.photo,
            laundry : values.laundry
        });

        // console.log(response.data);
        dispatch(addNotification({message : "Succesfully registered", type : "success"}))
        return  response.data
    }
    catch(error){
        console.log(error);
        dispatch(addNotification({message : "Request failed please try  again", type : "error"}))
        return error.message
    }
})

export const getLaundryServices = createAsyncThunk ('laundry/services', async(id) => {
    try{
        const response =  await SERVICE_API.get(`/laundry_services/${id}`);

        // console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.message
    }
})