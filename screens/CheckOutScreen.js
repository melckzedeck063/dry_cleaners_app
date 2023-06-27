import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { CardField, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckoutScreen = () => {
  const [cardDetails, setCardDetails] = useState({});
  const { confirmPayment } = useStripe();
  const navigation =   useNavigation();
  const {params  :  {props}  }  = useRoute();

  const handleCardDetailsChange = (cardDetails) => {
    setCardDetails(cardDetails);
  };

  const handleCheckout = async () => {
    try {
      const { paymentIntent } = await confirmPayment({
        paymentMethodId: cardDetails.paymentMethodId,
        currency: 'usd',
        amount: 1000,
      });

      // Handle successful payment
      console.log('Payment successful:', paymentIntent);
    } catch (error) {
      // Handle payment error
      console.log('Payment failed:', error);
    }
  };

  useLayoutEffect(()  => {
      navigation.setOptions({
        headerShown : true
      })
  })

  return (
    <StripeProvider publishableKey="your_publishable_key">
      <SafeAreaView  />
        <Text className={`text-red-400 font-bold text-center text-2xl my-2 ${Platform.select({android : 'text-xl'})}`} >Checkout</Text>
      <View style={[styles.card]} className={`p-1 rounded-lg ${Platform.select({android : 'mt-8'})}`} >
        <View style={{alignSelf : 'center'}} className="w-11/12 mb-4">
          <Text style={styles.label}>Card Details:</Text>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: '4242 4242 4242 4242',
              expDate: 'MM/YY',
              cvc: 'CVC',
            }}
            onCardChange={handleCardDetailsChange}
            style={styles.cardField}
          />
          <View className="my-2">            
          <Text style={styles.label} className={`text-lg my-2 ${Platform.select({android : 'text-xs'})}`}>Email:</Text>
          <TextInput className={`rounded-md bg-gray-100 text-lgg px-4 py-2.5 ${Platform.select({android : 'py-1'})} `}
            placeholder="Email"
            keyboardType="email-address"
          />
          </View>
          <View className="my-2">
          <Text style={styles.label} className={`text-lg my-2 ${Platform.select({android : 'text-xs'})}`}>Telephone:</Text>
          <TextInput className={`rounded-md bg-gray-100 text-lgg px-4 py-2.5 ${Platform.select({android : 'py-1'})} `} 
            placeholder="Telephone"
            keyboardType="phone-pad"
          />
          </View>
          <View className="my-2">       
          <Text style={styles.label} className={`text-lg my-2 ${Platform.select({android : 'text-xs'})}`}>State:</Text>
          <TextInput className={`rounded-md bg-gray-100 text-lgg px-4 py-2.5 ${Platform.select({android : 'py-1'})} `}
            placeholder="State city"
            keyboardType="default"
          />
          </View>
        </View>
        <TouchableOpacity  style={{alignSelf : 'center'}}
         onPress={handleCheckout} className="bg-red-400 rounded-lg w-6/12">
         <Text style={{fontSize : responsiveFontSize(1.5)}} className={`text-white font-medium text-center  ${Platform.select({android : 'text-lg'})}`}>Pay {props.cost}</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  form: {
    width: '80%',
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  cardField: {
    height: 50,
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    elevation : 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset :{width : 0, height : 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    alignSelf  : 'center',
    width :  responsiveWidth(93),
    height  : responsiveHeight(70)
   }
});

export default CheckoutScreen;