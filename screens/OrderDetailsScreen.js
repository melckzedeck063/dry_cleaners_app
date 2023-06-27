import { View, Text, useWindowDimensions, Platform , StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {useResponsiveWidth, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import OrderItem from '../components/orderItem'
// import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import *  as SecureStore from 'expo-secure-store';
import { confirmOrder } from '../store/actions/order_actions'



const OrderDetailsScreen = () => {

    const navigation = useNavigation();
    const {params : {props}} =  useRoute();
    const  {width, height} =  useWindowDimensions();
    const  [reload, setReload] =  useState(0);
    const  dispatch   =  useDispatch();

    // console.log(props.id)

    setTimeout(() => {
        if(reload <  5){
            setReload(reload  =>  reload + 1)
        }
    }, 1000);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true
        })
    })

    const [user_role, setUser_role] =  useState(null)

  const gettToken =  async () => {
    const storage = await SecureStore.getItemAsync('token');
    const user_role = JSON.parse(storage);
  
  if (user_role.doc.user.role === "admin") {
    setUser_role("admin");
  } else if (user_role.doc.user.role === "driver") {
    setUser_role("driver");
  }
}

useEffect(() => {
  gettToken();
}, []);


  return (
    <View style={{height :  responsiveHeight(95), width : responsiveWidth(99)}}  className={`bg-slate-100 py-2 px-2.5`} >
        <View className={``}>            
           <Text className={`font-bold text-center text-slate-800 text-lg ${Platform.select({android :  'text-sm'})}`} >OrderDetailsScreen</Text>
        </View>
        <View className={`py-2`} >
            {
                props.items?
            <View style={{height :  responsiveHeight(45.5)}} className={`mx-1 `}>
             <FlatList 
                 data={props.items}
                 renderItem={(itemData) => { 
                    return (
                        <OrderItem image={itemData.item.photo} laundry={itemData.item.laundry.laundryName} name={itemData.item.serviceName} price={itemData.item.price} amount = {itemData.item.amount} />
                         )
                        }}
                        />
            </View>
                        :   null
                  }
            <View  style={style.card} className={`bg-white w-full ${height <  700 ? 'my-1' :  'my-4 py-4'} mx-2 rounded-lg`}>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> OrderID </Text>
                    <Text className={`text-slate-800 text-sm ${Platform.select({android : 'text-xs'})}`}> {props.order_id} </Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> Items </Text>
                    <Text className={`font-medium text-red-400 text-sm ${Platform.select({android : 'text-xs'})}`}> {props.items.length} items </Text>
                </View>

                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> Subtotal </Text>
                    <Text className={`font-medium text-red-400 text-sm ${Platform.select({android : 'text-xs'})}`}> {props.cost} </Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> Ordered </Text>
                    <Text className={`text-slate-800 text-sm ${Platform.select({android : 'text-xs'})}`}> {props.date} </Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> OrderStatus </Text>
                    <Text className={`font-bold ${Platform.select({android: 'text-xs'})}  ${props.order_status === "delivered"?'text-blue-500': 'text-red-400'} ${props.order_status ==="confirmed"?'text-green-500': 'text-red-400'} `}>  {props.status} </Text>
                </View>
                <View className="">
                    {
                        user_role === "admin" &&(
                            <>
                                                           {
                         props && props.status && props.status === "Pending"?(
                            <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-red-400 w-5/12 px-2 rounded-lg py-1.5 my-3`}
                              onPress={() =>  dispatch( confirmOrder(props.id) )}
                            >
                                 <Text className={`text-lg text-white font-medium text-center ${Platform.select({android :  'text-sm'})}`}>Confirm Order</Text>
                            </TouchableOpacity>
                                )
                            : 
                            <></>
                            }
                            </>
                        )
                    }

                </View>
            </View>
        </View>
    </View>
  )
}

export default OrderDetailsScreen

const style = StyleSheet.create({
    card: {
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius: 8,
      alignSelf  : 'center'
     }
  })