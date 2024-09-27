import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView>
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Where do you want to go?</Text>
      <Text style={styles.description}>Start your next journey by adding your destination. </Text>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginHorizontal: 50,
    textAlign: 'center',
    marginTop: 10
  },
});

export default Home;
