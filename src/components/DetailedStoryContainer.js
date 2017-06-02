import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Button,
  Text,
  Tab,
  Tabs,
  TabHeading,
  Icon
} from 'native-base';
import {
  Image
} from 'react-native'
import {
    setStoryActive
} from '../actions';

import ChapterCard from './ChapterCard'

const styles = {
  button: {
    backgroundColor: '#70C8BE'
  },
  image: {
    flex: 1,
    width: 400,
    height: 150,
    overflow: 'hidden',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#70C8BE',
    padding: 10,
    fontSize: 18
  },
  tab: {
    flex: 1,
    padding: 10
  }
}

class DetailedStoryContainer extends Component {
  _buildChapterTabs(){
    return _.map(this.props.story.chapters, chapter =>
        <ChapterCard
            key={chapter._id}
            chapter={chapter}
        />
    );
  }

  render() {
    const chapterTabs = this._buildChapterTabs()

    return (
      <Container>
        <Content>
          <Image
              source={{uri: this.props.story.picture}}
              style={styles.image}
              resizeMode='cover'
          />
          <Text style={styles.header}>
            { this.props.story.title }
          </Text>
          <Tabs>
            <Tab
                heading={ <TabHeading><Icon name="list" /><Text>Info</Text></TabHeading>}
                style={styles.tab}>
              <Text>
                { this.props.story.description }
              </Text>
            </Tab>
            <Tab
                heading={ <TabHeading><Icon name="book" /><Text>Chapters</Text></TabHeading>}
                style={styles.tab}>
              { chapterTabs }
            </Tab>
          </Tabs>

          <Button
              rounded
              style={styles.button}
              onPress={
                () => this.props.setStoryActive(
                  this.props.activeUserId,
                  this.props.story.id
                )
              }
          >
            <Text>Start</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

DetailedStoryContainer.propTypes = {
  story: React.PropTypes.object.isRequired,
  setStoryActive: React.PropTypes.func,
  progresses: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    activeUserId: state.activeUser.id,
    progresses: state.progress
  };
}

export default connect(mapStateToProps,{setStoryActive})(DetailedStoryContainer)
