import React from 'react';
import { connect } from 'react-redux';
import Map from './map';
import {
  getAnnotations,
  setUserLocation,
  setRegion
} from '../../actions';
import geolib from 'geolib';

function getComposedAnnotations(annotations, position){
  const currentPosition = Math.abs(position.latitude) + Math.abs(position.longitude)
  return annotations.map(annotation => {
    const difference = geolib.getDistance(position, {latitude: annotation.coordinates[1], longitude: annotation.coordinates[0]});
    const inDistance = difference < 200;
    return {
      ...annotation,
      inDistance
    };
  });
}

function mapStateToProps(state) {
  return {
    annotations: getComposedAnnotations(state.annotation.annotations, state.position.userLocation),
    mapRegion: state.position.mapRegion,
  };
}

function mapDispatchToProps(dispatch){
  return {
    getAnnotations: (latitude, longitude) => dispatch(getAnnotations(latitude, longitude)),
    onRegionChange: (region) => dispatch(setRegion(region)),
    onUserLocationChange: (latitude, longitude) => dispatch(setUserLocation(latitude, longitude)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
