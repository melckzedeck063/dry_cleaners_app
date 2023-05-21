import { View, Text, TouchableOpacity, useWindowDimensions,TouchableWithoutFeedback, StyleSheet, ScrollView, FlatList, Platform } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {Controller, useForm} from 'react-hook-form'
import { Ionicons, FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons }  from '@expo/vector-icons'
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions'


import image1 from '../assets/images/pexels-pramod-tiwari-13602888.jpg';
import image2 from '../assets/images/pexels-ekaterina-belinskaya-4700420.jpg';
import image3 from '../assets/images/pexels-engin-akyurt-6492065.jpg';
import image4 from '../assets/images/pexels-pixabay-325876.jpg';
// import categoryCard from '../components/categoryCard';
import CategoryCard from '../components/categoryCard';
import ProductCard from '../components/ProductCard';
import NavigationDrawer from '../components/NavigationDrawer'
// import { SafeAreaView } from 'react-native-safe-area-context';

const categories =  [
  {name : "Mghwai Laundry", image :image1, id : 1, location : 'Nkuhungu' },
  {name : "Nupe Laundry", image :image2, id : 2, location :  "Iyumbu" },
  {name : "Darajani Cleaner", image :image3, id: 3, location :  "Makulu" },
  {name : "La-liga Laundry", image : image4 , id : 4, location :  "Uhindini"},
  {name : "Smart Laundry", image :image1, id: 5, location :  "Kisasa" },
  {name : "Ujasi Laundry", image :image2, id : 6, location :  "Coed  Ujasi" },
]

