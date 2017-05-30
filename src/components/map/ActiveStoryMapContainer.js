import React from 'react';
import { connect } from 'react-redux';
import ActiveStoryMapWrapper from './ActiveStoryMapWrapper';
import {
  setRegion,
  getStoryById
} from '../../actions';
import { isInDistance } from '../../helpers/locationHelper';
import { DISTANCE } from '../../constants/distance.js';
import {
  IN_DISTANCE_MARKER,
  NEXT_SUBCHAPTER_MARKER,
  OUT_OF_DISTANCE_MARKER
} from '../../constants/markerTypes.js';

function getActiveStory(stories, user) {
  if (!user || !stories) return null;
  if (!user.activeStoryId) return null;

  return stories[user.activeStoryId];
}

function getActiveStoryProgress(stories, user, progress) {
  if (!user || !stories || !progress) return null;
  if (!user.activeStoryId) return null;
  return progress[user.activeStoryId]
    ? progress[user.activeStoryId]
    : null;
}

function getActiveSubChapter(activeStory, activeProgress) {
  if (activeStory && activeProgress) {
    const { activeChapterIndex } = activeProgress;
    return activeStory.chapters
      ? activeStory.chapters[activeChapterIndex-1].subChapters
      : [];
  } else return [];
}

function getComposedAnnotations(annotations, position, activeProgress){
  const nextSubChapterIndex = activeProgress
    ? activeProgress.activeSubChapterIndex
    : -1;
  return annotations.map((annotation, i) => {
    const inDistance = isInDistance(
      position,
      {
        latitude: annotation.coordinates[1],
        longitude: annotation.coordinates[0]
      },
      DISTANCE
    );
    const markerType = inDistance
      ? IN_DISTANCE_MARKER
      : i === nextSubChapterIndex - 1
        ? NEXT_SUBCHAPTER_MARKER
        : OUT_OF_DISTANCE_MARKER;
    return {
      ...annotation,
      markerType
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
  const subChapter = getActiveSubChapter(activeStory, activeProgress);

  return {
    annotations: getComposedAnnotations(
      subChapter,
      state.position.userLocation,
      activeProgress),
    mapRegion: state.position.mapRegion,
    currentUser: state.activeUser,
  };
}

function mapDispatchToProps(dispatch){
  return {
    onRegionChange: (region) => dispatch(setRegion(region)),
    getCurrentStory: (storyId) => dispatch(getStoryById(storyId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveStoryMapWrapper)
