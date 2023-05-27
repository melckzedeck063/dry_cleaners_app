import axios from "axios";
import { BASE_URL } from "../URL";
import { createAsyncThunk } from "@reduxjs/toolkit";

import *  as SecureStore  from 'expo-secure-store';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const LAUNDRY_API = axios.create({baseURL : `${BASE_URL}/laundry`});
LAUNDRY_API.interceptors.request.use(async(req)  =>{
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.Authorization = `Bearer bearer ${authToken.token}`
    }
    return req;
})


export const createLaundry = createAsyncThunk('new/laundry', async(values) => {
    try{
        const response =  await LAUNDRY_API.post('/new_laundry', {
            laundryName :  values.laundryName,
            location :  values.location,
            description :  values.description,
            email : values.email,
            telephone : values.telephone,
            photo :  values.photo,
            category :  values.category
        })

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return error.message
    }
})

export const getAllLaundry = createAsyncThunk('all/laundry', async()  =>{
    try{
        const response =  await LAUNDRY_API.get('/all_laundry?sort=-date_created');

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return  error.message
    }
})

export const getCategoryLaundry =  createAsyncThunk('category/laundry', async(id) => {
    try{
        const response = await LAUNDRY_API.get(`/category_laundry/${id}?sort=-date_created`);

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return error.message
    }
})