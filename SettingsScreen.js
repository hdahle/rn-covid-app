import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class SettingsScreen extends Component {
  state = {
    settingA: false,
    settingB: false,
    settingC: false
  }

  render() {
    console.log('SettingsScreen');
    const color = 'green';
    const notColor = 'grey';
    const size = 50;
    return (
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.menuBar}>
          <Image source={require('./assets/fp-logo.png')} style={styles.logo} />
        </View>

        <View style={{ margin: 30, flex: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
          <View style={{ height: 50 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.settingsText}>World peace</Text>
              <TouchableOpacity onPress={() => { this.setState({ settingA: !this.state.settingA }) }}>
                <Ionicons
                  style={this.state.settingA ? { alignItems: 'center' } : { transform: [{ rotateY: '180deg' }] }}
                  name={'ios-toggle'}
                  size={size}
                  color={this.state.settingA ? color : notColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 50 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.settingsText}>Configure this</Text>
              <TouchableOpacity onPress={() => { this.setState({ settingB: !this.state.settingB }) }}>
                <Ionicons
                  style={this.state.settingB ? { alignItems: 'center' } : { transform: [{ rotateY: '180deg' }] }}
                  name={'ios-toggle'}
                  size={size}
                  color={this.state.settingB ? color : notColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 50 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.settingsText}>Enable that</Text>
              <TouchableOpacity onPress={() => { this.setState({ settingC: !this.state.settingC }) }}>
                <Ionicons
                  style={this.state.settingC ? { alignItems: 'center' } : { transform: [{ rotateY: '180deg' }] }}
                  name={'ios-toggle'}
                  size={size}
                  color={this.state.settingC ? color : notColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </SafeAreaView >
    );
  }
}

// Note: for things that are computed for responsiveness, use inline styles instead of this stylesheet

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight
  },
  settingsText: {
    width: 200,
    fontSize: 16
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
