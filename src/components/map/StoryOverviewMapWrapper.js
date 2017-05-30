import React, { Component } from 'react';
import _ from 'lodash';
import StoryOverviewMap from './StoryOverviewMap';
import { isInDistance } from '../../helpers/locationHelper';
import { DISTANCE } from '../../constants/distance.js';

export default class StoryOverviewMapWrapper extends Component {
  componentDidMount() {
    this.props.getStoriesAroundUser();
  }

  componentWillReceiveProps(nextProps){
    // Request active story only if it's available and it changed
    const newUserPosition = nextProps.userLocation;
    const oldUserPosition = this.props.userLocation;
    if (isInDistance(newUserPosition, oldUserPosition, 20))
      return;
    this.props.getStoriesAroundUser();
  }

  render() {
    return (
      <StoryOverviewMap
        stories={this.props.stories}
        mapRegion={this.props.mapRegion}
        onRegionChange={this.props.onRegionChange}
      />
    );
  }
}

StoryOverviewMapWrapper.propTypes = {
  userLocation: React.PropTypes.object,
  stories: React.PropTypes.array,
  mapRegion: React.PropTypes.object,
  onRegionChange: React.PropTypes.func,
  getStoriesAroundUser: React.PropTypes.func
}
