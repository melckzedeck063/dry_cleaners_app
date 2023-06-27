import { View, Text, useWindowDimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUpUser } from '../store/actions/user_actions';
import { useDispatch,useSelector } from 'react-redux';
import PopupComponent from '../components/PopupComponent';


const SIgnUpScreen = () => {

    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const dispatch = useDispatch();
    const notifications =  useSelector(state => state.notification);

    console.log(notifications)


    const { register, reset, control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues :  {
          password : "",
          confirmPassword : "",
          username : "",
          firstName : "",
          lastName : "",
          telephone : ""
        },
          mode: 'all',
      })
      
      const onSubmit = data => {
          // console.log(data);
          dispatch( signUpUser(data) )

          reset();
          
      }

      useLayoutEffect(() => 
    {
        navigation.setOptions({
            // headerShown : false,
            headerStyle : {
                backgroundColor : "#1c4966"
            },
            headerTintColor : "white"
        })
    })
  


  return (
    <View >
      <KeyboardAwareScrollView >
        <ScrollView>
        {/* <LinearGradient colors={['transparent', '#F54749']} className="h-full" > */}
        <View style={{backgroundColor : '#fff'}} className={`w-full h-full bg-slate-900 -mtt-10 ${Platform.select({ios : 'py-32 -mt-20', android : 'py-4'})}`}>
      <View style={{alignSelf : 'center', backgroundColor  : '#1c4966'}} className="bg-slate-700 shadow-md rounded-lg px-4 py-5 w-10/12 my-3">
           <Text className={`text-2xl font-medium text-white text-center ${Platform.select({android : 'text-xl'})}`} >Sign Up</Text>
           
           <View className="my-2">
                    {
          notifications?.notifications[0]?.type==="success" &&(
            <>     
           <PopupComponent message={notifications.notifications[0].message} type="success" />
            </>

          )
        }
          
          {
            notifications?.notifications[0]?.type==="error" &&(
          <>
          <PopupComponent message={notifications.notifications[0].message} type="error" />
          </>
            )
          }
                    </View>

      <View className="my-2">
       <Text className={`text-lg text-white ${Platform.select({android : 'text-sm'})}`} >FirstName</Text>
        <Controller
        control={control}
        rules={{
         required: {value : true, message : "Firstname is required"},
        //  minLength : {value : 3,  message : "Requires atleast three characters"}
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-gray-500 text-white px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.firstName? 'border-2 border-red-400' : 'border-2 border-slate-300'}`}
          placeholder="Enter firstName"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {  errors.firstName && <Text className="text-red-400" > {errors.firstName.message} </Text>}
      </View>
      <View className="my-2">
      <Text className={`text-lg text-white ${Platform.select({android : 'text-sm'})}`} >LastName</Text>
    <Controller
        control={control}
        rules={{
          required: {value : true, message : "Lastname is required"},
          minLength : {value : 3,  message : "Requires atleast three characters"}
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-gray-500 text-white px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.lastName? 'border-2 border-red-400' : 'border-2 border-slate-300'}`}
          placeholder="Enter lastName"
            onBlur={onBlur} 
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {  errors.lastName && <Text className="text-red-400" > {errors.lastName.message} </Text>}
      </View>
      <View className="my-2">
      <Text className={`text-lg text-white ${Platform.select({android : 'text-sm'})}`} >Username</Text>
     <Controller
        control={control}
        rules={{
          required: "Username is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-gray-500 text-white px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.username? 'border-2 border-red-400' : 'border-2 border-slate-300'}`}
          placeholder="Enter username or email"
            onBlur={onBlur}
            autoCapitalize = {false}
            onChangeText={onChange}
            value={value}border-2 border-slate-300
          />
        )}
        name="username"
      />
      {  errors.username && <Text className="text-red-400" > {errors.username.message} </Text>}
      </View>
                  <View className="my-2">
                  <Text className={`text-lg text-white ${Platform.select({android : 'text-sm'})}`} >Telephone  (255) </Text>
                  <Controller
        control={control}
        rules={{
         required: "Telephone is  required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-gray-500 text-white px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.telephone? 'border-2 border-red-400' : 'border-2 border-slate-300'}`}
          placeholder="Enter telephone"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}border-2 border-slate-300
          />
        )}
        name="telephone"
      />
      {  errors.telephone && <Text className="text-red-400" > {errors.telephone.message} </Text>}
            </View>
      <View className="my-2">
       <Text className={`text-lg text-white ${Platform.select({android : 'text-sm'})}`} >Password</Text>
       <Controller
        control={control}
        rules={{
          required: {value : true, message :  "Password is required"},
          pattern: {
            value: /^([a-zA-Z0-9]{8,16})$/,
            message: 'Must contain atleast 8 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-gray-500 text-white px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.password? 'border-2 border-red-400' : 'border-2 border-slate-300'}`}
          placeholder="Enter password"
            onBlur={onBlur}
            autoCapitalize={false}
            secureTextEntry= {true}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text className="text-red-400"> {errors.password.message} </Text>}
                  </View>
                  <View className="my-2">
                  <Text className={`text-lg text-white ${Platform.select({android : 'text-sm'})}`} >Confirm Password</Text>
                  <Controller
        control={control}
        rules={{
          required: {value : true, message :  "Password is required"},
        //   validate: value => value === watch('password'),
          pattern: {
            value: /^([a-zA-Z0-9]{8,16})$/,
            message: 'Must contain atleast 8 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-gray-500 text-white px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.confirmPassword? 'border-2 border-red-400' : 'border-2 border-slate-300'}`}
          placeholder="Confirm Password"
            onBlur={onBlur}
            autoCapitalize={false}
            secureTextEntry= {true}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && <Text className="text-red-400"> {errors.confirmPassword.message} </Text>}
                  </View>
                  <View>
             <TouchableOpacity className="bg-sky-500 rounded-md px-2 py-1 my-3"
               onPress={handleSubmit(onSubmit)}
             >
                <Text className={`text-2xl font-medium text-white text-center ${Platform.select({android : 'text-lg'})}`}>Submit</Text>
             </TouchableOpacity>
        </View>
            <View className="mt-1" >
            <Text className="font-medium text-white text-center" >Already have an account ? </Text>
             <TouchableOpacity className="rounded-md px-2 py-1 hover:text-sky-300"
             onPress={() => navigation.navigate('Login') }
             >
                <Text className="text-xl font-medium text-sky-500 text-center" >Sign In</Text>
             </TouchableOpacity>
            </View>
         </View> 
        </View>
          {/* </LinearGradient> */}
          </ScrollView>
        </KeyboardAwareScrollView>
    </View>
  )
}

export default SIgnUpScreen