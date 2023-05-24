import { View, Text, Form, TextInput, useWindowDimensions, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller, useController, useWatch } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import  { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
// import * as Yup from 'yup';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import { useDispatch } from 'react-redux';
import *  as SecureStore from 'expo-secure-store';
import { signInUser } from '../store/actions/user_actions';


const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch =  useDispatch();
    const [reload,setReload] = useState(0);
    const { width, height } = useWindowDimensions();


    const checkUser = async () =>  {
      const storage = await  SecureStore.getItemAsync('token');
     const authToken =  JSON.parse(storage)
    //  console.log(authToken)
      if(authToken !== "" && authToken !==  undefined && authToken !== null){
          // console.log(authToken)
          // setTimeout(() => {
          //   if(reload < 3){
          //     setModalVisible(true)
          //   }
          // }, 1000);
          setTimeout(() => {
            navigation.navigate('HomeTab')
          }, 3000);
        }
        else {
          console.log("nothing to connsole")
        }
    }
// console.log(message)
// setTimeout(() => {
//   checkUser();
//   }, 6000);

  // setTimeout(() => {
  //   if(reload < 5 ){
  //     setReload(reload => reload + 1)
  //   } 
  //  }, 1000);


  //   useEffect(() => {
  //     if(reload < 4){
  //       setTimeout(() => {
  //         checkUser()
  //       }, 2000);
  //     }
  //   })

    const {  handleSubmit,setValue, control, reset, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues  : {
          username : "",
          password :  ""
        },
        mode : 'all',
        reValidateMode : "onChange"
      })

      const onSubmit = data => {
        // console.log(data)
        dispatch( signInUser(data) )

        setTimeout(() => {
          checkUser()
        }, 3000)

      }

      // setTimeout(() => {
      //   checkUser()
      //   //  navigation.navigate('HomeTab')
      // }, 2000);

      useLayoutEffect(() => 
    {
        navigation.setOptions({
            headerShown : true,
            headerStyle : {
                backgroundColor : "#1c4966"
            },
            headerTintColor : "white"
        })
    })

  return (
    <View>
      <KeyboardAwareScrollView>
      <ScrollView>

           {/* <LinearGradient colors={['transparent', '#F54749']} > */}
           <View style={{backgroundColor : '#fff'}} className={`bg-slate-900 w-full h-full ${height < 300 ? 'py-2' : 'py-4'} ${Platform.select({ios : 'pb-96', android : "pb-56"})}`}>
          {/* <Text className={`text-sky-600 text-center font-medium text-3xl ${height < 400 ? 'mt-1' : 'mt-24'} `}>Login Screen</Text> */}
        <View className={`mx-auto shadow-md bg-slate-700 rounded-lg ${height < 400 ? 'mt-32 py-1' : 'py-6 mt-52'} ${width < 400 ? 'w-10/12' : 'w-10/12'} px-6`}  style={{alignSelf : 'center', backgroundColor : '#1c4966'}} >
      {/* <Text className="text-2xl font-medium text-slate-100 text-center" >Sign In</Text> */}
          <View className={``}>
            <Image source={require('../assets/icon.png')}  className="rounded-full my-1"
            style={{height : responsiveHeight(12), width : responsiveWidth(25), alignSelf :  'center'}} 
            />
          </View>
          <View className="my-2">
           <Text className={`text-slate-100 text-xl ${Platform.select({android : 'text-lg'})}`} > Username</Text>
      <Controller
        control={control}
        defaultValue =  ""
        rules={{
          required: "Username is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md text-white bg-gray-500 text-lgg px-4 py-2.5 ${Platform.select({android : 'py-1'})} ${errors.username? 'border-2 border-red-500' : 'border-2 border-slate-300'}`}
          placeholder="Enter username"
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize ={false}
            // autoComplete='email'
            value={value}
            // errors = {errors.name}
            // errorText = {errors?.name?.message}
          />
        )}
        name="username"
      />
      { errors.username && <Text className="text-red-400" > {errors.username.message} </Text>}
          </View>
       <View className="my-2">
         <Text className={`text-slate-100 text-xl ${Platform.select({android : 'text-lg'})}`} > Password</Text>
         <Controller
        control={control}
        rules={{
          required:  "Password is required",
          pattern: {
            value: /^([a-zA-Z0-9]{8,16})$/,
            message: 'Must contain atleast 8 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md text-white bg-gray-500 px-4 py-2.5 ${Platform.select({android : 'py-1'})} ${errors.password? 'border-2 border-red-400' : 'border-2 border-slate-300'}`}
          placeholder="Enter password"
            onBlur={onBlur}
            autoCapitalize = {false}
            secureTextEntry={true}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text className="text-red-400"> {errors.password.message} </Text>}
       </View>
        <View>
             <TouchableOpacity className="bg-sky-500 rounded-md px-2 py-1 my-3"
               onPress={handleSubmit(onSubmit)}
             >
                <Text className={`text-xl font-medium text-white text-center ${Platform.select({android : 'text-lg'})}`} >Sign In</Text>
             </TouchableOpacity>
        </View>
        <View>
            <View className="-mt-2" >
            <Text className="font-medium text-slate-100 my-1 text-center" >Don't have an account ? </Text>
             <TouchableOpacity className="rounded-md px-2 py-1 hover:text-sky-300"
             onPress={() => navigation.navigate('SignUp') }
             >
                <Text className={`text-xl font-medium text-sky-500 text-center ${Platform.select({android : 'text-lg'})}`} >Sign Up</Text>
             </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
           {/* </LinearGradient> */}
      </ScrollView>
          </KeyboardAwareScrollView>
    </View>
  )
}

export default LoginScreen