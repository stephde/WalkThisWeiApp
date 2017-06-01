'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import { Button, Text, Icon, Container, Content } from 'native-base';
import ActiveStoryStatusHeader from './ActiveStoryStatusHeader';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import StoryCard from '../StoryCard';
import cultureMarker from '../../../images/culture.png';
import eduMarker from '../../../images/edu.png';
import historyMarker from '../../../images/history.png';
import natureMarker from '../../../images/nature.png';
import religionMarker from '../../../images/religion.png';
import scienceMarker from '../../../images/science.png';
const isAndroid = (Platform.OS === 'android');
const {height, width} = Dimensions.get('window');

const categoryMapper = {
  culture: cultureMarker,
  edu: eduMarker,
  history: historyMarker,
  nature: natureMarker,
  religion: religionMarker,
  science: scienceMarker,
};

function getCoordinatesFromStory(story) {
  return ({
    longitude: story.chapters[0].subChapters[0].coordinates[0],
    latitude: story.chapters[0].subChapters[0].coordinates[1],
  });
}

export default class StoryOverviewMap extends Component {

    constructor() {
      super();
      this.state = {
        selectedAnnotation: {}
      };
    }

    _getMarkers() {
      return Object.keys(this.props.stories)
        .map((key) => {
          const category = this.props.stories[key].categories[0];
          const markerPicture = categoryMapper[`${category}`]
            ? categoryMapper[`${category}`]
            : cultureMarker;
          return (
            <Marker
              key={this.props.stories[key]._id}
              coordinate={
                getCoordinatesFromStory(this.props.stories[key])
              }
              onPress={() => {this.handleOnMarkerPress(key);}}
              onSelect={() => {this.handleOnMarkerPress(key);}}
              image={ isAndroid ? markerPicture : null }
            >
              { isAndroid
                ? null
                : <Image
                    source={markerPicture}
                    resizeMode={'contain'}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
              }
            </Marker>
          );
        });
    }

    handleOnMarkerPress (key) {
      this.setState({selectedAnnotation: this.props.stories[key]});
      this.refs.modal1.open();
    }

    render() {
      const markers = this._getMarkers();

      return (
        <View style={styles.container}>
          <MapView
            style={ styles.map }
            region={ this.props.mapRegion }
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={region => this.props.onRegionChange(region)}>
            { markers }
          </MapView>
          <Button rounded onPress={Actions.storyTabs} style={ styles.storiesButton }>
            <Text>Stories</Text>
          </Button>
          <Modal
            style={styles.modal}
            ref={"modal1"}
            animationDuration={700}
            swipeToClose={true}>
            <Button transparent onPress={() => {this.refs.modal1.close();}}>
              <Icon name="close-circle" style={Object.assign(styles.modalTextColor, styles.modalClosingButton)}/>
            </Button>
              <Container>
                <Content>
                  <StoryCard
                    story={this.state.selectedAnnotation}
                    isStartable={false}
                  />
                </Content>
              </Container>
          </Modal>
        </View>
      );
    }
}

StoryOverviewMap.propTypes = {
  stories: React.PropTypes.array,
  mapRegion: React.PropTypes.object,
  onRegionChange: React.PropTypes.func,
}
