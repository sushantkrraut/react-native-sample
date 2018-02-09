import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions, Button, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    margin: 5
  },
  bottomOverlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class GMaps extends Component {


  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.796109,
        longitude: 81.4376421,
        latitudeDelta: 27,
        longitudeDelta: 27,
      },
      error: null,
      isFetching: true,
      markers: []
    }
  }

  onPressZoomIn() {
    region = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta: this.state.region.latitudeDelta / 2,
      longitudeDelta: this.state.region.longitudeDelta / 2
    }
    this.setState({
      region: {
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
  }

  onPressZoomOut() {
    region = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta: this.state.region.latitudeDelta * 2,
      longitudeDelta: this.state.region.longitudeDelta * 2
    }
    this.setState({
      region: {
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
  }

  componentDidMount() {
    this.fetchLocation();
  }

  fetchLocation() {
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      this.watchID = navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          isFetching: false,
          markers: [
            {
              key: 10,
              coordinate: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              title: 'Home',
              description: 'You are here'
            }
          ]
        });
      }, (error) => this.setState({ error: error.message, isFetching: false }),
        { enableHighAccuracy: false, timeout: 25000, maximumAge: 0 });
    } else {
      this.setState({ error: "failed to intialize", isFetching: false });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  onRegionChange(region) {
    this.setState({ region: region });
  }
  onMarkerPlace() {
    this.setState({
      markers: [
        {
          key: 10,
          coordinate: {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
          },
          title: 'Home',
          description: 'You are here'
        }
      ]
    });
  }

  render() {
    const { region } = this.props;
    console.log(region);
    let content = null;
    if (this.state.isFetching) {
      content = <View style={styles.bottomOverlay}><Text style={{ color: 'white', fontSize: 15 }}>Fetching current location</Text></View>
    } else if (this.state.error) {
      content = <View style={[styles.bottomOverlay, { backgroundColor: 'rgba(255,0,0,0.3)' }]}><Text style={{ color: 'red', fontSize: 15 }}>Failed to Locate. Try Again !</Text></View>
    } else {
      content = <View style={styles.bottomOverlay}><Text style={{ color: 'white', fontSize: 15 }}>Latitude: {this.state.region.latitude.toFixed(5)}    </Text><Text style={{ color: 'white', fontSize: 15 }}>Longitude: {this.state.region.longitude.toFixed(5)}</Text></View>
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation
          onRegionChange={this.onRegionChange.bind(this)}
        >
          {this.state.markers.map(marker => (
            <Marker key={marker.key}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => { this.onPressZoomIn() }}>
            <View style={{ backgroundColor: '#1a8cff', width: 30, height: 30 }}><Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 10 }} >+</Text></View>
          </TouchableWithoutFeedback>
          <Text />
          <TouchableWithoutFeedback onPress={() => { this.onPressZoomOut() }}>
            <View style={{ backgroundColor: '#1a8cff', width: 30, height: 30 }}><Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 10 }} >-</Text></View>
          </TouchableWithoutFeedback>
          <Text />
          <TouchableWithoutFeedback onPress={() => { this.onMarkerPlace() }}>
            <View style={{ backgroundColor: '#1a8cff', width: 30, height: 30 }}><Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 5 }} >▼</Text></View>
          </TouchableWithoutFeedback>
        </View>
        {content}
      </View>
    );
  }
}