import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGE_URL } from '../store/URL';
import { useRoute } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch,useSelector } from 'react-redux';
import { addItemToCart, allCartItems } from '../store/actions/cart_actions';
import PopupComponent from '../components/PopupComponent';

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const {params : {props}} = useRoute();
  const dispatch =  useDispatch()

  // console.log(props)
const notifications =  useSelector(state => state.notification);

// console.log(notifications)


  const incrementAmount = () => {
    setAmount(amount + 1);
  };

  const decrementAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const  formData  =   new  FormData();

  const handlCartItem = (data) => {
      // console.log(props)
      formData.append({
          'amount' : amount,
          'total_cost': (props.price *  amount),
          "id" :  props.id
         });
    
  
      // console.log(formData)
      setTimeout(() => {
          dispatch(  addItemToCart(formData._parts[0][0]) )
          // addItem(data);
          dispatch( allCartItems())
      }, 500);

    }

  return (
    <View style={styles.container}>
      <Image className=""
        source={{uri : `${IMAGE_URL}/${props.image}`}}
        style={styles.productImage}
      />



<View className="w-full mb-5">
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
      <Text style={styles.productDescription}>
        {props.name}
      </Text>
      <View style={styles.amountContainer} className="">
        <TouchableOpacity onPress={decrementAmount} className="bg-orange-300 rounded-lg">
          <Text style={styles.amountButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.amount}>{amount}</Text>
        <TouchableOpacity onPress={incrementAmount} className="bg-green-600 rounded-lg">
          <Text style={styles.amountButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productDescription}>
        {/* {props.name}  */}
      </Text>

      

      <View style={styles.bottomContainer} className="w-full">
        <View className="flex-row flex justify-between mx-6 my-3">
        <Text style={styles.totalCost} className="font-medium">
          Total Cost:  
        </Text>
        <Text style={styles.totalCost} className="font-medium text-blue-600">
           {amount * (props.price)} Tshs {/* Replace 10 with the actual product price */}
        </Text>
        </View>
        <View className="flex flex-row justify-between mx-8 my-3">
        <Text style={styles.itemCount} className="font-medium">
          Items: 
        </Text>
        <Text style={styles.itemCount} className="font-medium text-blue-600 -ml-6">
           {amount} Item(s)
        </Text>
        </View>
        
        <TouchableOpacity className="mx-8 my-2 rounded-lg"
          style={styles.addToCartButton}
          onPress={() => handlCartItem(props)}
        >
          <Text style={styles.addToCartButtonText}  className="text-center">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: 16,
  },
  productImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(45),
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountButton: {
    fontSize: 26,
    paddingHorizontal: 16,
  },
  amount: {
    fontSize: 20,
    fontWeight : 'bold',
    marginHorizontal: 16,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  totalCost: {
    flex: 1,
    fontSize: 18,
  },
  itemCount: {
    fontSize: 18,
    // marginRight: 56,
  },
  addToCartButton: {
    backgroundColor: '#1c4966',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
