import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Screen1 from './screens/Screen1'; // Home
import Screen2 from './screens/Screen2'; // Checklist
import Screen3 from './screens/Screen3'; // Add Trip
import Screen4 from './screens/Screen4'; // Activities
import Screen5 from './screens/Screen5'; // History
import LoginScreen from './screens/LoginScreen'; // Login
import SignUpScreen from './screens/SignUpScreen'; // Sign Up
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; // Forgot Password
import { supabase } from './screens/supabaseClient'; // Import Supabase client
import { Session } from '@supabase/supabase-js'; // Import the Session type

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create Stack Navigator

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

// Main App Screens
const MainAppStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'home';

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Checklist':
            iconName = 'list';
            break;
          case 'Add Trip':
            iconName = 'settings';
            break;
          case 'Activities':
            iconName = 'person';
            break;
          case 'History':
            iconName = 'information-circle';
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={Screen1} />
    <Tab.Screen name="Checklist" component={Screen2} />
    <Tab.Screen name="Add Trip" component={Screen3} />
    <Tab.Screen name="Activities" component={Screen4} />
    <Tab.Screen name="History" component={Screen5} />
  </Tab.Navigator>
);

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session: Session | null) => {
      console.log('Auth state changed:', event, session); // Log auth changes
      setUser(session?.user ?? null); // Update user state
      setLoading(false); // Set loading to false after the first fetch
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe(); // Unsubscribe from auth changes
    };
  }, []);

  if (loading) {
    return null; // Optionally show a loading indicator or a splash screen
  }

  return (
    <NavigationContainer>
      {user ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
