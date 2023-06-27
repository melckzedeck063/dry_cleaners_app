import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState,useCallback } from 'react'
import { useCart} from 'react-use-cart'
import { useNavigation, useRoute } from '@react-navigation/native'
import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import {AntDesign, EvilIcons, MaterialIcons, Entypo} from '@expo/vector-icons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { IMAGE_URL } from '../store/URL';
import { set } from 'react-hook-form';
import { allCartItems, deleteCartItem, updateCartItem } from '../store/actions/cart_actions';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
    const  navigation =  useNavigation();
    // const  {params :  {props}} =  useRoute();
    const [item,setItem] = useState(props.quantity);
    // console.log(props)
    const [amount,  setAmount] =  useState(1)
    const dispatch =   useDispatch();

    // console.log(props)
    const addAmount = () => {
      setAmount(amount =>  amount + 1)
      setTimeout(() => {
  
        if(amount != 1){
          const data = {
            amount : amount,
            id :  props.id,
            total_cost : props.price * amount
          }
          dispatch( updateCartItem(data))
          setTimeout(() => {
            dispatch( allCartItems() )
            // navigation.navigate('CartScreen')
          }, 500);
        }
      }, 1000);
   }
  
   const  decreaseAmount = () => {
    if(props.amount >=  2){  
      setAmount( props.amount - 1)
      setTimeout(() => {
          const data = {
            amount : amount,
            id :  props.id,
            total_cost : props.price * amount
          }
          dispatch( updateCartItem(data))
          setTimeout(() => {         
            dispatch( allCartItems() )
            // navigation.navigate('CartScreen')
          }, 500);
      }, 1000);
    }
   }
  
    const deleteItem = (id) => {
      dispatch( deleteCartItem(props.id) )

      setTimeout(() => {
        dispatch( allCartItems() )
      }, 1000);
      // navigation.navigate('CartScreen')
    }
    
    
    // console.log(item)

  return (
    <View>
      <View style={style.card} className="flex-row justify-between p-1 my-1 rounded-lg">
                <View className="h-20 w-24 rounded-full">
                    <Image source={{uri : `${IMAGE_URL}/${props.image}`}} className="h-20 w-24 rounded-lg" />
                </View>
                <View>
                    <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-xl text-slate-800 font-medium my-1.5`}> {props.name} </Text>
                    <View className="flex-row justify-between space-x-2">
                        <TouchableOpacity className="h-8 w-8 bg-slate-800 rounded-lg px-1 py-1"
                          onPress={() => decreaseAmount(props.id) }
                        >
                            <Text className={`text-xl text-white font-bold -mt-0.5`}> 
                                 <Entypo name='minus' size={24} color="white"  />
                             </Text>
                        </TouchableOpacity>
                        <View>
                        <Text style={{fontSize :  responsiveFontSize(2.5)}} className={`text-2xl text-slate-800 font-bold`}> {props.amount} </Text>
                        </View>
                        <TouchableOpacity className="h-8 w-8 bg-white  border-2 border-slate-800 rounded-lg px-1 py-1"
                         onPress={() => addAmount(props.id) }
                        >
                            <Text className={`text-xl text-slate-800 font-bold -mt-1 -ml-0.5`}>
                                <MaterialIcons name='add' size={24} color="black"  />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="my-1 mt-3 pr-1.5 relative">
                    <TouchableOpacity className={`text-slate-800 font-medium aboslute -right-12 -top-3`}
                     onPress={() =>  deleteItem(props.id)}
                    > 
                    <EvilIcons name="close-o" size={36} color="red" className="absolute top-1 right-3 mr-2" />
                    </TouchableOpacity>
                    <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-xl text-orange-500 font-bold pt-2 -mt-1`}> {props.price} Tsh </Text>
                </View>
             </View>
    </View>
  )
}

export default CartItem;

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