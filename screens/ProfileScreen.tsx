import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from './supabaseClient';

const ProfileScreen = () => { const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(user?.id || null); // Set user ID or null if not available
      }
    };

    fetchUser();
  }, []);



  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <View>
      <Text>{userId ? `User ID: ${userId}` : 'No user is logged in'}</Text>
    </View>
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

export default ProfileScreen;
