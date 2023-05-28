import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useCart} from 'react-use-cart'
import { useNavigation, useRoute } from '@react-navigation/native'
import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import {AntDesign, EvilIcons, MaterialIcons, Entypo} from '@expo/vector-icons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { IMAGE_URL } from '../store/URL';
import { set } from 'react-hook-form';

const CartItem = (props) => {
    const  navigation =  useNavigation();
    // const  {params :  {props}} =  useRoute();
    const [item,setItem] = useState(props.quantity);
    // console.log(props)

    const {updateItem, removeItem,updateItemQuantity} =  useCart();

    const removeCartItem = (id) => {
        console.log(id)
    }

    const addCartItem = (id)  =>{
        setItem(item => item + 1);
        setTimeout(() => {
            updateItemQuantity(id, (props.quantity + item))
        }, 500);
    }

    const minusCartItem = (id) => {
        if(item > 1){
            setItem(item => item - 1)

            setTimeout(() => {
                updateItemQuantity(id, (props.quantity - item))
            }, 500);
        }
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
                          onPress={() => minusCartItem(props.id) }
                        >
                            <Text className={`text-xl text-white font-bold -mt-0.5`}> 
                                 <Entypo name='minus' size={24} color="white"  />
                             </Text>
                        </TouchableOpacity>
                        <View>
                        <Text style={{fontSize :  responsiveFontSize(2.5)}} className={`text-2xl text-slate-800 font-bold`}> {props.quantity} </Text>
                        </View>
                        <TouchableOpacity className="h-8 w-8 bg-white  border-2 border-slate-800 rounded-lg px-1 py-1"
                         onPress={() => addCartItem(props.id) }
                        >
                            <Text className={`text-xl text-slate-800 font-bold -mt-1 -ml-0.5`}>
                                <MaterialIcons name='add' size={24} color="black"  />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="my-1 mt-3 pr-1.5 relative">
                    <TouchableOpacity className={`text-slate-800 font-medium aboslute -right-14 -top-3`}
                     onPress={() => removeCartItem(props.id)}
                    > 
                    <EvilIcons name="close-o" size={36} color="red" className="absolute top-1 right-1" />
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