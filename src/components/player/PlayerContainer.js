import MarkerPlayer from './player';
import { connect } from 'react-redux';
import {
  playerOpened,
  handledPlayerButtonPress,
  closedPlayer
} from '../../actions';
import _ from 'lodash';
import {
  getActiveStory,
  getActiveStoryProgress,
  getActiveSubChapter,
  getActiveSubChapters,
} from '../../helpers/stateHelper';
import { DISTANCE } from '../../constants/distance.js';
import { isInDistance } from '../../helpers/locationHelper';

function mapStateToProps(state) {
  const activeStory = getActiveStory(state.stories.data, state.activeUser);
  let annotation = {};
  // only set annotation, if a story is active
  if(activeStory) {
    // marker has been clicked
    if (state.player.annotationIndex !== -1) {
      const activeStoryProgress = getActiveStoryProgress(state.stories.data, state.activeUser, state.progress.data);
      const activeSubChapters = getActiveSubChapters(activeStory, activeStoryProgress);
      annotation = activeSubChapters[state.player.annotationIndex];
    }
    // wearable button has been pushed
    else if (!_.isEmpty(state.progress.custom)) {
      const {currentChapterIndex, currenSubChapterIndex} = state.progress.custom;
      const activeSubChapters = activeStory.chapters[currentChapterIndex - 1].subChapters;
      annotation = activeSubChapters[currenSubChapterIndex - 1];
    }
    // check if annotation is in distance
    if (!_.isEmpty(annotation)) {
      annotation.inDistance = isInDistance(
        state.position.userLocation,
        {
          latitude: annotation.coordinates[1],
          longitude: annotation.coordinates[0]
        },
        DISTANCE
      );
    }
  }
  return {
    openPlayer: state.player.openPlayer,
    annotation: annotation,
    controlButtonPressed: state.player.controlButtonPressed,
  };
}

function mapDispatchToProps(dispatch){
  return {
    playerOpened: () => dispatch(playerOpened()),
    handledPlayerButtonPress: () => dispatch(handledPlayerButtonPress()),
    closedPlayer: () => dispatch(closedPlayer())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerPlayer);
