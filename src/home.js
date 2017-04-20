/**
 * Created by stephde on 04/04/2017.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
} from 'react-native';

import MapView from 'react-native-maps';

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

export default class Home extends Component {
    componentDidMount() {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        this.props.getAnnotations(position.coords.latitude, position.coords.longitude);
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5,
        }
        this.props.onUserLocationChange(position.coords.latitude, position.coords.longitude);
        this.onRegionChange(region);
      });
    }

    onRegionChange(region) {
      this.props.onRegionChange(region);
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

    _getMarkers() {
      return Object.keys(this.props.annotations)
        .map((key) => {
          const color = this.props.annotations[key].inDistance
            ? "#FF0000"
            : "#666666";
          const description = this.props.annotations[key].inDistance
            ? this.props.annotations[key].description
            : "Zu weit weg du Spast! Beweg deinen Arsch hier her!";
          return (
            <MapView.Marker
              key={this.props.annotations[key]._id}
              coordinate={{
                latitude: this.props.annotations[key].coordinates[0],
                longitude: this.props.annotations[key].coordinates[1]
              }}
              title={this.props.annotations[key].title}
              description={description}
              pinColor={color}
            />
          );
        });
    }

    render() {
      const markers = this._getMarkers();

      return (
        <View style={styles.container}>
          <MapView
            style={ styles.map }
            region={ this.props.mapRegion }
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={region => this.onRegionChange(region)}>
            { markers }
            <MapView.Marker
              coordinate={{
                latitude: (this.props.mapRegion.latitude + 0.00050) || -36.82339,
                longitude: (this.props.mapRegion.longitude + 0.00050) || -73.03569,
              }}>
              <View>
                <Text style={{color: '#000'}}>
                  {`${this.props.mapRegion.longitude} / ${this.props.mapRegion.latitude}`}
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
  mapRegion: React.PropTypes.object,
  getAnnotations: React.PropTypes.func.isRequired,
  onUserLocationChange: React.PropTypes.func.isRequired,
  onRegionChange: React.PropTypes.func.isRequired,
}


