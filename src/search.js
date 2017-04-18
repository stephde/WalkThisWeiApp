/**
 * Created by stephde on 04/04/2017.
 */

'use strict';


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Player } from 'react-native-audio-streaming';

var styles = StyleSheet.create({
    description: {
        fontSize: 20,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class Search extends Component {
    render() {
        return (
            <View style={styles.container}>
               <Player url={"https://00e9e64bacd348098a4a173e8eceba77bbdc8ded11ddecab53-apidata.googleusercontent.com/download/storage/v1/b/walkthisei-audio/o/01%20Put%20It%20Down%20(feat.%20Chris%20Brown).mp3?qk=AD5uMEux5qkoW-gig_Xan7C6DesCZWi6DjdG18Y2OPAPmE-cPN74W3sLolftaubAyNySdVV3-8AJ31IJB_Al6zeybtxV-6rWotC4_XW-6MC-WXhOqn576GZjbF1S4AzbI2C9fG_78oGM1QxwnyyojFkZFzB-8D8iYmtwFctJydgJBwwJ2GRhvL7fBoBaRCjkEOcbJfS_kHqY8yvszpKWC85rEYgy2jy9FsDFDgA2cfpy-3Y_SEuAVuVvhDYw7j2FLvSWymK6pl4oN4utoIHfDScEidkprXvqk35Td05v2oLg5_hGCDK3jYtUQesOwkJo07Da7B08T_I6wja6t4Hvq-wE8Ios-PalBZpbS1IS6h77Q1pb70DCJE_5ctenPmZox4jXg2bOWPz5ynkcTngfuGWd7y0dgd1FQh1T2EPYq_06lLHu2PWDZ6T8Mev5zVkwVUSqaZH-J_wKdotPDfRdVkEoUwlyDGsRpiALHwJ99SU8iAEQ4i69x4aVR1lRnkvxn4-5JF_XCSOTiP41h0Iblzm9WWcValIA3HHUsaCzvmCYGclsUyB6FZGGVJsYXiLJyf0RrOYUB5_v70HNi3Bu_OqFiRMRbyyDchw_rlgDaFrgMy845iG2LefqbSC1QAoAWC4AZBM1pdMo1W5EM0rtLRBkGX6Dn5YeKJp4UMuOQ-sX54VwoDt-1cR8Oz4rV6ZH2dPR_T6S9np-nHWCQMmuwJBlSJwiENOBlYgH3UYpSJyny3I1IECLJ_HhSlN9d4jYSN1vcrtoTim1pk69EHpYoZAS7VVV7CgLn4kRGUzBSujT9p11NOzXb5ynGfEkAFKkMGEyEoXS5ttT"} />
            </View>
        );
    }
}
