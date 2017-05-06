'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles';

const IN_DISTANCE_MARKER = require('../../../images/inDistanceMarker.png');
const OUT_DISTANCE_MARKER = require('../../../images/outDistanceMarker.png');
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import { Button, Icon } from 'native-base';
import MarkerPlayer from '../player/player';

export default class Map extends Component {
    constructor() {
      super();
      this.state = {
        selectedAnnotation: ''
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
          const markerPicture = this.props.annotations[key].inDistance ? IN_DISTANCE_MARKER : OUT_DISTANCE_MARKER;
          return (
            <MapView.Marker
              key={this.props.annotations[key]._id}
              coordinate={{
                longitude: this.props.annotations[key].coordinates[0],
                latitude: this.props.annotations[key].coordinates[1],
              }}
              image={markerPicture}
              onSelect={() => {this.handleOnMarkerPress(key);}}
            />
          );
        });
    }

    handleOnMarkerPress (key) {
      this.setState({selectedAnnotation: this.props.annotations[key]});
      this.refs.modal1.open();
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
          <Modal
            style={styles.modal}
            ref={"modal1"}
            animationDuration={700}
            swipeToClose={true}>
            <Button transparent onPress={() => {this.refs.modal1.close();}}>
              <Icon name="close-circle" style={Object.assign(styles.modalTextColor, styles.modalClosingButton)}/>
            </Button>
            <MarkerPlayer annotation={this.state.selectedAnnotation}/>
          </Modal>
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
