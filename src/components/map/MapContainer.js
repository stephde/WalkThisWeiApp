import React from 'react';
import { connect } from 'react-redux';
import MapWrapper from './MapWrapper';
import {
  setRegion,
  getStoryById,
  turnLEDOn,
  turnLEDOff
} from '../../actions';
import { isInDistance } from '../../helpers/locationHelper';
import { DISTANCE } from '../../constants/distance.js';

function getVisibleAnnotations(stories, user) {
  if (!user || !stories) return [];
  if (!user.activeStoryId) return [];

  // make dynamic, when we get actual activeStoryId + ChapterProgress!
  return stories[user.activeStoryId]
    ? (stories[user.activeStoryId].chapters
      ? stories[user.activeStoryId].chapters[0].subChapters
      : [])
    : [];
}

function getComposedAnnotations(annotations, position){
  return annotations.map(annotation => {
    const inDistance = isInDistance(
      position,
      {
        latitude: annotation.coordinates[1],
        longitude: annotation.coordinates[0]
      },
      DISTANCE
    );
    return {
      ...annotation,
      inDistance
    };
  });
}

function mapStateToProps(state) {
  const annotations = getVisibleAnnotations(state.stories.data, state.activeUser);

  return {
    annotations: getComposedAnnotations(annotations, state.position.userLocation),
    mapRegion: state.position.mapRegion,
    currentUser: state.activeUser,
    isConnectedToDevice: state.ble.isConnectedToDevice,
    isLEDOn: state.ble.isLEDOn
  };
}

function mapDispatchToProps(dispatch){
  return {
    onRegionChange: (region) => dispatch(setRegion(region)),
    getCurrentStory: (storyId) => dispatch(getStoryById(storyId)),
    turnLEDOn: () => dispatch(turnLEDOn()),
    turnLEDOff: () => dispatch(turnLEDOff())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper)
