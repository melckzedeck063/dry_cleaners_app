import { View, Text, TouchableOpacity, useWindowDimensions,TouchableWithoutFeedback, StyleSheet, ScrollView, FlatList, Platform, Image } from 'react-native'
import React, { useLayoutEffect, useState, useEffect,useRef } from 'react'
import { useNavigation } from '@react-navigation/core'
import {Controller, useForm} from 'react-hook-form'
import { Ionicons, FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons }  from '@expo/vector-icons'
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions'
import * as Location from 'expo-location';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Tooltip } from 'react-native-elements';


// import categoryCard from '../components/categoryCard';
import CategoryCard from '../components/categoryCard';
import ProductCard from '../components/ProductCard';
import NavigationDrawer from '../components/NavigationDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLaundry } from '../store/actions/laundry_actions'
import { getAllCategories } from '../store/actions/category_action'

// import { SafeAreaView } from 'react-native-safe-area-context';

const driversAround = [
  { latitude: -6.244117, longitude: 35.825196, name: "zedenga", phone: "0744219981" },
];

const HomeScreen = () => {
    
    const navigation =  useNavigation();
    const  dispatch =  useDispatch();
    const {height, width} =  useWindowDimensions()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [reload, setReload] =  useState(0)
    const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const _map = useRef(1);
  const [latlong, setLatlong] = useState({});

    const our_categories = useSelector(state => state.category);
    // console.log(our_categories.categories);

    const laundries =  useSelector(state => state.laundry);
    // console.log(laundries.all_laundry);

    const handleOutsidePress = (event) => {

          setIsDrawerOpen(false);
    };

    // console.log(height);

    setTimeout(() => {
      if(reload  <  5){
       setReload(reload + 1)
      }
     }, 1000);
   

     useEffect(() => {
      if(our_categories &&  our_categories.categories.length < 1 &&  reload <=3){
        dispatch( getAllCategories() )
      }
     })

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
   
     useEffect(() => {
       if(laundries && laundries.all_laundry.length < 1 && reload <=  3){
         dispatch( getAllLaundry() )
       }
     },[laundries, reload])
     

     const checkPermission = async () => {
      const hasPermission = await Location.requestForegroundPermissionsAsync();
  
      if (hasPermission.status === "granted") {
        const permission = askPermission();
        return permission;
      }
      return true;
    }
  
    const askPermission = async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      return permission.status === "granted";
    }
  
    const getCurrentLocation = async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return;
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        setLatlong({ latitude: latitude, longitude: longitude });
  
      }
      catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      checkPermission();
      getCurrentLocation();
  
      console.log(latlong);
    }, []);
  
   

    

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
        {/* <TouchableOpacity className="rounded-lg bg-whitee h-8  w-8" >
                <Text>
                   <Ionicons name="notifications-sharp" size={32} color="#1c4966" />
                </Text>
        </TouchableOpacity> */}
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
      
      <View style={{height : responsiveHeight(26) }} className={`w-full ${Platform.select({android : 'mt-2'})}`} >
        <View className="flex-row justify-between" >
          <View>
             <Text className={`text-slate-800 font-bold text-lg px-2 py-1.5 ${Platform.select({android : 'text-sm'})}`} >Our Services</Text>
          </View>
           <TouchableOpacity
            onPress={() => navigation.navigate('AllCategories') }
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-2'})}`}  > See All </Text>  
           </TouchableOpacity>
        </View>
        {
          our_categories?.categories?.data?.data ?(
            <FlatList 
             data={our_categories.categories.data.data}
             horizontal = {true}
             showsHorizontalScrollIndicator ={false}
             contentContainerStyle = {{
               paddingHorizontal : 1,
               paddingVertical : 5
             }}
             renderItem={(itemData) => {
               return (
                  <CategoryCard name={itemData.item.categoryName} image={itemData.item.photo} desc =  {itemData.item.description} id={itemData.item._id}  />
               )
             }}
             keyExtractor={(item) => item._id} 
            />

          )
           :  
           <>
           </>
        }
      </View>

      <View style={{height : responsiveHeight(32)}} className={` mb-1.5 ${height> 750? '-mt-14' : '-mt-4'} ${height > 700 ?Platform.select({android : '-mt-8'}) : ''}`} >
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

         <View>
         <View style={style.container}>
         <View style={style.mapContainer}>
          {
            laundries?.all_laundry?.data?.data?(
              <>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          style={style.map}
          showsUserLocation={true}
          followsUserLocation={true}
          rotateEnabled={true}
          zoomControlEnabled={true}
          toolbarEnabled={true}
          initialRegion={{
            ...driversAround[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {driversAround.map((item, index) =>
            <Marker coordinate={item} key={index.toString()}>
              
                {/* <Image
                  source={require('../assets/images/laundry.png')}
                  resizeMode='cover'
                  style={style.driverImage}
                /> */}
              <Text className="text-slate-800  font-light">  </Text>
            </Marker>
          )}

    {laundries?.all_laundry?.data?.data.map((laundry, index) => (
      <Marker
        coordinate={{ latitude: laundry.geo.latitude, longitude: laundry.geo.longitude }}
            key={index.toString()}
          >
        <Image source={require('../assets/images/laundry.png')} resizeMode='cover' style={style.driverImage} />
        <Tooltip popover={<Text>{laundry.laundryName}</Text>} backgroundColor="white">
          <Text style={style.laundryName}>{laundry.laundryName}</Text>
        </Tooltip>
     </Marker>
    ))}
        </MapView>
              </>
            )
            :
            <>
             <View>
              <Text className="text-blue-500 text-center py-12 font-medium text-lg">Loading ....</Text>
             </View>
            </>
          }
      </View>
    </View>

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
  container2: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  driverImage: {
    height: responsiveHeight(8),
    width: responsiveWidth(12)
  }
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