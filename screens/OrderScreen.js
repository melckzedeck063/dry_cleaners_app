import { View, Text, FlatList } from 'react-native'
import React, { useLayoutEffect,useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch,useSelector } from 'react-redux';

import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'

import OrderComponent from '../components/orderComponent';
import { getMyOrders } from '../store/actions/order_actions';



const OrderScreen = () => {

    const  navigation =  useNavigation();
    const dispatch =   useDispatch();

    const  [reload, setReload] =  useState(0);

    setTimeout(() => {
      if(reload  <  5){
        setReload(reload => reload +1)
      }
    }, 1000);

    const my_orders = useSelector(state => state.order)
    // console.log(my_orders.my_orders)

    useEffect(() => {
      if(my_orders && my_orders.my_orders && reload  < 3){
        dispatch ( getMyOrders())
      }
    })

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
    <View style={{height : responsiveHeight(100)}} className={`bg-slate-100`}>
        <View style={{height  :  responsiveHeight(7)}}>
            <Text style={{fontSize : responsiveFontSize(2)}} className={`text-center font-bold py-1 pt-2 text-slate-700`}>OrderScreen</Text>
        </View>

        <View style={{height  :  responsiveHeight(82)}} className="">
            {
               my_orders?.my_orders?.data?.data.length >= 1 ? (
                    <>
                    <FlatList 
                     data={my_orders.my_orders.data.data}
                     showsVerticalScrollIndicator ={false}
                     contentContainerStyle = {{
                        paddingHorizontal : 1,
                        paddingVertical : 5
                      }}
                     renderItem={(itemData) => {
                        return (
                            <>
                            <OrderComponent amount={itemData.item.amounts} cost={itemData.item.total_cost}  date={itemData.item.createdAt} status={itemData.item.order_status} order_id={itemData.item.order_id} fname={itemData.item.ordered_by.firstName} lname={itemData.item.ordered_by.lastName} id={itemData.item._id} items={itemData.item.order_items}   />
                            </>
                        )
                     }}

                     keyExtractor={(item) => item._id}
                    />
                    </>
                )
                :
                <>
                </>
            }
        </View>
    </View>
  )
}

export default OrderScreen