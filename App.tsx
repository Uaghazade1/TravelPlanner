import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/Home'; // Home
import ChecklistScreen from './screens/ChecklistScreen'; // Checklist
import CompleteProfile from './screens/CompleteProfile'; // Add Trip
import ProfileScreen from './screens/ProfileScreen'; // Activities
import HistoryScreen from './screens/HistoryScreen'; // History
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
          case 'Profile':
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
    <Tab.Screen name="Home" component={Home} options={{
      headerShown: false
    }} />
    <Tab.Screen name="Checklist" component={ChecklistScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
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
