import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearNotifications } from '../store/reducers/notification_reducer';

const PopupComponent = ({ message, type }) => {
  const dispatch = useDispatch();
  const fadeAnim = new Animated.Value(0);
  const containerStyle = type === 'error' ? styles.errorContainer : styles.successContainer;

  useEffect(() => {
    animatePopup();
    setTimeout(() => {
      clearPopup();
    }, 3000);
  }, []);

  const animatePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const clearPopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(clearNotifications());
    });
  };

  return (
    <Animated.View style={[styles.container, containerStyle, { opacity: fadeAnim }]}>
      <Text style={styles.message} className="text-center font-medium">{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 4,
    left: 16,
    right: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 4,
  },
  errorContainer: {
    backgroundColor: 'red',
  },
  successContainer: {
    backgroundColor: 'green',
  },
  message: {
    color: '#fff',
    fontSize: 14,
  },
});

export default PopupComponent;
