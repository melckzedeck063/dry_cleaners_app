import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';


import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import image2 from '../assets/images/pexels-ekaterina-belinskaya-4700420.jpg';
import image3 from '../assets/images/pexels-engin-akyurt-6492065.jpg';
import image4 from '../assets/images/pexels-pixabay-325876.jpg';
// import categoryCard from '../components/categoryCard';
// import CategoryCard from '../components/categoryCard';
import ProductCard from '../components/ProductCard';


const categories =  [
  {name : "Mghwai Laundry", image :image1, id : 1, location : 'Nkuhungu' },
  {name : "Nupe Laundry", image :image2, id : 2, location :  "Iyumbu" },
  {name : "Darajani Cleaner", image :image3, id: 3, location :  "Makulu" },
  {name : "La-liga Laundry", image : image4 , id : 4, location :  "Uhindini"},
]

const CategoryScreen = () => {
    const navigation =  useNavigation();
    const {params : {props}} =  useRoute();
    const {width, height} =  useWindowDimensions();

    // console.log(height);

    useLayoutEffect(() => {
        navigation.setOptions({
        //    headerShown : false
        })
    })

  return (
    <>
     {/* <ScrollView   > */}
     <View style={{backgroundColor :  '#fff'}} className="h-full">
     <View className="relative">
        <Image style={{height : responsiveHeight(31)}} source={props.image} className="w-full" />
        <View className='absolute inset-0 bg-black/60' ></View>
        <View className="absolute bottom-2 px-2">
            {/* <Text className={`font-bold my-1.5 text-2xl capitalize text-white ${Platform.select({android : 'text-xl'})}`}>{props.name}</Text> */}
        </View>
      </View>

     <View className="mx-2 px-2 mb-2">
      <View className={`flex flex-row justify-between my-3 ${height <  850 ?  'my-2' :  ''}`}>
        <Text className={`font-bold capitalize text-slate-800 text-xl py-2 ${Platform.select({android : 'text-lg'})}`}>{props.name}</Text>
        
        <TouchableOpacity className="px-2 h-9 -p-1 bg-orange-400 flex flex-row space-x-2 rounded-lg"
          onPress={()  => navigation.navigate('NewProduct',{
            props
          }) }
        >
          <Text className={`mt-0.5`}>
            {Platform.select({android :<Ionicons name='add-circle' size={24}  color="white" /> ,  ios :<Ionicons name='add-circle' size={32}  color="white" /> })}
          </Text>
          <Text className={`text-white font-bold mt-1 text-lg ${Platform.select({android : 'text-sm'})}`}>New</Text>
        </TouchableOpacity>

      </View>
        <Text className={`font-mediumm capitalize text-slate-800 ${height  < 838 ? '-mt-1' :  ''} px-2 ${Platform.select({android : 'text-xs'})}`}> 
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quam suscipit veniam ut doloremque quas, reprehenderit commodi deserunt 
         perferendis ducimus ullam fuga sequi optio laboriosam quaerat ipsum asperiores eius nemo.
        </Text>
     </View>

     <View className={``}>

     </View>

      <View style={{height : responsiveHeight(41)}} className={`w-full mb-3 px-2.5 ${Platform.select({android : 'mt-2'})}`} >
        <View className="flex-row justify-between" >
          <View>
             <Text className={`text-slate-800 font-bold text-xl px-2 -mt-1 pb-1.5 ${Platform.select({android : 'text-lg'})}`} >Available Dry Cleaners</Text>
          </View>
           {/* <TouchableOpacity
            onPress={() =>  navigation.navigate('AllCategories')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-2'})}`}  > See All </Text>  
           </TouchableOpacity> */}
        </View>
        
         <FlatList 
          data={categories}
          horizontal = {false}
          showsHorizontalScrollIndicator ={false}
          contentContainerStyle = {{
            paddingHorizontal : 1,
            paddingVertical : 5
          }}
          renderItem={(itemData) => {
            return (
               <ProductCard name={itemData.item.name} image={itemData.item.image} location={itemData.item.location}  />
            )
          }}
          keyExtractor={(item) => item.id}
         />
      </View>

     </View>
     {/* </ScrollView> */}
    </>
  )
}

export default CategoryScreen