import React,{useState,useEffect,useLayoutEffect} from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet,ActivityIndicator } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import OrderItem from '../components/orderItem';
import { useRoute } from '@react-navigation/native';
import PopupComponent from '../components/PopupComponent';
import { allCartItems, deleteCartItems } from '../store/actions/cart_actions';
import { useDispatch,useSelector } from 'react-redux';
import { getMyOrders, placeOrder } from '../store/actions/order_actions';
import * as SecureStore from 'expo-secure-store';

const ConfirmOrderScreen = () => {


  const dispatch =  useDispatch();
  const [reload,setReload] =  useState(0)

  const cart_items =  useSelector(state => state.cart_items);

  const notifications =  useSelector(state => state.notification);

  console.log(notifications)


  // console.log(cart_items.cart_items);
  // let data  =   cart_items.cart_items;
  const [isLoading, setIsLoading] = useState(false);

  setTimeout(() => {
    if(reload  < 5){
      setReload(reload => reload + 1)
    }
  }, 1000);

  useEffect(()  => {
    if(cart_items && cart_items.cart_items && reload < 3){
      dispatch( allCartItems() )
    }
  })

  const totalBills =  (data)  => {
    let total = 0;

    for(let x= 0;   x < data.length;  x++){
       total += parseInt(data[x].total_cost)
    }
    return total;
  }

  const order_items =[];
  const amounts = [];
let costs = 0;

  const orderDetails = (data) => {
    // console.log(data)

    const items = cart_items.cart_items.data.data;
  for(let m = 0 ; m< items.length; m++) {
      order_items.push(items[m].product._id)
      amounts.push(items[m].amount)
      costs += parseInt(items[m].total_cost)
  } 
  const datas = {
    order_items,
    amounts,
    costs
  }
     
  console.log(datas)

  setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      dispatch(  placeOrder(datas) )
      // Dispatch actions or perform other operations

      setTimeout(() => {
        dispatch( deleteCartItems() )
      dispatch( getMyOrders() )
      setTimeout(() => {
        // navigation.navigate('HomeTab')
      }, 500);
        // navigation.navigate('HomeTab');
      }, 500);
    }, 5000);

  }
 

  const {params : {items}} = useRoute();

  // console.log(items)

  

  

  return (
    <View style={styles.container}>
      {
        cart_items?.cart_items?.data?.data.length >= 1 ?(
          <>
        <FlatList
          data={cart_items.cart_items.data.data}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <OrderItem image={itemData.item.product.photo} laundry={itemData.item.product.laundry.laundryName} name={itemData.item.product.serviceName} price={itemData.item.product.price} amount = {itemData.item.amount} />
            )
          }}
          contentContainerStyle={styles.cartItemsList}
        />
          </>
        )
        :

        <>
        </>
      }

      <View>
      {
          notifications?.notifications[0]?.type==="success" &&(
            <>     
           <PopupComponent message={notifications.notifications[0].message} type="success" />
            </>

          )
        }
          
          {
            notifications?.notifications[0]?.type==="error" &&(
          <>
          <PopupComponent message={notifications.notifications[0].message} type="error" />
          </>
            )
          }
      </View>
      <View style={styles.orderSummaryContainer} >
        {
          cart_items?.cart_items?.data?.data.length >=1?(
            <>
        <Text style={styles.orderSummaryText}  className="text-center">Order Summary</Text>
        <View className="flex flex-row justify-between mx-4">
        <Text style={styles.totalPrice} className="font-medium  text-sm">Total Price:  </Text>
        <Text style={styles.totalPrice} className="font-bold  text-red-400  text-sm">  {totalBills(cart_items.cart_items.data.data)} Tshs </Text>
        </View>
        <View className="flex flex-row justify-between mx-4">
          <Text style={styles.selectedItems} className="font-medium  text-sm"> Items selected</Text>
          <Text style={styles.selectedItems} className="font-bold  text-red-400  text-sm">{cart_items.cart_items.results} item(s)</Text>
        </View>
        <TouchableOpacity
              style={styles.confirmOrderButton}
              onPress={() => orderDetails(cart_items.cart_items.data.data)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
              )}
            </TouchableOpacity>

            </>
          )
          :
          <>
          </>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItemsList: {
    paddingBottom: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#e74c3c',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountButton: {
    fontSize: 20,
    paddingHorizontal: 8,
    color: '#007bff',
  },
  amount: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  orderSummaryContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
    height : responsiveHeight(20)
  },
  orderSummaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 18,
    marginBottom: 4,
  },
  selectedItems: {
    fontSize: 18,
    marginBottom: 16,
  },
  confirmOrderButton: {
    backgroundColor: '#1c4966',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
  confirmOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmOrderScreen;
