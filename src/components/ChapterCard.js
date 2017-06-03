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
    subHeader: {
        padding: 10,
        paddingLeft: 0,
        fontSize: 18,
        fontWeight: '500'
    }
}

export default function ChapterCard(props) {
    return (
        <Card >
            <CardItem>
                <Left>
                    <Body>
                        <Text style={styles.subHeader}>
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


