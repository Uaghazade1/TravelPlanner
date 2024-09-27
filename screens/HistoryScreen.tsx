import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from './supabaseClient';

const HistoryScreen = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>HistoryScreen</Text>
     
    </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
