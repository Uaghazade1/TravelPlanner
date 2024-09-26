import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { supabase } from './supabaseClient'; // Adjust this path based on your project structure
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import * as AppleAuthentication from "expo-apple-authentication";

const LoginScreen = () => {
  const navigation = useNavigation(); // Get navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle email/password login
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Error', error.message);
      } else {
       
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  };

  // Handle Apple Sign-In
  // Handle Apple Sign-In
  const signIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
  
      const userFullName = credential.fullName;
      const userEmail = credential.email; // This might be a private relay email
  
     
      // Sign in with the token received
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken || '',
      });
  
      if (error) {
        Alert.alert('Apple Sign-In Error', error.message);
      } else {
        const userId = data.user.id; // Get the user ID from Supabase
  
        // Fetch existing profile from the database
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', userId)
          .single();
  
        let userName;
        if (userFullName && userFullName.givenName && userFullName.familyName) {
          // If Apple provides the full name, use it
          userName = `${userFullName.givenName} ${userFullName.familyName}`;
        } else if (existingProfile && existingProfile.name) {
          // If no name provided (subsequent sign-in), use the name from the database
          userName = existingProfile.name;
        } else {
          // Fallback name if both Apple and DB don't have a name
          userName = "Unknown User";
        }
  
        // Ensure email is captured correctly
        const emailToInsert = userEmail || existingProfile?.email || 'unknown@example.com';
  
        // Insert or update the profile
        const { error: insertError } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            name: userName, // Store the name
            email: emailToInsert, // Store the email (may be private relay)
          });
  
        console.log('Inserting:', {
          id: userId,
          name: userName,
          email: emailToInsert,
        });
  
        if (insertError) {
          console.error('Error inserting/updating user data:', insertError.message);
        } else {
          console.log('User data inserted/updated successfully.');
        }
      }
    } catch (e) {
      if (e === "ERR_REQUEST_CANCELED") {
        console.log("Apple Sign-In was canceled.");
      } else {
        console.error('Apple Sign-In Error:', e);
      }
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
        title="Forgot Password?"
        onPress={() => navigation.navigate('ForgotPassword' as never)} // Navigate to ForgotPassword screen
        color="blue"
      />
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 44,
  },
});

export default LoginScreen;
