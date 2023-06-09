
import axios from 'axios';
import { AUTH_URL,BASE_URL } from '../URL';
import *  as SecureStore from 'expo-secure-store'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNotification } from '../reducers/notification_reducer';

axios.defaults.headers.post['Content-Type'] = "application/json";

const AUTH_API = axios.create({baseURL : AUTH_URL});
AUTH_API.interceptors.request.use(async (req) => {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.authorization = `Bearer bearer ${authToken.token}`
    }
// console.log(req)
    return req
})


export const signInUser = createAsyncThunk ("user/login", async (values,{dispatch}) => {
    // console.log("values : " , values)
    try{
        const  response =   await  axios.post(`${BASE_URL}/user/login`, {
          email  :  values.username,
          password :   values.password
        })
        console.log(response.data)
        await SecureStore.setItemAsync('token', JSON.stringify(response.data))
        dispatch(addNotification({message: "Successfull loged in" ,  type : "success"}))
         return  response.data
    }
    catch(error){
        console.log(error)
        dispatch(addNotification({message: "Request failed please try again" ,  type : "error"}))
        return  error.message
    }
})

export const  signUpUser =  createAsyncThunk ('user/signup', async(values,{dispatch}) => {
    try  {

        const response =  await axios.post(`${BASE_URL}/user/signup`, {
            firstName :  values.firstName,
            lastName :   values.lastName,
            email :  values.username,
            telephone : values.telephone,
            password : values.password,
            gender : " ",
            confirmPassword : values.confirmPassword
        })
        // console.log("called");
        // console.log(response.data);
        dispatch(addNotification({message: "Successfull created new account" ,  type : "success"}))
        return response.data
    }
    catch(error){
        console.log(error)
        dispatch(addNotification({message: "Request failed please try again" ,  type : "error"}))
        console.log(error.response.data)
    }
})