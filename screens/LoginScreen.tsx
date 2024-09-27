import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabaseClient'; // Adjust this path based on your project structure
import * as AppleAuthentication from "expo-apple-authentication";

const LoginScreen = () => {

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
      const userEmail = credential.email; // May be a private relay email, only available on first sign-in
  
      // Sign in with the token received
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken || '',
      });
  
      if (error) {
        Alert.alert('Apple Sign-In Error', error.message);
        return;
      }

      const userId = data.user.id; // Get the user ID from Supabase
  
      // Fetch existing profile from the database
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', userId)
        .single();
  
      let userName = "Unknown User"; // Default value
      let emailToInsert;

      // Determine the user's name
      if (userFullName && userFullName.givenName && userFullName.familyName) {
        // If Apple provides the full name, use it
        userName = `${userFullName.givenName} ${userFullName.familyName}`;
      } else if (existingProfile && existingProfile.name) {
        // If no name is provided, use the name from the database
        userName = existingProfile.name;
      }

      // Determine which email to use
      if (userEmail) {
        // Use the email provided by Apple (only available on the first sign-in)
        emailToInsert = userEmail;
      } else if (existingProfile && existingProfile.email) {
        // If Apple does not return an email (subsequent logins), use the one from the database
        emailToInsert = data.user.email;
      } else {
        // Handle case where email is not available
        console.warn('No email provided by Apple and none found in the existing profile.');
        emailToInsert = 'unknown@example.com'; // Fallback, but log the warning
      }
  
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
