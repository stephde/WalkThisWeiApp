import React from 'react';
import { connect } from 'react-redux';
import ActiveStoryMapContainer from './ActiveStoryMapContainer';
import StoryOverviewMapContainer from './StoryOverviewMapContainer';


function MapChoser(props) {
  if (props.hasActiveStory)
    return (
      <ActiveStoryMapContainer />
    );
  else
    return (
      <StoryOverviewMapContainer />
    );
}

MapChoser.propTypes = {
  hasActiveStory: React.PropTypes.bool
}

function mapStateToProps(state) {
  return {
    hasActiveStory: !!(state.activeUser.activeStoryId)
  };
}

export default connect(mapStateToProps)(MapChoser);
