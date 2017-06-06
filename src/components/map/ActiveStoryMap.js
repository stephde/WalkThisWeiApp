'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';
import styles from './styles';
import { Button, Text, Icon } from 'native-base';
import ActiveStoryStatusHeader from './ActiveStoryStatusHeader';
import { Actions } from 'react-native-router-flux';
import {
  IN_DISTANCE_MARKER,
  NEXT_SUBCHAPTER_MARKER,
  OUT_OF_DISTANCE_MARKER
} from '../../constants/markerTypes';
import {
  INITIAL_LONGITUDE_DELTA,
  INITIAL_LATITUDE_DELTA
} from '../../constants/position';
import markerTurquois from '../../../images/marker_turquois.png';
import markerRed from '../../../images/marker_red.png';
import markerGray from '../../../images/marker_gray.png';
const isAndroid = (Platform.OS === 'android');

import mapStyle from './mapStyle'

const markerMapper = {
  [IN_DISTANCE_MARKER]: markerTurquois,
  [NEXT_SUBCHAPTER_MARKER]: markerRed,
  [OUT_OF_DISTANCE_MARKER]: markerGray
};

export default class ActiveStoryMap extends Component {
    constructor() {
      super();
      this.state = {
        selectedAnnotation: ''
      };
    }

    _getMarkers() {
      return Object.keys(this.props.annotations)
        .map((key) => {
          const markerPicture = markerMapper[this.props.annotations[key].markerType]
          return (
            <Marker
              key={this.props.annotations[key]._id}
              coordinate={{
                longitude: this.props.annotations[key].coordinates[0],
                latitude: this.props.annotations[key].coordinates[1],
              }}
              onPress={() => {this.handleOnMarkerPress(key);}}
              onSelect={() => {this.handleOnMarkerPress(key);}}
              image={ isAndroid ? markerPicture : null }
              centerOffset={{
                x: 0,
                y: -10
              }}
            >
              { isAndroid
                ? null
                : <Image
                    source={markerPicture}
                    resizeMode={'contain'}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
              }
            </Marker>
          );
        });
    }

    handleOnMarkerPress (key) {
      this.props.openPlayer(key);
    }

    render() {
      const coordinates = _.map(this.props.annotations, annotation => {
        return {
          longitude: annotation.coordinates[0],
          latitude: annotation.coordinates[1],
        };
      });
      const markers = this._getMarkers();

      return (
        <View style={styles.container}>
          <MapView
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta:  INITIAL_LATITUDE_DELTA,
              longitudeDelta: INITIAL_LONGITUDE_DELTA,
            }}
            style={ styles.map }
            customMapStyle={ mapStyle }
            region={ this.props.mapRegion }
            showsUserLocation={true}
            followUserLocation={true}
            userLocationAnnotationTitle=''
            onRegionChangeComplete={
              region => this.props.onRegionChange(region)
            }
          >
            { coordinates.length > 1 &&
              <MapView.Polyline
                coordinates={coordinates}
                strokeWidth={3}
                strokeColor={"#70C8BE"}
              />
            }
            { markers }
          </MapView>
          <Button rounded onPress={Actions.storyTabs} style={ styles.storiesButton }>
            <Text>Stories</Text>
          </Button>
          <View style={styles.floatView}>
            <ActiveStoryStatusHeader />
          </View>
        </View>
      );
    }
}

ActiveStoryMap.defaultProps = {
  mapRegion: {
    latitudeDelta:  INITIAL_LATITUDE_DELTA,
    longitudeDelta: INITIAL_LONGITUDE_DELTA,
  }
}

ActiveStoryMap.propTypes = {
  annotations: React.PropTypes.array,
  mapRegion: React.PropTypes.object,
  onRegionChange: React.PropTypes.func,
  openPlayer: React.PropTypes.func
}
