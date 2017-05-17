import React from 'react';
import { connect } from 'react-redux';

class LocationObserver extends React.Component {

  render() {
    return this.props.children;
  }
}

LocationObserver.PropTypes = {
  userLocation: React.PropTypes.object,
  isLastSubChapter: React.PropTypes.bool,
  isLastChapter: React.PropTypes.bool,
  storyProgress: React.PropTypes.object,
  activeSubChapter: React.PropTypes.object,
}

function mapStateToProps(state) {
  const activeStoryId = state.activeUser.activeStoryId;
  const activeStory = state.stories.data[activeStoryId];
  const storyProgress = state.progress.data[activeStoryId];
  const chapterIndex = storyProgress.currentChapterIndex
  const subChapterIndex = storyProgress.currentSubChapterIndex
  return {
    userLocation: state.position.userLocation,

    storyProgress
  }
}

export default connect(mapStateToProps)(LocationObserver)
