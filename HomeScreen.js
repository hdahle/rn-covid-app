import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';


export default class HomeScreen extends Component {

  render() {
    console.log('HomeScreen');
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.menuBar}>
          <Image source={require('./assets/fp-logo.png')} style={styles.logo} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { this.updateCountryData() }}>
            <Text style={{ margin: 30 }}>This screen will show chart for the home location based on GPS coords</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
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
  }
});
