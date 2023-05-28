import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';

import {useCart} from 'react-use-cart';

import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import image2 from '../assets/images/pexels-ekaterina-belinskaya-4700420.jpg';
import image3 from '../assets/images/pexels-engin-akyurt-6492065.jpg';
import image4 from '../assets/images/pexels-pixabay-325876.jpg';


const CartScreen = () => {

    const navigation =  useNavigation();
    // const {params : {props}} =  useRoute();

    const {getItem, totalItems, items, totalUniqueItems,cartTotal} =  useCart();

    console.log(items)

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
         <View style={{width : responsiveWidth(96), alignSelf : 'center'}} className="flex-row justify-between">
            {/* <Text className={`font-bold text-xl`}>My Bucket</Text> */}
         </View>
         <View style={{height : responsiveHeight(68)}} className="">
          {
            items && items.length >= 1?(
              <>
            <FlatList
              data={items}
              horizontal = {false}
               showsHorizontalScrollIndicator ={false}
               contentContainerStyle = {{
               paddingHorizontal : 1,
               paddingVertical : 5
        }}
              renderItem={(itemData) => {
                  return (
                      <CartItem image={itemData.item.image} name={itemData.item.name}  price={itemData.item.price} quantity={itemData.item.quantity} id={itemData.item.id} />
                  )
              }}
              keyExtractor={(item)  => item.id}
            />
              </>
            )
             :
             <>
             <View className="my-1" >
              <Text style={{fontSize : responsiveFontSize(2)}} className={`font-medium text-sky-500 py-8 text-center`}>Your cart is empty! </Text>
             </View>
             </>
          }
         </View>
         <View style={{height :  responsiveHeight(10), backgroundColor: '#1c4966',}} className="bg-slate-700 mt-1">
            <View style={{alignSelf : 'center'}} className="flex flex-row justify-between w-10/12">
                <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-slate-100 font-medium text-xl py-1`}>Total Price ({totalUniqueItems}) </Text>
                <Text style={{fontSize :  responsiveFontSize(2.3)}} className={`text-orange-500 font-medium py-1`}> {cartTotal}  Tsh </Text>
            </View>
            <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-sky-600 mt-1 rounded-lg w-11/12 px-4 py-1.5 `} >
                <Text style={{fontSize :  responsiveFontSize(2)}} className="text-center text-white font-bold">Place Order</Text>
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