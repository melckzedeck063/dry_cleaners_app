import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'

import {Ionicons, FontAwesome, FontAwesome5} from '@expo/vector-icons'
import image2 from '../assets/images/pexels-pixabay-325876.jpg';
import { IMAGE_URL } from '../store/URL';


const OrderItem = (props) => {
  // console.log(props.id)
  return (
       <>
      <View style={style.card}  className="bg-white w-full rounded-lg px-2 py-2 my-1">
      <View   className="flex-row justify-between mx-autoo">
         <View className="">
            <Image source={{uri : `${IMAGE_URL}/${props.image}`}} className="w-20 h-20 rounded-full" />
         </View>
         <View className="">
            <Text className={`font-bold text-lg ${Platform.select({android : 'text-sm'})}`}> {props.name} </Text>
            {/* <Text className="font-bold text-lg text-red-300"> {props.title} </Text> */}
            <View className="flex-row justify-between mx-auto mt-1">
            
              <View className="mx-1">
                <Text className={`font-medium text-sm mtt-1.5 text-slate-700 capitalize ${Platform.select({android : 'text-sm'})}`}> {props.laundry} </Text>
                {/* <Text className={`font-bold text-lg mtt-1.5 text-red-400 ${Platform.select({android : 'text-sm'})}`}> 2 Items </Text> */}
              </View>
            
            </View>
         </View>
         <View className="mtt-1">
         <View className="-mr-2">
          <View className="">
            <Text style={{alignItems : 'center'}} className={`font-bold text-lg text-slate-800 ${Platform.select({android : 'text-sm'})}`}>  Price </Text>
          </View>
         </View>
            <Text className={`font-bold text-lg text-red-400 ${Platform.select({android : 'text-sm'})}`}> {props.price} Tshs</Text>
         </View>
      </View>
    </View>
    </>
  )
}

export default OrderItem

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