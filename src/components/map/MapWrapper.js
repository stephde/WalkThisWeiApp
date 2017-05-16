import React, { Component } from 'react';
import _ from 'lodash';
import Map from './Map';

export default class MapWrapper extends Component {
    componentDidMount() {
      // temporary static user ID
      const USER_ID = 'user1';
      this.props.getCurrentUser(USER_ID);
    }

    componentWillReceiveProps(nextProps){
      // Request active story only if it's available and it changed
      const nextActiveStoryId = _.get(nextProps,'currentUser.activeStoryId');

      if (!nextActiveStoryId)
        return;
      const currentActiveStoryId = this.props.currentUser.activeStoryId

      if (currentActiveStoryId === nextActiveStoryId)
        return;

      this.props.getCurrentStory(nextProps.currentUser.activeStoryId);
    }

    render() {
      return (
        <Map
          annotations={this.props.annotations}
          mapRegion={this.props.mapRegion}
          onRegionChange={this.props.onRegionChange}
        />
      );
    }
}

MapWrapper.propTypes = {
  currentUser: React.PropTypes.object,
  annotations: React.PropTypes.array,
  mapRegion: React.PropTypes.object,
  onRegionChange: React.PropTypes.func,
  getCurrentUser: React.PropTypes.func,
  getCurrentStory: React.PropTypes.func
}
