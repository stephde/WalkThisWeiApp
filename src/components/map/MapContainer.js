import React from 'react';
import { connect } from 'react-redux';
import MapWrapper from './MapWrapper';
import {
  setRegion,
  getStoryById,
} from '../../actions';
import { isInDistance } from '../../helpers/locationHelper';
import { DISTANCE } from '../../constants/distance.js';
import { getActiveStory } from '../helpers/stateHelper';

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

function getComposedAnnotations(annotations, position, distanceToUnlock){
  return annotations.map(annotation => {
    const inDistance = isInDistance(
      position,
      {
        latitude: annotation.coordinates[1],
        longitude: annotation.coordinates[0]
      },
        distanceToUnlock ? distanceToUnlock : DISTANCE
    );
    return {
      ...annotation,
      inDistance
    };
  });
}

function mapStateToProps(state) {
  const annotations = getVisibleAnnotations(state.stories.data, state.activeUser);

  const activeStory = getActiveStory(state.stories.data, state.activeUser);
  const distanceToUnlock = activeStory ? activeStory.distanceToUnlock : null;

  return {
    annotations: getComposedAnnotations(annotations, state.position.userLocation, distanceToUnlock),
    mapRegion: state.position.mapRegion,
    currentUser: state.activeUser
  };
}

function mapDispatchToProps(dispatch){
  return {
    onRegionChange: (region) => dispatch(setRegion(region)),
    getCurrentStory: (storyId) => dispatch(getStoryById(storyId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper)
