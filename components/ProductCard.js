import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'

import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { IMAGE_URL } from '../store/URL'

const ProductCard = (props) => {
  const navigation =  useNavigation();

  // console.log(props)
  

  return (
    <View style={style.card} className="mx-1 bg-pink-200 my-1.5 ml-1.5 relative rounded-lg f">
      <TouchableOpacity className="flex-row flex justify-between space-x-2"
      onPress={() => navigation.navigate('Laundry', {
        props
      }) } 
      >
        <Image source={{uri : `${IMAGE_URL}/${props.image}`}} className="h-36 w-6/12 rounded-l-lg overflow-hidden"  />
      <View  className="bg-slatee-600  rounded-lg -py-1" >
          <View className="-mt-2">
              <Text className={`text-slate-700 text-lg font-bold my-2 capitalize ${Platform.select({android : 'text-sm'})}`} > {props.name} </Text>
              <View className="flex-row flex justify-betweenn space-x-4 pr-3 mt-2">
                <Text className="-mt-1 flex-row space-x-2 justify-between">
                  <Ionicons name='star' size={20} color="orange" />
                  <Ionicons name='star' size={20} color="orange" />
                  <Ionicons name='star' size={20} color="orange" />
                  <Ionicons name='star' size={20} color="grey" />
                  <Ionicons name='star' size={20} color="grey" />
                </Text>
                <Text style={{fontSize : responsiveFontSize(1.5)}} className="font-light text-center text-slate-500"> (80) </Text>
              </View>
              <View className="flex-row justify-between my-2" >
                <Text className="mt-1"> 
                   <Ionicons name='location' size={24} color="grey" />
                 </Text>
                 <Text className={`text-slate-700 font-medium py-1 text-lg  pr-4 -mt-0.5 ${Platform.select({android : 'text-sm'})}`} > {props.location} </Text>
              </View>
              <View className="flex flex-row justify-between">
              <Text className="mt-0.5"> 
                   <Ionicons name='call' size={24} color="grey" />
                 </Text>
                 <Text className={`text-slate-700 font-medium py-1 text-lg  pr-4 -mt-0.5 ${Platform.select({android : 'text-sm'})}`} > {props.phone} </Text>
              </View>
          </View>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default ProductCard

const style = StyleSheet.create({
    card: {
      flex  : 1,
      elevation : 4,
      // backgroundColor: '#f2d5db',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius : 8,
      width  : '95%',
      alignSelf : 'center'
     }
  })