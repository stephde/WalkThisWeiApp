'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
import MapView from 'react-native-maps';
import styles from './styles';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            selectedSource: ""
        };
    }

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
            : "Too far away. Move closer to listen to the content!";
          return (
            <MapView.Marker
              key={this.props.annotations[key]._id}
              coordinate={{
                longitude: this.props.annotations[key].coordinates[0],
                latitude: this.props.annotations[key].coordinates[1],
              }}
              title={this.props.annotations[key].title}
              description={description}
              pinColor={color}
              onSelect={() => {this.handleOnMarkerPress(key);}}
            >
              { this.props.annotations[key].inDistance &&
                <MapView.Callout tooltip={false}>
                  <View style={styles.markerCallout}>
                    <Text style={{color: '#000'}}>
                      {this.props.annotations[key].title}
                    </Text>
                    <Player url={this.state.selectedSource} />
                  </View>
                </MapView.Callout>
              }
            </MapView.Marker>
          );
        });
    }

    handleOnMarkerPress (key) {
      if(!this.props.annotations[key].inDistance) {
        return;
      }
      if(this.state.selectedSource !== this.props.annotations[key].url) {
        ReactNativeAudioStreaming.play(this.props.annotations[key].url, {});
      }
      this.setState({selectedSource: this.props.annotations[key].url});
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
          </MapView>
          <Button rounded onPress={Actions.userProfile} style={ styles.profileButton }>
            <Text>Profile</Text>
          </Button>
          <Button rounded onPress={Actions.storyTabs} style={ styles.storiesButton }>
            <Text>Stories</Text>
          </Button>
        </View>
      );
    }
}

Map.propTypes = {
  annotations: React.PropTypes.array,
  mapRegion: React.PropTypes.object,
  getAnnotations: React.PropTypes.func.isRequired,
  onUserLocationChange: React.PropTypes.func.isRequired,
  onRegionChange: React.PropTypes.func.isRequired,
}
