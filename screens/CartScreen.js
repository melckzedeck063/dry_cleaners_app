import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect,useState ,useEffect} from 'react'
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import PopupComponent from '../components/PopupComponent';

import {useCart} from 'react-use-cart';

import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import image2 from '../assets/images/pexels-ekaterina-belinskaya-4700420.jpg';
import image3 from '../assets/images/pexels-engin-akyurt-6492065.jpg';
import image4 from '../assets/images/pexels-pixabay-325876.jpg';
import { StatusBar } from 'expo-status-bar';
import { allCartItems } from '../store/actions/cart_actions';
import { useDispatch,useSelector } from 'react-redux';


const CartScreen = () => {

    const navigation =  useNavigation();
    // const {params : {props}} =  useRoute();
    const dispatch = useDispatch();

    const {getItem, totalItems, items, totalUniqueItems,cartTotal} =  useCart();

    // console.log(items)
    const {width, height}  = useWindowDimensions();
    console.log(height)

    const [reload,setReload] =  useState(0)

    const notifications =  useSelector(state => state.notification);

    // console.log(notifications)

    const cart_items =  useSelector(state => state.cart_items);

    console.log(cart_items.cart_items);
    // let data  =   cart_items.cart_items;

    // console.log(data)

    setTimeout(() => {
      if(reload  < 5){
        setReload(reload => reload + 1)
      }
    }, 1000);

    useEffect(()  => {
      if(cart_items && cart_items.cart_items  && reload < 3){
        dispatch( allCartItems() )
      }
    })
    
    const totalBills =  (data)  => {
      let total = 0;
  
      for(let x= 0;   x < data.length;  x++){
         total += parseInt(data[x].total_cost)
      }
      return total;
    }


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
      <View className={``}>
         {/* <Text>CartScreen</Text> */}
         <View style={{width : responsiveWidth(92), alignSelf : 'center'}} className="flex-row justify-between">
            {/* <Text className={`font-bold text-xl`}>My Bucket</Text> */}
         </View>
         <View style={{height : responsiveHeight(68)}} className="">
          {
            cart_items?.cart_items?.data?.data.length >= 1?(
              <>
            <FlatList
              data={cart_items.cart_items.data.data}
              horizontal = {false}
               showsHorizontalScrollIndicator ={false}
               contentContainerStyle = {{
               paddingHorizontal : 1,
               paddingVertical : 5
        }}
              renderItem={(itemData) => {
                  return (
                      <CartItem image={itemData.item.product.photo} name={itemData.item.product.serviceName}  price={itemData.item.product.price} id={itemData.item._id} amount={itemData.item.amount}  />
                  )
              }}
              keyExtractor={(item)  => item._id}
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
         <View style={{height :  responsiveHeight(11.5), backgroundColor: '#1c4966',}} className="bg-slate-700 mt-1">
          {
             cart_items?.cart_items?.data?.data.length >= 1?(
              <>
            <View style={{alignSelf : 'center'}} className="flex flex-row justify-between w-10/12">
                <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-slate-100 font-medium text-xl py-1`}>Total Price ({cart_items.cart_items.results}) </Text>
                <Text style={{fontSize :  responsiveFontSize(2.3)}} className={`text-orange-500 font-medium py-1`}> {totalBills(cart_items.cart_items.data.data)} Tshs   Tsh </Text>
            </View>
            <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-sky-600 ${height < 700?'-mt-1' : 'mt-2'} rounded-md w-11/12 px-4 py-2 `} 
              onPress={() => navigation.navigate('ConfirmOrder',{items})}
            >
                <Text style={{fontSize :  responsiveFontSize(2)}} className="text-center text-white font-bold">Place Order</Text>
            </TouchableOpacity>
              </>
            )
            :
            <>
            <View className="py-3">
               <Text className="text-white text-sm font-medium text-center">No item item please add one</Text>
            </View>
            </>
          }
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