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

const styles = {}

export default function ChapterCard(props) {
    return (
        <Card >
            <CardItem>
                <Left>
                    <Body>
                        <Text>
                            {`Chapter ${props.chapter.index} - ${props.chapter.title}`}
                        </Text>
                        <Text>
                            {props.chapter.description}
                        </Text>
                        <Text>
                            {`SubChapters: # ${props.chapter.subChapters.length}`}
                        </Text>
                    </Body>
                </Left>
            </CardItem>
        </Card>
    );
}

ChapterCard.propTypes =  {
    chapter: React.PropTypes.object.isRequired
};


