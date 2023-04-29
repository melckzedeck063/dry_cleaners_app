import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [locationEnabled, setLocationEnabled] = React.useState(false);
  const [autoCompleteEnabled, setAutoCompleteEnabled] = React.useState(false);

//   const handleNotificationsToggle = () => setNotificationsEnabled(!notificationsEnabled);
  const handleLocationToggle = () => setLocationEnabled(!locationEnabled);
  const handleAutoCompleteToggle = () => setAutoCompleteEnabled(!autoCompleteEnabled);

  const navigation =  useNavigation();

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown : true
    })
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section} className="mt-12">
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Edit Profile</Text>
            <Ionicons name="arrow-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Change Password</Text>
            <Ionicons name="arrow-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.item}>
            <Text style={styles.itemText}>Enable Notifications</Text>
            <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
          </View>
        <View style={styles.section} className="flex flex-row mt-3 justify-between border-b  border-slate-200">
          <Text style={styles.itemText} className="flex flex-row justify-between border-b  border-slate-200">Location</Text>
          <Switch value={locationEnabled} onValueChange={handleLocationToggle} />
        </View>
        <View style={styles.section} className="flex flex-row justify-between border-b  border-slate-200">
          <Text style={styles.itemText} className={`font-light `}>Auto-Complete Address</Text>
          <Switch value={autoCompleteEnabled} onValueChange={handleAutoCompleteToggle} />
        </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Terms & Conditions</Text>
            <Ionicons name="arrow-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Privacy Policy</Text>
            <Ionicons name="arrow-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>App Version</Text>
            <Text style={styles.itemText}>1.0.0</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity  className="bg-red-400 rounded-lg py-2 ">
          <Text style={styles.buttonText} className={`text-white text-center font-bold text-xl ${Platform.select({android : 'text-lg'})}`}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#c62828',
    borderRadius: 4,
    paddingVertical: 16,
    marginTop: 32,
    alignItems: 'center',
  },
})

export default SettingsScreen;