import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons, AntDesign, Entypo}  from  '@expo/vector-icons'
import AllProducts from '../screens/AllProducts';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator () {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'My Carts',
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      />
       
    </Tab.Navigator>
  );
}