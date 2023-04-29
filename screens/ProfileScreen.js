import { View, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true
        })
    })

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen