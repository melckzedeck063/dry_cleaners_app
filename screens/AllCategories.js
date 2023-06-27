import { View, Text, useWindowDimensions, FlatList, TextInput } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'


import { useState, useEffect } from 'react'
import {Controller, useForm, Control} from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons';

import CategoryCard from '../components/categoryCard';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch,useSelector } from 'react-redux';
import { getAllCategories } from '../store/actions/category_action'



const AllCategories = () => {

    const navigation =  useNavigation();
    const {width,height} =  useWindowDimensions()
    const dispatch = useDispatch();
    const [reload,setReload] = useState();

  

  // console.log(searchQuery)
  // console.log(items, "home")
  setTimeout(() => {
    if(reload  <  5){
     setReload(reload + 1)
    }
   }, 1000);
 
   const our_categories = useSelector(state => state.category);
   // console.log(our_categories.categories);

   useEffect(() => {
    if(our_categories &&  our_categories.categories.length < 1 &&  reload <=3){
      dispatch(  getAllCategories() )
    }
   })

    useLayoutEffect(() => 
    {
        navigation.setOptions({
            // headerShown : false,
            headerStyle : {
                backgroundColor : "#161E35"
            },
            headerTintColor : "white"
        })
    })
    
  return (
    <View className="w-full h-full bg-slate-800">
      <View style={{alignSelf : "center"}} className="my-4 border-b-2 border-slate-400 w-11/12">
        {/* <Text className="text-lg text-center text-green-500" > All Categories </Text> */}

      </View>


      <View className="px-2">
        {
          our_categories?.categories?.data?.data.length >= 1?(
            <>
          <FlatList
           data={our_categories.categories.data.data}
           numColumns={3} 
           renderItem={(itemData) => {
             return(
              <CategoryCard name={itemData.item.categoryName} image={itemData.item.photo} desc =  {itemData.item.description} id={itemData.item._id}  />
             )
           }}
           keyExtractor={(item) =>item._id }
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

export default AllCategories