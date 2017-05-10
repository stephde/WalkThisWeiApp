import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';
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

export default function StoryCard(props) {
  return (
    <Card >
      <CardItem
        cardBody
        style={styles.imageItem}
      >
        <TouchableOpacity
          onPress={() => Actions.detailedStory({story:"Beach Trail"})}
        >
          <Image
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            style={styles.cardItemImage}
            resizeMode='cover'
          />
        </TouchableOpacity>
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Text>Beach Trail</Text>
            <Text note>Chapter: 12 of 15</Text>
            <Text note>Progress: 73%</Text>
          </Body>
        </Left>
        <Right>
          <Body>
            <Button rounded style={styles.button}>
              <Text>Start</Text>
            </Button>
          </Body>
        </Right>
      </CardItem>
    </Card>
  );
}
