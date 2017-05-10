'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import MapView from 'react-native-maps';
import isEqual from 'lodash.isequal';
import styles from './styles';
import { Button, Text, Icon } from 'native-base';

import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import MarkerPlayer from '../player/player';
const IN_DISTANCE_MARKER = require('../../../images/inDistanceMarker.png');
const OUT_DISTANCE_MARKER = require('../../../images/outDistanceMarker.png');

export default class Map extends Component {
    constructor() {
      super();
      this.state = {
        selectedAnnotation: ''
      };
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
            onRegionChange={region => this.props.onRegionChange(region)}>
            { markers }
          </MapView>
          <Button rounded onPress={Actions.userProfile} style={ styles.profileButton }>
            <Text>Profile</Text>
          </Button>
          <Button rounded onPress={Actions.storyTabs} style={ styles.storiesButton }>
            <Text>Stories</Text>
          </Button>
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
  onRegionChange: React.PropTypes.func,
}
