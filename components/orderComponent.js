import { View, Text, FlatList, SafeAreaView, useWindowDimensions, TouchableOpacity, StyleSheet, Platform, useAnimatedValue } from 'react-native'
import React from 'react'
// import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';

const OrderComponent = (props) => {

    // console.log(props)
    // const {params : {props}} =  useRoute();

    // console.log(props.id)
     
    
    const navigation =  useNavigation();
    const handleOrder = (id) => {
       navigation.navigate('OrderDetails', {
        props
       })
    }


  return (
    <View className="my-1.5 bg-white">
      <TouchableOpacity style={style.card} className="p-2  borderr border-slatee-500 mx-3 rounded-md"
         onPress={() => handleOrder(props.uuid) }
      >
          <View className="p-1" >
            <View className="">
              <Text className="text-slate-700 text-sm font-bold text-center text-llg"> Order Details </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-slate-600 ${Platform.select({android :'text-xs'})}`}> Order ID </Text>
              <Text className={`${Platform.select({android : 'text-xs'})} font-medium`}>  {props.order_id} </Text>
            </View>
            
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-slate-600 ${Platform.select({android :'text-xs'})}`}> Ordered By </Text>
              <Text className="font-medium text-sm ">  {props.fname} {props.lname } </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-slate-600 ${Platform.select({android :'text-xs'})}`}> Order Status</Text>
              <Text className={`font-bold ${Platform.select({android: 'text-xs'})}  ${props.order_status === "delivered"?'text-blue-500': 'text-red-400'} ${props.order_status ==="confirmed"?'text-green-500': 'text-red-400'} `}>  {props.status} </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-slate-600 ${Platform.select({android :'text-xs'})}`}> Items  </Text>
              <Text className={`font-medium ${Platform.select({android: 'text-xs'})} `} >   (items) </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-slate-600 ${Platform.select({android :'text-xs'})}`}> Total Cost </Text>
              <Text className={`font-medium ${Platform.select({android: 'text-xs'})}  text-red-400`} > {props.cost} </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-slate-600 ${Platform.select({android :'text-xs'})}`}> Date </Text>
              <Text classsName={`${Platform.select({android : 'text-xs'})} font-medium`} > {props.date} </Text>
            </View>
        </View>
          </TouchableOpacity>
    </View>
  )
}

export default OrderComponent


const style = StyleSheet.create({
    card: {
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius: 8
     }
  })