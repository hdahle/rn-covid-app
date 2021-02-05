import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CarouselApp from './CarouselApp'
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

//export default function App() {
export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'World') {
                return (
                  <Ionicons
                    name={'ios-globe-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Settings') {
                return (
                  <Ionicons
                    name={'ios-list'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'ios-home'
                        : 'ios-home-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: '#ffa600',
            inactiveTintColor: '#738198',
          }}
        >

          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="World" component={CarouselApp} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50
  },
  menuBar: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  logo: {
    height: 28,
    marginTop: 10,
    width: 200,
    resizeMode: 'contain'
  },
  carouselItem: {
    backgroundColor: 'white',
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  chart: {
    margin: 0,
    borderRadius: 3,
    backgroundColor: '#ddd',
    resizeMode: 'contain'
  },
  text: {
    backgroundColor: '#fff',
    textTransform: 'capitalize',
    padding: 10,
    marginLeft: 10,
  }
});
