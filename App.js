import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SIgnUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import AllProducts from './screens/AllProducts';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BottomNavigator from './components/BottomNavigation';
import SettingScreen from './screens/SettingScreen';
import ProfileScreen from './screens/ProfileScreen';
import LaundryScreen from './screens/LaundryScreen';
import CartScreen from './screens/CartScreen';
import { Provider } from 'react-redux';
import store from './store/store';
import LaundryForm from './screens/LaundryForm';
import CategoryForm from './screens/CategoryForm';
import ServiceForm from './screens/ServiceForm';
import { CartProvider } from 'react-use-cart';
import OrderScreen from './screens/OrderScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import CheckoutScreen from './screens/CheckOutScreen';
import LocationTracking from './screens/LocationTracking';
import ProductScreen from './screens/ProductScreen';
import ConfirmOrderScreen from './screens/OrderConfirmation';
import AllCategories from './screens/AllCategories';
import TermsAndConditionsScreen from './screens/TermsAndConditionScreen';

const Stack =  createNativeStackNavigator();
const Tab =  createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <CartProvider>
      <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator
              screenOptions={{
                headerShown : true,
                headerStyle: {
                  backgroundColor: '#1c4966',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              headerMode="screen"
          >
             <Stack.Screen name='Welcome' component={WelcomeScreen} 
             />
             
             <Stack.Screen name='Login' component={LoginScreen} 
             options={{title : "Login"}}
             />
              <Stack.Screen name='HomeTab' component={BottomNavigator}
                options={{
                  headerShown :  false
                }}
             />
             <Stack.Screen name='SignUp' component={SIgnUpScreen} 
             options={{title : "Sign  Up"}}
             />
             <Stack.Screen name='Home' component={HomeScreen} 
             options={{title : "Home"}}
             />
             <Stack.Screen name='Service' component={CategoryScreen} 
             options={{title : "Service Screen"}}
             />
             <Stack.Screen name='AllProducts' component={AllProducts} 
             options={{title : "Dry Cleaners"}}
             />
             <Stack.Screen name='AllServices' component={CategoryScreen} 
             options={{title : "All Services"}}
             />
             <Stack.Screen name='AllOrders' component={OrderScreen} 
             options={{title : "All Orders"}}
             />
             <Stack.Screen name='OrderDetails' component={OrderDetailsScreen} 
             options={{title : "Order Details"}}
             />
            <Stack.Screen name='Checkout' component={CheckoutScreen} 
             options={{title : "Checkout"}}
             />
              <Stack.Screen name='Settings' component={SettingScreen} 
             options={{title : "Settings"}}
             />
             <Stack.Screen name='Profile' component={ProfileScreen} 
             options={{title : "Profile"}}
             />
             <Stack.Screen name='Laundry' component={LaundryScreen} 
             options={{title : "Laundry Screen"}}
             />
             <Stack.Screen name='Cart' component={CartScreen} 
             options={{title : 'My Bucket'}}
             />
             <Stack.Screen name='LaundryForm' component={LaundryForm}
             options={{title :'Register Laundry'}} 
             />
             <Stack.Screen name='CategoryForm' component={CategoryForm}
             options={{title :'Register Category'}} 
             />
             <Stack.Screen name='ServiceForm' component={ServiceForm }
             options={{title :'Register Service'}} 
             />
             <Stack.Screen name='Location' component={ LocationTracking }
             options={{title :'Location Tracking'}} 
             />
             <Stack.Screen name='ViewProduct' component={ ProductScreen }
             options={{title :'Details'}} 
             />
             <Stack.Screen name='ConfirmOrder' component={ ConfirmOrderScreen }
             options={{title :'Order Confirmation'}} 
             />
             <Stack.Screen name='AllCategories' component={ AllCategories }
             options={{title :'All Categories'}} 
             />
             <Stack.Screen name='Condition' component={TermsAndConditionsScreen }
             options={{title :'Terms and Conditions'}} 
             />
             
          </Stack.Navigator>
       </NavigationContainer>
      </Provider>
      </CartProvider>
    </>
  );
}


export const HomeTab   = () => {
  return (
  <Tab.Navigator
  initialRouteName="Home"
  activeColor="#f0edf6"
  inactiveColor="#3e2465"
  barStyle={{ backgroundColor: '#1c4966', height : 32 }}
  // headerShown= {true}
  screenOptions={{
    headerShown: true,
  }}
   >
  {/* ... */}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
