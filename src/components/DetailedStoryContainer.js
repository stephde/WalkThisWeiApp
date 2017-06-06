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
  Icon,
  View
} from 'native-base';
import {
  Image
} from 'react-native'
import {
    setStoryActive
} from '../actions';

import ChapterCard from './ChapterCard'

const styles = {
  content: {
    flex: 1
  },
  button: {
    backgroundColor: '#70C8BE',
    margin: 20/*,
    position: 'absolute',
    bottom: 10,
    right: 10*/
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
  subHeader: {
    padding: 10,
    paddingLeft: 0,
    fontSize: 18,
    fontWeight: '500'
  },
  descText: {
    paddingBottom: 25
  },
  tab: {
    padding: 15,
    alignSelf: 'stretch'
  },
  tabUnderlineStyle: {
    borderBottomWidth: 4,
    borderBottomColor: '#70C8BE'
  },
  tabs: {
    width: "100%",
    flex: 1,
    flexDirection: "column"
  },
  backdropView: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,30)',
    opacity: 0.6,
    borderRadius: 5
  },
  backdropViewBackground: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 5
  },
  headline: {
    color: '#DDDDDD',
    fontSize: 26,
    fontWeight: '500'
  },
  activeColor: '#70C8BE',
  inactiveColor: '#6B6B6B'
}



class DetailedStoryContainer extends Component {
  constructor () {
    super();
    this.state = {
      activeTab: 'info',
    };
  }

  _buildChapterTabs(){
    return _.map(this.props.story.chapters, chapter =>
        <ChapterCard
            key={chapter._id}
            chapter={chapter}
        />
    );
  }

  _getDescHeaderText() {
    let length = this.props.story.chapters.length;
    let miles = this.props.story.miles ? this.props.story.miles : '15';
    return length + (length > 1 ? ' Chapters' : ' Chapter') + ' | ' + miles + ' miles';
  }

  _getProgressText() {
    let progress = this.props.progress
    if (progress) {
      return 'Chapter ' + (progress.maxChapterIndex || 0) + ' of ' + this.props.story.chapters.length;
    }

    return 'Not yet started'
  }

  render() {
    const chapterTabs = this._buildChapterTabs()

    return (
      <Container>
        <Content>
          <Image
              source={{uri: this.props.story.picture}}
              style={styles.image}
              resizeMode='cover'>
          </Image>
          <View style={styles.backdropView}>
            <Text style={styles.headline}>
              { this.props.story.title }
            </Text>
          </View>
          <View style={styles.backdropViewBackground}>
            <Text style={styles.headline}>
              { this.props.story.title }
            </Text>
          </View>

          <Tabs
              onChangeTab={(event) => {this.setState({activeTab: event.ref.ref});}}
              tabBarUnderlineStyle={styles.tabUnderlineStyle}>
            <Tab
              ref="info"
              heading={
                <TabHeading>
                  <Icon name="list" style={{color: this.state.activeTab ===  'info' ? styles.activeColor : styles.inactiveColor}}/>
                  <Text style={{color: this.state.activeTab ===  'info' ? styles.activeColor : styles.inactiveColor}}>Info</Text>
                </TabHeading>
              }
              style={styles.tab}>
                <Text style={styles.subHeader}>{ this._getDescHeaderText() }</Text>
                <Text style={styles.descText}>{ this.props.story.description }</Text>

                <Text style={styles.subHeader}>Progress</Text>
                <Text style={styles.descText}>{ this._getProgressText() }</Text>
            </Tab>
            <Tab
              ref="chapter"
              heading={
                <TabHeading>
                  <Icon name="book" style={{color: this.state.activeTab ===  'chapter' ? styles.activeColor : styles.inactiveColor}}/>
                  <Text style={{color: this.state.activeTab ===  'chapter' ? styles.activeColor : styles.inactiveColor}}>Chapters</Text>
                </TabHeading>
              }
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
  progress: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    activeUserId: state.activeUser.id,
    progress: state.progress.data
  };
}

export default connect(mapStateToProps,{setStoryActive})(DetailedStoryContainer)
