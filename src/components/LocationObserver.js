import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { isInDistance } from '../helpers/locationHelper';
import {
  showNewChapterToggle,
  setStoryProgress,
  finishedStory
} from '../actions';
import { DISTANCE } from '../constants/distance';

class LocationObserver extends React.Component {

  _userIsInRange(audioLocation, userLocation) {
    return isInDistance(
      userLocation,
      {
        latitude: audioLocation[1],
        longitude: audioLocation[0]
      },
      DISTANCE
    );
  }

  _checkProgress(props) {
    const { activeStory, progress, userLocation, userId } = props;
    if (!activeStory || !progress || !userLocation)
      return;

    const { activeChapterIndex, activeSubChapterIndex } = progress;
    const chapterCount = _.get(activeStory, 'chapters.length');
    const subChapterCount = _.get(activeStory, `chapters[${activeChapterIndex - 1}].subChapters.length`);
    const activeSubChapter = _.get(activeStory, `chapters[${activeChapterIndex - 1}].subChapters[${activeSubChapterIndex - 1}]`);

    if (!activeSubChapter) return;
    if (this._userIsInRange(activeSubChapter.coordinates, userLocation)) {
      if (chapterCount === activeChapterIndex
        && subChapterCount === activeSubChapterIndex)
        // Story is finished, last subchapter in last chapter was reached
        this.props.finishedStory();
      else if (subChapterCount === activeSubChapterIndex)
        // Chapter is finished, last subchapter in chapter was reached
        this.props.showNewChapterToggle({
          userId,
          storyId: activeStory.id,
          progress: {
            activeChapterIndex: activeChapterIndex + 1,
            activeSubChapterIndex: 1
          }
        });
      else
        // Some other subchapter was reached
        this.props.setStoryProgress(
          userId,
          activeStory.id,
          {
            activeChapterIndex: activeChapterIndex,
            activeSubChapterIndex: activeSubChapterIndex + 1
          }
        );
    }
  }
  componentDidMount() {
    this._checkProgress(this.props);
  }

  componentDidUpdate(prevProps, prevState){
    this._checkProgress(this.props);
  }

  render() {
    return (this.props.children);
  }
}

LocationObserver.PropTypes = {
  userId: React.PropTypes.string,
  userLocation: React.PropTypes.object,
  activeStory: React.PropTypes.object,
  progress: React.PropTypes.object,
  setStoryProgress: React.PropTypes.func,
  showNewChapterToggle: React.PropTypes.func,
  finishedStory: React.PropTypes.func,
}

function mapStateToProps(state) {
  const activeStoryId = _.get(state, 'activeUser.activeStoryId');
  const activeStory = _.get(state, `stories.data[${activeStoryId}]`);
  const progress = _.get(state, `progress.data[${activeStoryId}]`);

  return {
    userId: state.activeUser.id,
    userLocation: state.position.userLocation,
    activeStory,
    progress
  }
}

export default connect(
  mapStateToProps, {
    setStoryProgress,
    finishedStory,
    showNewChapterToggle
  }
)(LocationObserver)
