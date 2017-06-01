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
import Modal from 'react-native-modalbox';
import MarkerPlayer from '../player/player';
import {
  IN_DISTANCE_MARKER,
  NEXT_SUBCHAPTER_MARKER,
  OUT_OF_DISTANCE_MARKER
} from '../../constants/markerTypes';
import markerTurquois from '../../../images/marker_turquois.png';
import markerRed from '../../../images/marker_red.png';
import markerGray from '../../../images/marker_gray.png';
const isAndroid = (Platform.OS === 'android');

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
      this.setState({selectedAnnotation: this.props.annotations[key]});
      this.refs.modal1.open();
    }

    handleOnToggleBlePress() {
      if(this.props.isLEDOn) {
        this.props.turnLEDOff();
      }
      else {
        this.props.turnLEDOn();
      }
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
            style={ styles.map }
            region={ this.props.mapRegion }
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={region => this.props.onRegionChange(region)}>
            { coordinates.length > 1 &&
              <MapView.Polyline
                coordinates={coordinates}
                strokeWidth={3}
                strokeColor={"#70C8BE"}
              />
            }
            { markers }
          </MapView>
          { this.props.isConnectedToDevice &&
            <Button rounded onPress={() => {this.handleOnToggleBlePress()}} style={ styles.storiesButtonLeft }>
              <Text>Toggle BLE</Text>
            </Button>
          }
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
          <View style={styles.floatView}>
            <ActiveStoryStatusHeader />
          </View>
        </View>
      );
    }
}

ActiveStoryMap.propTypes = {
  annotations: React.PropTypes.array,
  mapRegion: React.PropTypes.object,
  onRegionChange: React.PropTypes.func,
}
