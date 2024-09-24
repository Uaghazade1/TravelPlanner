import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  // Import icons from vector icons
import Screen1 from './screens/Screen1'; // Import your screens
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';
import Screen5 from './screens/Screen5';

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home'; // Set a default icon

            // Customize icons based on the route name
            switch (route.name) {
              case 'Screen1':
                iconName = 'home';
                break;
              case 'Screen2':
                iconName = 'list';
                break;
              case 'Screen3':
                iconName = 'settings';
                break;
              case 'Screen4':
                iconName = 'person';
                break;
              case 'Screen5':
                iconName = 'information-circle';
                break;
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato', // Active tab color
          tabBarInactiveTintColor: 'gray',  // Inactive tab color
          tabBarStyle: { display: 'flex' }, // Ensure tab bar is displayed
        })}
      >
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen3} />
        <Tab.Screen name="Screen4" component={Screen4} />
        <Tab.Screen name="Screen5" component={Screen5} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
