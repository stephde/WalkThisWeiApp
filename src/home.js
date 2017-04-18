/**
 * Created by stephde on 04/04/2017.
 */

'use strict';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    Button,
    View,
} from 'react-native';

import MapView from 'react-native-maps';

import ApiUtils from './apiUtils';
import { getAnnotations } from './actions';
import { API_URL } from './constants/url.js';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    button: {
      borderColor: '#2222AA',
      borderWidth: 2,
      borderStyle: 'solid',
      backgroundColor: '#BBBBBB'
    },
});

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        responseText: 'No request yet...',
        mapRegion: null,
        lastLat: null,
        lastLong: null,
      };
    }

    componentDidMount() {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      });
      this.props.getAnnotations(position.coords.latitude, position.coords.longitude);
    }

    onRegionChange(region, lastLat, lastLong) {
      this.setState({
        mapRegion: region,
        // If there are no new values set the current ones
        lastLat: lastLat || this.state.lastLat,
        lastLong: lastLong || this.state.lastLong
      });
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

    _getMarkers() {
      return Object.keys(this.props.annotations)
        .map((a) =>
          <MapView.Marker
            key={this.props.annotations[a]._id}
            coordinate={{
              latitude: this.props.annotations[a].coordinates[0],
              longitude: this.props.annotations[a].coordinates[1]
            }}
            title={this.props.annotations[a].title}
            description={this.props.annotations[a].description}
          />
        );
    }

    render() {
      const markers = this._getMarkers();

      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.mapRegion}
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={this.onRegionChange.bind(this)}>
            { markers }
            <MapView.Marker
              coordinate={{
                latitude: (this.state.lastLat + 0.00050) || -36.82339,
                longitude: (this.state.lastLong + 0.00050) || -73.03569,
              }}>
              <View>
                <Text style={{color: '#000'}}>
                  { this.state.lastLong } / { this.state.lastLat }
                </Text>
              </View>
            </MapView.Marker>
          </MapView>
        </View>
      );
    }
}

Home.propTypes = {
    annotations: React.PropTypes.array,
    getAnnotations: React.PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {
        annotations: state.annotation.annotations
    };
}

function mapDispatchToProps(dispatch){
    return {
        getAnnotations: (latitude, longitude) => dispatch(getAnnotations(latitude, longitude)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
