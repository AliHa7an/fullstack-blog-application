import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { store } from './store/store';
import BlogListScreen from './screens/BlogListScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#667eea',
            tabBarInactiveTintColor: '#95a5a6',
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#e2e8f0',
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          <Tab.Screen 
            name="BlogList" 
            component={BlogListScreen}
            options={{ 
              headerShown: false,
              title: 'Blogs',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size, fontWeight: 'bold' }}>📝</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
} 