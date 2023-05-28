import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import  {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'

import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import image2 from '../assets/images/pexels-ekaterina-belinskaya-4700420.jpg';
import image3 from '../assets/images/pexels-engin-akyurt-6492065.jpg';
import image4 from '../assets/images/pexels-pixabay-325876.jpg';

import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLaundry } from '../store/actions/laundry_actions';


const data = [
    {name : "Mghwai Laundry", image :image1, id : 1, location : 'Nkuhungu' },
    {name : "Nupe Laundry", image :image2, id : 2, location :  "Iyumbu" },
    {name : "Darajani Cleaner", image :image3, id: 3, location :  "Makulu" },
    {name : "La-liga Laundry", image : image4 , id : 4, location :  "Uhindini"},
    {name : "Smart Laundry", image :image1, id: 5, location :  "Kisasa" },
    {name : "Ujasi Laundry", image :image2, id : 6, location :  "Coed  Ujasi" },
    {name : "Nupe Laundry", image :image2, id : 2, location :  "Iyumbu" },
    {name : "Darajani Cleaner", image :image3, id: 3, location :  "Makulu" },
    {name : "La-liga Laundry", image : image4 , id : 4, location :  "Uhindini"},
    {name : "Smart Laundry", image :image1, id: 5, location :  "Kisasa" },
    {name : "Ujasi Laundry", image :image2, id : 6, location :  "Coed  Ujasi" },
  ]


const AllProducts = () => {

    const navigation =  useNavigation();
    const {width, height} =  useWindowDimensions();
    const dispatch = useDispatch();
    const [reload,setReload] =  useState(0);

    const laundries =  useSelector(state => state.laundry);

    setTimeout(() => {
        setReload(reload => reload +1);
    }, 1000);

    useEffect(() => {
        if(laundries && laundries.all_laundry && reload < 4){
            dispatch( getAllLaundry() )
        }
    })

    useLayoutEffect (() => {
        navigation.setOptions({
            
            headerTintColor : "white"
        })
    })

    return (


    <View style={{width : width, height : height, marginBottom : 20}} className="bg-whitemb-6">
        <View style={{alignSelf : 'center'}} className="border-slate-500 border-b-2 w-10/12" >           
            <Text className="text-lg text-slate-800 text-center font-bold py-3" >All Services</Text>
        </View>
        <View style={{height  : responsiveHeight(81)}} className="my-4 mb-10">
            { laundries?.all_laundry?.data?.data ?
          <>
          <FlatList 
           data={laundries.all_laundry.data.data}
           style={{
            padding : 3,
            marginBottom : 12,
            height : height/1.3
           }}
           renderItem = {(itemData) => {
            return (
                <ProductCard name={itemData.item.laundryName} image={itemData.item.photo} location={itemData.item.location} phone = {itemData.item.telephone} id={itemData.item._id}  />
            )
           }}
           keyExtractor={(item) => item._id}
          />
          </>
           :  null    
        }
        </View>
    </View>
  )
}

export default AllProducts