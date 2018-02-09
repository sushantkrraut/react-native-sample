import React, { Component } from 'react';
import {
    Alert, ScrollView, FlatList, SectionList, AppRegistry, Platform, StyleSheet, Text,
    TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, ViewPagerAndroid, Button
} from 'react-native';
import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
    "en-US": {
        how: "How do you want your egg today?",
        boiledEgg: "Boiled egg",
        softBoiledEgg: "Soft-boiled egg",
        choice: "How to choose the egg"
    },
    en: {
        how: "How do you want your egg today?",
        boiledEgg: "Boiled egg",
        softBoiledEgg: "Soft-boiled egg",
        choice: "How to choose the egg"
    },
    fr: {
        how: "Come vuoi il tuo uovo oggi?",
        boiledEgg: "Uovo sodo",
        softBoiledEgg: "Uovo alla coque",
        choice: "Come scegliere l'uovo"
    },
    hi: {}
});

export default class Localization extends Component {

    forceFrench() {
        strings.setLanguage('fr');
    }

    forceEng() {
        strings.setLanguage('en');
    }

    addHindi() {
        strings.setLanguage('hi');

        //fetch from server and set the locale
        strings.setContent(Object.assign({}, strings.getLocaleObject(),
            {
                hi: {
                    how: "आप अपने अंडे कैसे चाहते हैं?",
                    boiledEgg: "उबला अंडा",
                    softBoiledEgg: "हल्का उबला हुआ",
                    choice: "कैसे अंडा चुनने"
                }
            }));

    }

    render() {
        return (
            <View >
                <Text style={styles.title}>
                    Language set is: {strings.getLanguage()}
                </Text>
                <Text />
                <Text style={styles.title}>
                    How: {strings.how}
                </Text>
                <Text style={styles.title}>
                    1. {strings.boiledEgg}
                </Text>
                <Text style={styles.title}>
                    2. {strings.softBoiledEgg}
                </Text>
                <Text />
                <Button title='force french' onPress={this.forceFrench}></Button>
                <Text />
                <Button title='force english' onPress={this.forceEng}></Button>
                <Text />
                <Button title='add language hindi' onPress={this.addHindi}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        flexDirection: 'column'
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'stretch'
    }
})
