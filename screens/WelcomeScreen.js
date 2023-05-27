import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'

import image from '../assets/images/pexels-polina-tankilevitch-4440521.jpg';
import image2  from '../assets/images/pexels-engin-akyurt-6492065.jpg';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false
        })
    })
  return (
      <View style={styles.container}>
        <ImageBackground source={image2} resizeMode='cover'
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
        imageStyle={{ opacity : 0.9}}
        >
    {/* <View style={{height  : responsiveHeight(40)}} className="bg-white">

    </View> */}
      <View style={styles.header}>
        <Image source={{source : image2}} style={{height : responsiveHeight(58)}} />
      </View>
      <View style={styles.body} className="rounded-t-3xl">
        <Text className={`text-2xl font-bold text-center mb-4 ${Platform.select({android : 'text-xl'})}`}>Welcome to Laundry Connect</Text>
        <Text  className={`text-lg my-2 ${Platform.select({android : 'text-sm'})}`} >The easiest way to get your laundry done.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <FontAwesome5 name="sign-in-alt" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('SignUp')}>
          <FontAwesome5 name="user-plus" size={20} color="#00BFFF" />
          <Text style={styles.buttonOutlineText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  body: {
    flex: 2,
    paddingHorizontal: 30,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor  : "#fff"
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00BFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderColor: '#00BFFF',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonOutlineText: {
    color: '#00BFFF',
    fontSize: 18,
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default WelcomeScreen;



{/* <View style={styles.header}>
        <Image source={{source : image}} style={{height : responsiveHeight(30)}} />
        <Text style={styles.title}>Welcome to Laundry Connect</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>The easiest way to get your laundry done.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <FontAwesome5 name="sign-in-alt" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('SignUp')}>
          <FontAwesome5 name="user-plus" size={20} color="#00BFFF" />
          <Text style={styles.buttonOutlineText}>Create an account</Text>
        </TouchableOpacity>
      </View> */}