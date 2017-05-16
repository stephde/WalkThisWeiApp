import React, { Component } from 'react';
import get from 'lodash.get';
import Map from './Map';

export default class MapWrapper extends Component {
    componentWillReceiveProps(nextProps){
      // Request active story only if it's available and it changed
      const nextActiveStoryId = get(nextProps,'currentUser.activeStoryId');

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
  getCurrentStory: React.PropTypes.func
}
