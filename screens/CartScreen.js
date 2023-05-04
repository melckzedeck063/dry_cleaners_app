import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';

import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import image2 from '../assets/images/pexels-ekaterina-belinskaya-4700420.jpg';
import image3 from '../assets/images/pexels-engin-akyurt-6492065.jpg';
import image4 from '../assets/images/pexels-pixabay-325876.jpg';

const services =  [
    {name : "T-shirt", image :image1, id : 1, price :   500 },
    {name : "Trouser", image :image2, id : 2, price :   1000 },
    {name : "Gown", image :image3, id: 3, price :   1000 },
    {name : "Suit", image : image4 , id : 4, price :   3000},
    {name : "Blankets", image :image1, id: 5, price :   3000 },
    {name : "Jeans", image :image2, id : 6, price :   1500 },
    {name : "Pull Over", image :image1, id : 7, price :   500 }
  ]


const CartScreen = () => {

    const navigation =  useNavigation();
    // const {params : {props}} =  useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown :  true,
            headerStyle: {
              backgroundColor: '#1c4966',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        })
    })
  return (
    <View>
        {/* <SafeAreaView  /> */}
      <View className="pt-5">
         {/* <Text>CartScreen</Text> */}
         <View style={{width : responsiveWidth(95), alignSelf : 'center'}} className="flex-row justify-between">
            {/* <Text className={`font-bold text-xl`}>My Bucket</Text> */}
         </View>
         <View style={{height : responsiveHeight(68)}} className="">
              <FlatList
                data={services}
                horizontal = {false}
                 showsHorizontalScrollIndicator ={false}
                 contentContainerStyle = {{
                 paddingHorizontal : 1,
                 paddingVertical : 5
          }}
                renderItem={(itemData) => {
                    return (
                        <CartItem image={itemData.item.image} name={itemData.item.name}  price={itemData.item.price} />
                    )
                }}
                keyExtractor={(item)  => item.id}
              />
         </View>
         <View style={{height :  responsiveHeight(12)}} className="bg-slate-200">
            <View style={{alignSelf : 'center'}} className="flex flex-row justify-between w-10/12">
                <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-slate-800 font-medium text-xl py-1`}>Total Price (3) </Text>
                <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-orange-500 font-medium text-xl py-1`}>8500  Tsh </Text>
            </View>
            <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-sky-600 mt-1 rounded-lg w-10/12 px-4 py-1.5`} >
                <Text style={{fontSize :  responsiveFontSize(2)}} className="text-center text-white font-bold">Schedule</Text>
            </TouchableOpacity>
         </View>
      </View>
         
    </View>
  )
}

export default CartScreen

const style = StyleSheet.create({
    card: {
    //   flex  : 1,
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius : 8,
      width  : '95%',
      alignSelf : 'center'
     }
  })