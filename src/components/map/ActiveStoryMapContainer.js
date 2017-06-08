import React from 'react';
import { connect } from 'react-redux';
import ActiveStoryMapWrapper from './ActiveStoryMapWrapper';
import {
  setRegion,
  getStoryById,
  openPlayer
} from '../../actions';
import { isInDistance } from '../../helpers/locationHelper';
import {
  getActiveStory,
  getActiveStoryProgress,
  getActiveSubChapters
} from '../../helpers/stateHelper';
import { DISTANCE } from '../../constants/distance.js';
import {
  IN_DISTANCE_MARKER,
  NEXT_SUBCHAPTER_MARKER,
  OUT_OF_DISTANCE_MARKER
} from '../../constants/markerTypes.js';

function getComposedAnnotations(annotations, position, activeProgress, distanceToUnlock){
  const nextSubChapterIndex = activeProgress
    ? activeProgress.nextSubChapterIndex
    : -1;
  return annotations.map((annotation, i) => {
    const inDistance = isInDistance(
      position,
      {
        latitude: annotation.coordinates[1],
        longitude: annotation.coordinates[0]
      },
      distanceToUnlock ? distanceToUnlock : DISTANCE
    ) && i < nextSubChapterIndex;
    const markerType = inDistance
      ? IN_DISTANCE_MARKER
      : i === nextSubChapterIndex - 1
        ? NEXT_SUBCHAPTER_MARKER
        : OUT_OF_DISTANCE_MARKER;
    return {
      ...annotation,
      markerType,
      inDistance
    };
  });
}

function mapStateToProps(state) {
  const activeStory = getActiveStory(
    state.stories.data,
    state.activeUser
  );
  const activeProgress = getActiveStoryProgress(
    state.stories.data,
    state.activeUser,
    state.progress.data
  );
  const subChapters = getActiveSubChapters(activeStory, activeProgress);

  return {
    annotations: getComposedAnnotations(
      subChapters,
      state.position.userLocation,
      activeProgress,
      activeStory.distanceToUnlock),
    mapRegion: state.position.mapRegion,
    currentUser: state.activeUser,
  };
}

function mapDispatchToProps(dispatch){
  return {
    onRegionChange: (region) => dispatch(setRegion(region)),
    getCurrentStory: (storyId) => dispatch(getStoryById(storyId)),
    openPlayer: (annotation) => dispatch(openPlayer(annotation))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveStoryMapWrapper)
