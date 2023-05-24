import axios from "axios";
import {BASE_URL} from  '../URL'
axios.defaults.headers.post['Content-Type'] = 'application/json';
import * as  SecureStore  from 'expo-secure-store'
import { createAsyncThunk } from "@reduxjs/toolkit";

const CATEGORY_API  =  axios.create({baseURL :  `${BASE_URL}/category` });
CATEGORY_API.interceptors.request.use(async(req) =>  {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.authorization = `Bearer bearer ${authToken.token}`
    }
    return req;
})

export  const registerCategory  = createAsyncThunk ( 'new/category', async(values) => {
    // console.log(values)
    try{
        const response  =  await CATEGORY_API.post('/new_category', {
            categoryName :  values.categoryName,
            description :  values.description,
            photo : values.photo,
        })

        console.log(response.data);
        return  response.data
    }
    catch(error){
        console.log(error);
        return  error.message
    }
})

export  const getAllCategories =  createAsyncThunk('all/categ', async () => {
    try{
        const  response =  await CATEGORY_API.get('/categories');

        console.log(response.data);
        return  response.data
    }
    catch(error){
        console.error(error)
        return   error.message
    }
})