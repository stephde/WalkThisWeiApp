import React, { Component } from 'react';
import _ from 'lodash';
import Map from './Map';

export default class MapWrapper extends Component {
    componentDidMount() {
      // Request active story on start up
      const activeStoryId = _.get(this.props,'currentUser.activeStoryId');

      if (!activeStoryId)
        return;

      this.props.getCurrentStory(activeStoryId);
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
          writeCharacteristic={this.props.writeCharacteristic}
          isConnectedToDevice={this.props.isConnectedToDevice}
        />
      );
    }
}

MapWrapper.propTypes = {
  currentUser: React.PropTypes.object,
  annotations: React.PropTypes.array,
  mapRegion: React.PropTypes.object,
  onRegionChange: React.PropTypes.func,
  getCurrentStory: React.PropTypes.func,
  isConnectedToDevice: React.PropTypes.bool
}
