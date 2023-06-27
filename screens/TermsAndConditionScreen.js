import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.subtitle}>Last updated: June 22, 2023</Text>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to the Laundry Connect app. These terms and conditions outline the rules and regulations for the use of
          our services. By accessing or using the app, you agree to be bound by these terms and conditions.
        </Text>
        <Text style={styles.sectionTitle}>1. Use of the App</Text>
        <Text style={styles.paragraph}>
          The use of the Laundry Connect app is solely for the purpose of connecting users with laundry service providers.
          You must be at least 18 years old to use the app. You agree to use the app in accordance with all applicable laws
          and regulations.
        </Text>
        <Text style={styles.sectionTitle}>2. User Accounts</Text>
        <Text style={styles.paragraph}>
          To access certain features of the app, you may be required to create a user account. You are responsible for
          maintaining the confidentiality of your account credentials and agree to notify us immediately of any unauthorized
          access to your account.
        </Text>
        <Text style={styles.sectionTitle}>3. Service Providers</Text>
        <Text style={styles.paragraph}>
          Laundry service providers listed on the app are independent entities and not employed by Laundry Connect. We do not
          guarantee the quality of their services and are not responsible for any damages or losses incurred as a result of
          their services.
        </Text>
        {/* Add more sections as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentContainer: {
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default TermsAndConditionsScreen;
