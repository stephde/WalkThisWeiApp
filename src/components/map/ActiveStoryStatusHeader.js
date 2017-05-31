import React from 'react';
import { Dimensions } from 'react-native';
import { connect} from 'react-redux';
import { Button, Text, Content } from 'native-base';
import { setStoryProgress } from '../../actions';
import styles from './styles';

const {height, width} = Dimensions.get('window');

function ActiveStoryStatusHeader(props) {
  const {
    userId,
    storyId,
    progress,
    isDisabled
  } = props.nextProgress;

  return props.showChapterButton
    ? (<Button
        rounded
        disabled={ isDisabled }
        onPress={
          () => props.setStoryProgress(userId, storyId, progress)
        }
        style={styles.newChapterButton}
      >
        <Text>Change to new Chapter</Text>
      </Button>)
    : props.hasFinishedStory
      ? <Text
          style={{
            color: '#FFFFFF',
            backgroundColor: 'rgba(112, 200, 190, 0.7)',
            width: width,
            textAlign: 'center'
          }}
        >
          You have finished this story!
        </Text>
      : null;
}

ActiveStoryStatusHeader.propTypes = {
  showChapterButton: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  nextProgress: React.PropTypes.object,
  hasFinishedStory: React.PropTypes.bool,
  style: React.PropTypes.object,
  setStoryProgress: React.PropTypes.func
}

function mapStateToProps(state) {
  return {
    showChapterButton: state.ui.showChapterButton,
    nextProgress: state.ui.nextProgress,
    hasFinishedStory: state.ui.hasFinishedStory,
    isDisabled: state.progress.loading
  }
};

export default connect(mapStateToProps, {setStoryProgress})(ActiveStoryStatusHeader);
