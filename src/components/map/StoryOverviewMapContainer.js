import React from 'react';
import { connect } from 'react-redux';
import StoryOverviewMapWrapper from './StoryOverviewMapWrapper';
import {
  setRegion,
  getStoriesAroundCurrentLocation
} from '../../actions';
import { isInDistance } from '../../helpers/locationHelper';
import _ from 'lodash';
import { push } from 'react-router-redux';

function getVisibleStories(stories, position) {
  const result = _.filter(stories, story => {
    return isInDistance(
      position,
      {
        latitude: _.get(story, 'chapters[0].subChapters[0].coordinates[1]'),
        longitude: _.get(story, 'chapters[0].subChapters[0].coordinates[0]')
      },
      2000
    );
  });
  return result;
}

function mapStateToProps(state) {
  return {
    userLocation: state.position.userLocation,
    stories: getVisibleStories(state.stories.data, state.position.userLocation),
    mapRegion: state.position.mapRegion,
  };
}

function mapDispatchToProps(dispatch){
  return {
    getStoriesAroundUser: () => dispatch(getStoriesAroundCurrentLocation()),
    onRegionChange: (region) => dispatch(setRegion(region)),
    goToDetailedStory: (detailedStoryId) => dispatch(push(`/detailedStory/${detailedStoryId}`))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryOverviewMapWrapper)
