import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { isInDistance } from '../helpers/locationHelper';
import {
  showNewChapterToggle,
  setStoryProgress,
  finishedStory,
  reachedSubChapter
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

    const { nextChapterIndex, nextSubChapterIndex } = progress;
    const chapterCount = _.get(activeStory, 'chapters.length');

    const currentSubChapters = _.get(activeStory, `chapters[${nextChapterIndex - 1}].subChapters`);
    const unlockedSubChapters = _.filter(currentSubChapters, (v,i) => i < nextSubChapterIndex-1);
    _.forEach(unlockedSubChapters, (subChapter, i) => {
      if (this._userIsInRange(subChapter.coordinates, userLocation))
        this.props.reachedSubChapter(nextChapterIndex, i + 1);
    })

    const subChapterCount = _.get(activeStory, `chapters[${nextChapterIndex - 1}].subChapters.length`);
    const nextSubChapter = _.get(activeStory, `chapters[${nextChapterIndex - 1}].subChapters[${nextSubChapterIndex - 1}]`);

    if (!nextSubChapter) return;

    if (this._userIsInRange(nextSubChapter.coordinates, userLocation)) {
      if (chapterCount === nextChapterIndex
        && subChapterCount === nextSubChapterIndex) {
        // Story is finished, last subchapter in last chapter was reached
        const { maxChapterIndex, maxSubChapterIndex } = progress;
        if ( maxChapterIndex === nextChapterIndex
          && maxSubChapterIndex === nextSubChapterIndex)
          // Story end was reached before
          return;
        this.props.reachedSubChapter(nextChapterIndex, nextSubChapterIndex);
        this.props.finishedStory();
        this.props.setStoryProgress(
          userId,
          activeStory.id,
          {
            reachedChapterIndex: nextChapterIndex,
            reachedSubChapterIndex: nextSubChapterIndex
          }
        );
      } else if (subChapterCount === nextSubChapterIndex) {
        this.props.reachedSubChapter(nextChapterIndex, nextSubChapterIndex);
        // Chapter is finished, last subchapter in chapter was reached
        this.props.showNewChapterToggle({
          userId,
          storyId: activeStory.id,
          progress: {
            reachedChapterIndex: nextChapterIndex,
            reachedSubChapterIndex: nextSubChapterIndex
          }
        });
      } else {
        // Some other subchapter was reached
        this.props.reachedSubChapter(nextChapterIndex, nextSubChapterIndex);
        this.props.setStoryProgress(
          userId,
          activeStory.id,
          {
            reachedChapterIndex: nextChapterIndex,
            reachedSubChapterIndex: nextSubChapterIndex
          }
        );
      }
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
  reachedSubChapter: React.PropTypes.func
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
    showNewChapterToggle,
    reachedSubChapter
  }
)(LocationObserver)
