import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'

import {FontAwesome, Ionicons, Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions'
import { IMAGE_URL } from '../store/URL'

const ServiceCard = (props) => {
  const navigation =  useNavigation();

  // console.log(props.image)

  const handleCart = () => {
    setTimeout(() => {
        navigation.navigate('Cart', {
            props
        })
    }, 2000);
  }

  return (
    <View style={style.card} className="bg-slate-700 mx-1.5 my-1.5 relative rounded-lg">
      <TouchableOpacity 
    //   onPress={() => navigation.navigate('Laundry', {
    //     props
    //   }) } 
      >
        <Image source={{uri : `${IMAGE_URL}/${props.image}`}} className="h-52 w-full rounded-lg"  />
      <View style={{alignSelf : 'center', backgroundColor : '#1c4966'}} className="bg-slate-600 absolute w-11/12 rounded-lg -py-1 bottom-1" >
        <Text className={`text-white text-lg font-bold capitalize ${Platform.select({android : 'text-sm'})}`} > {props.name} </Text>
        <View className="flex-row justify-between px-1">
            <View className="mt-1">
              <Text className={`text-white font-medium py-1 -mt-0.5 ${Platform.select({android : 'text-xs'})}`} > {props.price} Tsh </Text>
            </View>
            <TouchableOpacity  className="bg-orange-500 rounded-l-xl bottom-3"
              onPress={handleCart}
            >
                <Text className="text-white  text-xl px-2 py-0.5">
                    <Entypo name='shopping-cart' size={24} color="white"  />
                </Text>
            </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default ServiceCard

const style = StyleSheet.create({
    card: {
      flex  : 1,
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius : 8,
      width  : '90%'
     }
  })