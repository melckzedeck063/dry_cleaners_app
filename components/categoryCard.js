import { View, Text , StyleSheet, Image, TouchableOpacity, Platform} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {responsiveHeight, responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions'
import image from '../assets/images/pexels-polina-tankilevitch-4440521.jpg';
import { IMAGE_URL } from '../store/URL'

const CategoryCard = (props) => {

  const navigation =  useNavigation();

  return (
    <TouchableOpacity className="mx-1.5 rounded-lg my-1"
    onPress={() => navigation.navigate('Service', {
      props
    }) }
    >
      <View style={style.category}>
            <Image style={{width : responsiveWidth(30)}} source={{uri :  `${IMAGE_URL}/${props.image}`}} className="h-24 w-32 overflow-hidden"  />
              <Text style={style.categoryTitle} className={`pt-2 font-medium`}>{props.name}</Text>
            </View>
    </TouchableOpacity>
  )
}

export default CategoryCard

const style = StyleSheet.create({
    card: {
      flex  : 1,
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius : 8,
      width  : '90%',
      borderRadius  :  8,
      marginRight  : 2
     },
     categoriesContainer: {
      marginBottom: 24,
    },
    categoriesTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    categories: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    category: {
      alignItems: 'center',
      justifyContent: 'center',
      // width: 80,
      // height: 80,
      // borderRadius: 8,
      backgroundColor: '#F2F2F2',
    },
    categoryIcon: {
      width: 40,
      height: 40,
      marginBottom: 8,
    },
    categoryTitle: {
      fontSize: responsiveFontSize(1.4),
      textAlign: 'center',
    },
  })