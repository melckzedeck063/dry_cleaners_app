import axios from "axios";
import {BASE_URL} from  '../URL'
axios.defaults.headers.post['Content-Type'] = 'application/json';
import * as  SecureStore  from 'expo-secure-store'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification } from "../reducers/notification_reducer";

const CATEGORY_API  =  axios.create({baseURL :  `${BASE_URL}/category` });
CATEGORY_API.interceptors.request.use(async(req) =>  {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.Authorization = `Bearer bearer ${authToken.token}`
    }
    return req;
})

export  const registerCategory  = createAsyncThunk ( 'new/category', async(values, {dispatch}) => {
    // console.log(values)
    try{
        const response  =  await CATEGORY_API.post('/new_category', {
            categoryName :  values.categoryName,
            description :  values.description,
            photo : values.photo,
        })

        // console.log(response.data);
        dispatch(addNotification({message : 'New category registered succesfully', type : "success"}))
        return  response.data
    }
    catch(error){
        console.log(error);
        dispatch(addNotification({message : 'Failed to register new category', type : "error"}))
        return  error.message
    }
})

export  const getAllCategories =  createAsyncThunk('all/categ', async () => {
    try{
        const  response =  await CATEGORY_API.get(`/categories?sort=-created_at`);

        // console.log(response);
        return  response.data
    }
    catch(error){
        console.log(error.response)
        return   error.message
    }
})