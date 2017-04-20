import React from 'react';
import { connect } from 'react-redux';
import Home from './home';
import {
  getAnnotations,
  setUserLocation,
  setRegion
} from './actions';

function getComposedAnnotations(annotations, position){
  const currentPosition = Math.abs(position.latitude) + Math.abs(position.longitude)
  return annotations.map(annotation => {
    const annotationPosition = Math.abs(annotation.coordinates[0]) + Math.abs(annotation.coordinates[1])
    const difference = Math.abs(currentPosition - annotationPosition);
    const inDistance = difference < 0.001;
    return {
      ...annotation,
      inDistance
    };
  });
}

function mapStateToProps(state) {
  console.log(state);
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
