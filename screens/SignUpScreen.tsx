// SignUpScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { supabase } from './supabaseClient'; 
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
// Adjust this path based on your project structure

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); // Get navigation prop

  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Prevent confirmation email
          // If you have a redirect URL to use after signup, set it here
        },
      });

      if (error) {
        Alert.alert('Sign Up Error', error.message);
      } else {
        Alert.alert('Success', 'You have successfully signed up!');
        navigation.navigate('Login' as never); // Navigate to login after signup
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
