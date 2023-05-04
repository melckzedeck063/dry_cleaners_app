import * as React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome, Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';


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
              else if (route.name === 'Settings') {
                return (
                  <Ionicons
                    name={focused ? 'settings' : 'settings-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
          },
          tabBarInactiveTintColor: 'pink',
          tabBarActiveTintColor: 'white',
          tabBarStyle : {
            backgroundColor : '#1c4966',
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
        <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarBadge: 3 }}
         
        />
        {/* <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarBadge: 3 }} /> */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}