import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { supabase } from './supabaseClient'; // Adjust this path based on your project structure
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const LoginScreen = () => {
  const navigation = useNavigation(); // Get navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Error', error.message);
      } else {
        Alert.alert('Success', 'You are now logged in!');
        console.log('User data:', data.user); // Access user information here
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 12, borderWidth: 1, borderColor: 'gray', padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 12, borderWidth: 1, borderColor: 'gray', padding: 8 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp' as never)} // Navigate to Sign Up screen
        color="blue"
      />
      <Button
        title="FOrgot Pass?"
        onPress={() => navigation.navigate('ForgotPassword' as never)} // Navigate to Sign Up screen
        color="blue"
      />
    </View>
  );
};

export default LoginScreen;
