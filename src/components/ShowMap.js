import axios from 'axios';
import { connect } from 'react-redux';
import {
    Text, Linking
} from 'react-native';
import React, { Component } from 'react';
import { fetchLocationAction, stopLocationAction } from './../actions/fetchLocationAction';

class ShowMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0,
              longitudeDelta: 0,
            },
            error: null,
            isFetching: true,
            baseUrl: ''
          }    
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchLocationAction());
        this.fetchLocation();
    }

    fetchLocation() {
        if(navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition){
            this.watchID = navigator.geolocation.getCurrentPosition((position) => {
              this.setState({
                region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                },
                error: null,
                isFetching: false
              });
            }, (error) => this.setState({ error: error.message, isFetching: false }),
            {enableHighAccuracy: true, timeout: 25000, maximumAge: 0});
          } else {
            this.setState({ error: "failed to intialize", isFetching: false });
          }    

        axios.get('http://ipinfo.io').then((res) => {
            const loc = res.data.loc;
            this.setState({ error: loc });
            const baseUrl = `http://maps.google.com?q=${loc}`;
            const { dispatch } = this.props;
            this.setState({ baseUrl });
            console.log(this.state.baseUrl);
            
            dispatch(stopLocationAction());
        });
    }

    render() {
        return (this.props.isFetching ? <Text> Loading...</Text> : <Text
            style={{ color: 'blue' }}
            onPress={() => Linking.openURL(this.state.baseUrl)}
        >
            Google <Text>Latitude: {this.state.error}</Text><Text>longitude: {this.state.region.longitude}</Text>
        </Text>);
    }
}

export default connect((state) => ({ isFetching: state.location.isFetching }))(ShowMap);
