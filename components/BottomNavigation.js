import * as React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome, Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';
import Profile from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';


const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'home'
                      : 'home-outline'
                  }
                  size={size}
                  color={color}
                  
                />
              );
            } else if (route.name === 'Cart') {
              return (
                <FontAwesome
                  name={focused ? 'shopping-cart' : 'shopping-cart'}
                  size={size}
                  color={color}
                />
              );
            }
            // else if (route.name === 'Settings') {
            //     return (
            //       <Ionicons
            //         name={focused ? 'settings' : 'md-settings-outline'}
            //         size={size}
            //         color={color}
            //       />
            //     );
            //   }
              else if (route.name === 'Orders') {
                return (
                  <Ionicons
                    name={focused ? 'list-circle' : 'list-circle-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
          },
          tabBarInactiveTintColor: 'grey',
          tabBarActiveTintColor: '#1c4966',
          tabBarStyle : {
            backgroundColor : '#fff',
            opacity : 0.9
          }
          // tabBarBackground : {
          //   backgroundColor : 'black'
          // }
          
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        //   options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen name="Cart" component={CartScreen}
         
        />
        {/* <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarBadge: 3 }} /> */}
        <Tab.Screen name="Orders" component={OrderScreen} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}