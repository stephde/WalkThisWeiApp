import React from 'react';
import { connect } from 'react-redux';
import MapWrapper from './MapWrapper';
import {
  setRegion,
  getStoriesById
} from '../../actions';
import geolib from 'geolib';

function getVisibleAnnotations(stories, user) {
  if (!user || !stories) return [];
  if (!user.activeStoryId) return [];

  // make dynamic, when we get actual activeStoryId + ChapterProgress!
  return stories[user.activeStoryId]
    ? stories[user.activeStoryId].chapters[0].subChapters
    : [];
}

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
  const annotations = getVisibleAnnotations(state.stories.data, state.users);

  return {
    annotations: getComposedAnnotations(annotations, state.position.userLocation),
    mapRegion: state.position.mapRegion,
    currentUser: state.users,
  };
}

function mapDispatchToProps(dispatch){
  return {
    onRegionChange: (region) => dispatch(setRegion(region)),
    getCurrentStory: (storyId) => dispatch(getStoriesById(storyId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper)
