import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import {
  Card,
  CardItem,
  Button,
  Text,
  Left,
  Right,
  Body
} from 'native-base';

const styles = {
  imageItem: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardItemImage: {
    flex: 1,
    width: 400,
    height: 150
  },
  button: {
    backgroundColor: '#70C8BE'
  }
}

function chapterProgressText(progress, story) {
  let text = "Chapter: ";
  text += (progress && progress.maxChapterIndex >= 0)
    ? progress.maxChapterIndex
    : '0';
  text += ' of ';
  text += story.chapters.length;
  return text;
}

function percentageProgress(progress, story) {
  if (progress) {
    const { maxChapterIndex, maxSubChapterIndex } = progress;
    if (maxSubChapterIndex > 0 && maxChapterIndex > 0) {
      const totalSubChapterCount = _.reduce(
        story.chapters,
        (acc, chapter) => {
          return chapter.subChapters
            ? acc + chapter.subChapters.length
            : 0;
        },
        0
      );
      const subChapterCount = _.reduce(
        story.chapters,
        (acc, chapter, index) => {
          if (index < maxChapterIndex-1)
            return acc + chapter.subChapters.length;
          else if (index === maxChapterIndex-1)
            return acc + maxSubChapterIndex;
          else
            return acc;
        },
        0
      );
      let percentage = Math.round(subChapterCount / totalSubChapterCount * 100);

      return `Progress: ${percentage}%`
    }
  }

  return 'Not yet started'
}

export default function StoryCard(props) {
  return (
    <Card>
      <CardItem
        cardBody
        style={styles.imageItem}
      >
        <TouchableOpacity
          onPress={() => props.onImageClick()}
        >
          <Image
            source={{uri: props.story.picture}}
            style={styles.cardItemImage}
            resizeMode='cover'
          />
        </TouchableOpacity>
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Text>{props.story.title}</Text>
            <Text note>{chapterProgressText(props.storyProgress, props.story)}</Text>
            <Text note>{percentageProgress(props.storyProgress, props.story)}</Text>
          </Body>
        </Left>
        { props.isStartable &&
          <Right>
            <Body>
              <Button
                rounded
                style={styles.button}
                onPress={() => props.setStoryActive(props.story.id)}
              >
                <Text>Start</Text>
              </Button>
            </Body>
          </Right>
        }
      </CardItem>
    </Card>
  );
}

StoryCard.propTypes =  {
  story: React.PropTypes.object.isRequired,
  isStartable: React.PropTypes.bool.isRequired,
  setStoryActive: React.PropTypes.func,
  storyProgress: React.PropTypes.object,
  onImageClick: React.PropTypes.func
};