const HomeScreen = () => {
    
    const navigation =  useNavigation();
    const {height, width} =  useWindowDimensions()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOutsidePress = (event) => {
      // if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        // }
        // console.log('clicked')
          setIsDrawerOpen(false);
    };

    // console.log(height);
   

    useLayoutEffect(() => 
    {
        navigation.setOptions({
            headerShown : false,
            headerStyle : {
                backgroundColor : "black"
            },
            headerTintColor : "white"
        })
    })

    const { register, reset, control, handleSubmit, formState: { errors, isDirty, isValid } } =  useForm();
 

  return (
    <>
      {/* <SafeAreaView className="" /> */}
    <TouchableWithoutFeedback onPress={handleOutsidePress} style={{ height : height, width : width, backgroundColor :  '#fff'}} className={`bg-slate-800 text-white relative px-1`}>
      <View>

      <View style={{height : responsiveHeight(3.8)}} className={`flex-row justify-between px-4 mt-14  ${Platform.select({android : 'mt-8'})} mb-4 ${height<=500?Platform.select({android : 'mt-6'}) :height>700?Platform.select({android : 'mt-10'}) :Platform.select({android : 'mt-8'})}`} >

        <View className="" >
            <TouchableOpacity className="rounded-lg bg-whitee h-8  w-8"
               onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                <Text>
                    <FontAwesome name='navicon' size={32}  color="#1c4966"  />
                </Text>
            </TouchableOpacity>
        </View>
        <View className="" >
        <TouchableOpacity className="rounded-lg bg-whitee h-8  w-8" >
                <Text>
                   <Ionicons name="notifications-sharp" size={32} color="#1c4966" />
                </Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={{alignSelf : 'center',height : responsiveHeight(12)}} className="my-2 flex-row space-x-6 justify-between w-full px-3" >
      <View style={[style.section, style.card]} className="rounded-lg pt-1">
        <Text style={style.sectionHeader} className={`text-center text-white font-bold text-xl`}>Welcome!</Text>
        <Text style={style.sectionText} className={`text-center text-white`}>Find a nearby dry cleaner</Text>
        <TouchableOpacity style={{alignSelf: "center"}} className="bg-sky-500 px-4 py-1 w-7/12 rounded-lg my-2">
            <Text className={`text-lg text-white text-center font-medium ${Platform.select({android : 'text-sm'})}`}>Find Dry Cleaner</Text>
        </TouchableOpacity>
      </View>
      </View>
      {/* <View style={[style.card, style.ad_card]} className={``}>
      </View> */}
      <View style={{height : responsiveHeight(26) }} className={`w-full ${Platform.select({android : 'mt-2'})}`} >
        <View className="flex-row justify-between" >
          <View>
             <Text className={`text-slate-800 font-bold text-lg px-2 py-1.5 ${Platform.select({android : 'text-sm'})}`} >Our Services</Text>
          </View>
           <TouchableOpacity
            // onPress={() =>  navigation.navigate('AllServices')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-2'})}`}  > See All </Text>  
           </TouchableOpacity>
        </View>
        
         <FlatList 
          data={categories}
          horizontal = {true}
          showsHorizontalScrollIndicator ={false}
          contentContainerStyle = {{
            paddingHorizontal : 1,
            paddingVertical : 5
          }}
          renderItem={(itemData) => {
            return (
               <CategoryCard name={itemData.item.name} image={itemData.item.image}  />
            )
          }}
          keyExtractor={(item) => item.id} 
         />
      </View>

      <View style={{height : responsiveHeight(32)}} className={` mb-1.5 ${height> 750? '-mt-14' : '-mt-4'} ${height > 700 ?Platform.select({android : '-mt-8'}) : ''}`} >
        <View style={style.container} className="" >
         <View className="flex-row justify-between" >
          <View>
             <Text className={`text-slate-800 font-bold text-lg px-2 py-1.5 ${Platform.select({android : 'text-sm'})}`} > Nearby Dry Cleaners </Text>
          </View>
           <TouchableOpacity 
            onPress={() =>  navigation.navigate('AllProducts')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-3'})}`} > See All </Text>  
           </TouchableOpacity> 
          </View>
          <FlatList className="borderd-2 border-gray-400 rounded pr-1.5 pl-1" 
           
           data={categories}
           renderItem={(itemData) => {
            return (
              <ProductCard name={itemData.item.name} image={itemData.item.image} location={itemData.item.location}  />
            )
           }}
          />
        </View>
      </View>

      <View  style={[style.drawer, isDrawerOpen ? { left: 0 } : { left: -250 }]} className="bg-slatee-700 -ml-1 relative">
          {/* <TouchableOpacity onPress={() => setIsDrawerOpen(false)} className="pt-3  my-2 mr-2">
            {Platform.select({android : <Ionicons name="close" size={42} color="red" /> })}
            {Platform.select({ios: <Ionicons name="close" size={42} color="red" /> })}
          </TouchableOpacity> */}

          <NavigationDrawer />
      </View>
      </View>

    </TouchableWithoutFeedback>
    </>
  )
}

export default HomeScreen

const style = StyleSheet.create({
  card: {
    flex  : 1,
    elevation : 4,
    backgroundColor: '#1c4966',
    shadowColor: 'black',
    shadowOffset :{width : 0, height : 2} ,
    shadowOpacity: 0.25,
    shadowRadius : 8,
    width  : '90%'
   },
   ad_card :  {
    height  : responsiveHeight(10)
   },
   container: {
    height: responsiveHeight(46), // 50% of window height
    width: responsiveWidth(100), // 50% of window width
  },
  sampleText: {
    fontSize: responsiveFontSize(2) // 2% of total window size
  },
  drawer: {
    position: "absolute",
    left: -280,
    top: 0,
    bottom: 0,
    width: responsiveWidth(60),
    height : responsiveHeight(100),
    backgroundColor :  '#1c4966',
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
  },
})





{/* 
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <View style={styles.categories}>
            <View style={styles.category}>
              <Image style={styles.categoryIcon} source={image} />
              <Text style={styles.categoryTitle}>Wash & Fold</Text>
            </View>
            <View style={styles.category}>
              <Image style={styles.categoryIcon} source={image} />
              <Text style={styles.categoryTitle}>Dry Cleaning</Text>
            </View>
            <View style={styles.category}>
              <Image style={styles.categoryIcon} source={image} />
              <Text style={styles.categoryTitle}>Alterations</Text>
            </View>
            <View style={styles.category}>
              <Image style={styles.categoryIcon} source={image} />
              <Text style={styles.categoryTitle}>Shoe Repair</Text>
            </View>
          </View>
        </View> */}