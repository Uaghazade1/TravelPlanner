import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, StatusBar } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.centeredContent}>
        <Text style={styles.plane}>✈️</Text>
          <Text style={styles.text}>Where do you want to go?</Text>
          <Text style={styles.description}>Start your next journey by adding your destination.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              + Add Trip
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1, // Ensures ScrollView takes up all available space
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginHorizontal: 50,
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#EB5F33',
    padding: 10,
    borderRadius: 7
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  plane: {
    fontSize: 35,
    marginVertical: 10
  }
});

export default Home;
