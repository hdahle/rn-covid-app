import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { RefreshControl, StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

export default class CarouselApp extends Component {
  state = {
    activeIndex: 0,
    data: [],
    isLoaded: false,
    error: false,
    refreshing: false
  }

  // Helper
  onlyUnique = (value, index, self) => {
    if (!value || value === "Ship") return false;
    return self.indexOf(value) === index;
  }

  // Get JSON blob with country data from API server
  updateCountryData = async () => {
    console.log('updateCountryData');
    try {
      const res = await fetch('https://api.dashboard.eco/covid-countries');
      const json = await res.json();
      let uniqueKey = 0;
      // Get simple array of all regions
      const regions = json.data.map(d => d.region).filter(this.onlyUnique);
      // Add list of countries to each region
      const regionsAndCountries = regions.map(region => ({
        region: region,
        countries: json.data.filter(d => d.region == region).map(x => ({
          key: (++uniqueKey).toString(),
          country: x.country,
          uri: "https://hdahle.github.io/telegrambot/img/covid-" + x.country.replace(/[^a-z]/gi, "_") + ".png",
        }))
      }))
      console.log('updateCountryData: #regions:', regionsAndCountries.length);

      // Set the state and force a render
      this.setState({
        isLoaded: true,
        error: false,
        data: regionsAndCountries
      })
    } catch (e) {
      console.log('updateCountryData: ERROR reading country data');
      this.setState({ error: true })
      return;
    }
  }

  // Initialization: Update country data
  componentDidMount = () => {
    this.updateCountryData()
  }

  // Handler for 'pull-down-refresh' gesture
  onRefreshHandler = () => {
    console.log('onRefreshHandler')
    this.setState({ refreshing: true });
    this.updateCountryData();
    this.setState({ refreshing: false });
  }

  // Render a single chart, called by RenderCarouselItem
  RenderChart = (props) => {
    console.log('renderChart ', props.item.uri)
    return (
      <View>
        <Text>{props.item.text}</Text>
        <Image
          source={{ uri: props.item.uri }}
          style={{
            ...styles.chart,
            height: ((Dimensions.get('window').width - 20) * 2) / 3,
            width: Dimensions.get('window').width - 20
          }}
        />
      </View>
    )
  }

  // Each carousel item is a world-region (Asia, Africa,...)
  RenderCarouselItem = (props) => {
    console.log('renderCarouselItem:', props.item.region, props.item.countries.length);
    return (
      <View style={styles.carouselItem}>
        <Text style={styles.text}>{props.item.region}</Text>
        <FlatList
          data={props.item.countries}
          renderItem={this.RenderChart}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefreshHandler}
            />
          }
        />
        <StatusBar style="auto" />
      </View>
    )
  }

  // The Carousel is one item per REGION in the dataset
  RenderCarousel = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.menuBar}>
          <Image source={require('./assets/fp-logo.png')} style={styles.logo} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
          <Carousel
            layout={"tinder"}
            ref={ref => this.carousel = ref}
            data={this.state.data}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            renderItem={this.RenderCarouselItem}
            onSnapToItem={index => this.setState({ activeIndex: index })} />
        </View>
      </SafeAreaView>
    );
  }

  render() {
    const { isLoaded, error } = this.state;
    console.log('render, isloaded=', isLoaded, ' error:', error);
    return this.RenderCarousel()
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
